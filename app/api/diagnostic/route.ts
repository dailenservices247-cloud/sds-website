// app/api/diagnostic/route.ts
//
// POST endpoint for the L2 5-min Diagnostic form.
// Validates answers with zod, scores, fires a notification email (graceful
// degradation when RESEND_API_KEY is unset), returns the scored result.
//
// No persistence in v0; submissions land in Vercel logs + (optionally) email.
// Sprint 1 banked: upgrade to Supabase persistence once volume warrants.

import { NextResponse } from "next/server";
import { z } from "zod";
import { scoreAnswers, type DiagnosticAnswer } from "@/lib/diagnostic/scoring";
import { notifyDiagnostic } from "@/lib/diagnostic/notify";

const likert = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

const requestSchema = z.object({
  answers: z.object({
    memory: likert,
    verify: likert,
    workflow: likert,
    voice: likert,
    artifact: likert,
  }),
  email: z.string().email().optional().or(z.literal("")),
});

// Simple in-memory rate limiter (per-instance; resets on cold start).
// Production-tier rate limiting banked for Sprint 1.
const submissionsByIp = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = submissionsByIp.get(ip);
  if (!entry || entry.resetAt < now) {
    submissionsByIp.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Try again in an hour." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = scoreAnswers(parsed.data.answers as Record<string, DiagnosticAnswer> as never);

  const email = parsed.data.email && parsed.data.email.length > 0 ? parsed.data.email : null;
  const userAgent = request.headers.get("user-agent");

  // Fire-and-forget notification; don't block the response on email send
  notifyDiagnostic(result, email, userAgent).catch((err) => {
    console.error("[diagnostic] notify failed:", err);
  });

  return NextResponse.json({
    score: result.score,
    bucket: result.bucket,
    perDimension: result.perDimension,
    weakest: result.weakest,
    strongest: result.strongest,
  });
}
