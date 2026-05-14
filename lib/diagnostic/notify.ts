// lib/diagnostic/notify.ts
//
// Sends a notification email to Dailen when a diagnostic gets submitted.
// Mirrors lib/email.ts pattern: lazy Resend client, graceful degradation when
// RESEND_API_KEY is unset, console.log fallback so submissions are at least
// captured in Vercel logs until email is wired in production.

import "server-only";
import { Resend } from "resend";
import type { DiagnosticResult } from "./scoring";
import { DIMENSION_LABELS } from "./scoring";

const FROM = "SDS Diagnostic <dailen@synapsedynamics.io>";
const NOTIFY_TO = "dailen@synapsedynamics.io";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(
      "[diagnostic-notify] RESEND_API_KEY is not set; logging to console instead.",
    );
    return null;
  }
  return new Resend(key);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function notificationHtml(
  result: DiagnosticResult,
  email: string | null,
  userAgent: string | null,
): string {
  const perDim = Object.entries(result.perDimension)
    .map(
      ([key, value]) =>
        `<li><strong>${DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS]}:</strong> ${value} / 5</li>`,
    )
    .join("");

  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p><strong>New diagnostic submission</strong></p>
  <p><strong>Score:</strong> ${result.score} / 25 (${result.bucket})</p>
  <p><strong>Email:</strong> ${email ? escapeHtml(email) : "not provided"}</p>
  <p><strong>Per-dimension:</strong></p>
  <ul>${perDim}</ul>
  <p><strong>Weakest:</strong> ${DIMENSION_LABELS[result.weakest]}<br/>
  <strong>Strongest:</strong> ${DIMENSION_LABELS[result.strongest]}</p>
  <p style="color:#666;font-size:12px;">User agent: ${userAgent ? escapeHtml(userAgent.slice(0, 200)) : "n/a"}</p>
</body></html>`;
}

export async function notifyDiagnostic(
  result: DiagnosticResult,
  email: string | null,
  userAgent: string | null,
): Promise<void> {
  // Always log to Vercel logs as a safety net
  console.log(
    "[diagnostic-submission]",
    JSON.stringify({
      score: result.score,
      bucket: result.bucket,
      perDimension: result.perDimension,
      email: email ?? null,
      timestamp: new Date().toISOString(),
    }),
  );

  const resend = getResend();
  if (!resend) return;

  const r = await resend.emails.send({
    from: FROM,
    to: NOTIFY_TO,
    subject: `Diagnostic: ${result.score}/25 (${result.bucket})${email ? `, ${email}` : ""}`,
    html: notificationHtml(result, email, userAgent),
  });

  if (r.error) {
    console.error(`[diagnostic-notify] Resend send failed: ${r.error.message}`);
  }
}
