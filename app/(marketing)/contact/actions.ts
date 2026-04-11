"use server";

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

  // Wave 1: log only. Wave 2: wire Resend / Postmark / similar.
  console.log("[contact] submission", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return { ok: true };
}
