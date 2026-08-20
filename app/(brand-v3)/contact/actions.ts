"use server";

import { Resend } from "resend";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email required").max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  projectType: z.enum(["architect", "automator", "strategist", "not-sure"]),
  budget: z.enum(["under-5k", "5k-15k", "15k-50k", "50k-plus", "not-sure"]),
  message: z.string().min(10, "Tell us a bit more").max(5000),
  // Honeypot — should always be empty. Bots fill everything.
  website: z.string().max(0, "Caught by spam filter").optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Simulate network / give bots something to time out on
  await new Promise((r) => setTimeout(r, 400));

  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    projectType: formData.get("projectType")?.toString() ?? "",
    budget: formData.get("budget")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    website: formData.get("website")?.toString() ?? "",
  };

  // Honeypot triggered — silently succeed, log, do nothing
  if (raw.website && raw.website.length > 0) {
    console.warn("[contact] honeypot triggered", { ip: "redacted" });
    return { ok: true };
  }

  const parsed = ContactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const data = parsed.data;
  const receivedAt = new Date().toISOString();

  // Always log so server has a record even if email delivery fails.
  console.log("[contact] submission", { ...data, receivedAt });

  // Email delivery via Resend. Activates as soon as RESEND_API_KEY is set.
  // If the env vars aren't configured, the form still succeeds (logged only)
  // so the marketing site never breaks for visitors.
  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL;
  const fromAddress =
    process.env.CONTACT_FROM_EMAIL ??
    "Synapse Dynamics <onboarding@resend.dev>";

  if (apiKey && toAddress) {
    try {
      const resend = new Resend(apiKey);
      const projectTypeLabel = {
        architect: "Architect — custom apps",
        automator: "Automator — automation",
        strategist: "Strategist — AI strategy",
        "not-sure": "Not sure yet",
      }[data.projectType];
      const budgetLabel = {
        "under-5k": "Under $5k",
        "5k-15k": "$5k–$15k",
        "15k-50k": "$15k–$50k",
        "50k-plus": "$50k+",
        "not-sure": "Not sure yet",
      }[data.budget];

      const subject = `New SDS inquiry — ${data.name}${
        data.company ? ` (${data.company})` : ""
      }`;

      const html = `
        <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#0a0f0c;line-height:1.55;max-width:560px">
          <h2 style="margin:0 0 8px;color:#15803d">New project inquiry</h2>
          <p style="margin:0 0 16px;color:#5f6b66;font-size:13px">Received ${receivedAt}</p>
          <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;width:120px;color:#5f6b66">Name</td><td style="padding:6px 0"><strong>${escapeHtml(
              data.name
            )}</strong></td></tr>
            <tr><td style="padding:6px 0;color:#5f6b66">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(
              data.email
            )}">${escapeHtml(data.email)}</a></td></tr>
            ${
              data.company
                ? `<tr><td style="padding:6px 0;color:#5f6b66">Company</td><td style="padding:6px 0">${escapeHtml(
                    data.company
                  )}</td></tr>`
                : ""
            }
            <tr><td style="padding:6px 0;color:#5f6b66">Track</td><td style="padding:6px 0">${projectTypeLabel}</td></tr>
            <tr><td style="padding:6px 0;color:#5f6b66">Budget</td><td style="padding:6px 0">${budgetLabel}</td></tr>
          </table>
          <div style="margin-top:24px;padding:16px;background:#f5f7f6;border-left:3px solid #22c55e;border-radius:4px">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:0.1em;color:#5f6b66;margin-bottom:8px">Project description</div>
            <div style="white-space:pre-wrap">${escapeHtml(data.message)}</div>
          </div>
        </div>
      `.trim();

      const text = [
        "New SDS project inquiry",
        `Received: ${receivedAt}`,
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.company ? `Company: ${data.company}` : null,
        `Track: ${projectTypeLabel}`,
        `Budget: ${budgetLabel}`,
        "",
        "Project description:",
        data.message,
      ]
        .filter(Boolean)
        .join("\n");

      const result = await resend.emails.send({
        from: fromAddress,
        to: toAddress,
        replyTo: data.email,
        subject,
        html,
        text,
      });

      if (result.error) {
        console.error("[contact] resend error", result.error);
      }
    } catch (err) {
      console.error("[contact] resend exception", err);
      // Don't surface email errors to the user — their submission was logged.
    }
  }

  return { ok: true };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
