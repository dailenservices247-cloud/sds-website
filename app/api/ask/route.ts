// app/api/ask/route.ts
//
// The ask-box. ZERO LLM by design.
//
// The Helix concierge spec is locked but its build is BANKED until first paid
// close (Dailen 2026-08-20: "I don't wanna have to pay for this until we start
// seeing some revenue"). This is the half that costs nothing and makes the
// eventual build better rather than just later.
//
// A visitor types a real question. It is captured and answered by a human. By
// the time the LLM is funded there is a ranked list of what people ACTUALLY
// asked, in their own words — so the corpus gets written against demand instead
// of guesses, and launch is not blind.
//
// Per the concierge spec, the unanswered-question log IS the roadmap. Every
// question here is a corpus document that has not been written yet.
//
// No persistence in v0 — same call the diagnostic made. Questions land in Vercel
// logs and, when RESEND_API_KEY is set, in email. Upgrade to Supabase when
// volume warrants it, not before.

import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const FROM = "SDS Ask <dailen@synapsedynamics.io>";
const NOTIFY_TO = "dailen@synapsedynamics.io";

const requestSchema = z.object({
  question: z.string().min(8, "Say a little more").max(2000),
  email: z.string().email("Valid email required").max(200).optional().or(z.literal("")),
  // Honeypot — real people leave this empty. Accept ANY string here: if zod
  // rejects a filled honeypot, the bot gets a validation error naming the field
  // and learns exactly what to omit next time. The trap has to look like it
  // worked. The check happens in the handler, below.
  website: z.string().max(500).optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request." },
      { status: 400 },
    );
  }

  const { question, email, website } = parsed.data;
  if (website) {
    // Honeypot tripped. Return success so the bot does not learn anything.
    return NextResponse.json({ ok: true });
  }

  const asked = new Date().toISOString();

  // Always log. This is the capture of record until persistence exists — if
  // email is unconfigured the question must still survive.
  console.log(
    JSON.stringify({ tag: "[ask]", asked, question, email: email || null }),
  );

  const key = process.env.RESEND_API_KEY;
  if (key) {
    try {
      const resend = new Resend(key);
      await resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        subject: `Question: ${question.slice(0, 60)}${question.length > 60 ? "…" : ""}`,
        html: `
          <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:640px">
            <h2 style="margin:0 0 8px;color:#2a6055">Someone asked</h2>
            <p style="white-space:pre-wrap;font-size:16px;line-height:1.6;color:#2a2a2d">${question.replace(/</g, "&lt;")}</p>
            <div style="margin-top:24px;padding:16px;background:#f5f7f6;border-left:3px solid #c8a23e;border-radius:4px">
              <p style="margin:0;font-size:14px;color:#5c5d60">
                Reply to: ${email ? email.replace(/</g, "&lt;") : "<em>no email left</em>"}<br>
                Asked: ${asked}
              </p>
            </div>
            <p style="margin-top:24px;font-size:13px;color:#5c5d60">
              This question is a corpus document that has not been written yet.
            </p>
          </div>`,
      });
    } catch (err) {
      // Never fail the visitor's submission because email broke — the console
      // log above already captured it.
      console.error("[ask] email send failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
