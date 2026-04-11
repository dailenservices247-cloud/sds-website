"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact, type ContactState } from "./actions";
import { cn } from "@/lib/utils";

const initialState: ContactState = { ok: false };

function inputCls(error?: string) {
  return cn(
    "w-full rounded-md border bg-bg-surface px-4 py-3 text-base text-ink-primary placeholder:text-ink-dim transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-accent/50",
    error
      ? "border-red-500/60 focus:border-red-500"
      : "border-[color:var(--border-subtle)] focus:border-accent"
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-4 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
        </>
      ) : (
        <>
          Send message
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContact, initialState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-accent/40 bg-accent/5 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 bg-bg-primary">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-ink-primary">Got it.</h2>
        <p className="mt-3 text-base text-ink-muted">
          We&apos;ll respond within one business day. If it&apos;s urgent, mention
          that in a follow-up.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Honeypot: visually hidden, tab-skipped, no label — bots fill, humans don't */}
      <div
        className="absolute left-[-9999px] top-[-9999px] opacity-0"
        aria-hidden="true"
      >
        <label>
          Website (leave empty)
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {state.error && (
        <div className="rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ink-primary"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={cn("mt-2", inputCls(state.fieldErrors?.name))}
            placeholder="Your name"
          />
          {state.fieldErrors?.name && (
            <p className="mt-1 text-xs text-red-400">{state.fieldErrors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink-primary"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={cn("mt-2", inputCls(state.fieldErrors?.email))}
            placeholder="you@company.com"
          />
          {state.fieldErrors?.email && (
            <p className="mt-1 text-xs text-red-400">{state.fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-ink-primary"
        >
          Company{" "}
          <span className="text-ink-dim font-normal">(optional)</span>
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={cn("mt-2", inputCls(state.fieldErrors?.company))}
          placeholder="Company name"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium text-ink-primary"
          >
            Project type <span className="text-accent">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={cn("mt-2", inputCls(state.fieldErrors?.projectType))}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="architect">Architect — custom app / software</option>
            <option value="automator">Automator — workflow / automation</option>
            <option value="strategist">Strategist — consulting / strategy</option>
            <option value="not-sure">Not sure yet</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-ink-primary"
          >
            Budget range <span className="text-accent">*</span>
          </label>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            className={cn("mt-2", inputCls(state.fieldErrors?.budget))}
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="under-5k">Under $5k</option>
            <option value="5k-15k">$5k – $15k</option>
            <option value="15k-50k">$15k – $50k</option>
            <option value="50k-plus">$50k+</option>
            <option value="not-sure">Not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink-primary"
        >
          Project details <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={cn("mt-2", inputCls(state.fieldErrors?.message))}
          placeholder="Tell us what you're trying to build, what you've tried, and what success looks like."
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-red-400">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      <SubmitButton />

      <p className="text-xs text-ink-dim">
        By submitting, you agree to let us contact you about your inquiry. We
        don&apos;t sell data, we don&apos;t spam, and we only email back about
        your project.
      </p>
    </form>
  );
}
