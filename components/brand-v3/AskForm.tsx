"use client";

// components/brand-v3/AskForm.tsx
//
// Zero-LLM question capture. Posts to /api/ask, which logs and (when Resend is
// configured) emails. Email is optional on purpose — a question worth logging is
// worth logging even from someone who does not want a reply, because the LOG is
// the point: it becomes the concierge corpus backlog.

import { useState } from "react";

type State = "idle" | "sending" | "sent" | "error";

export function AskForm() {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, email, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError("Could not send. Try again, or use the contact form.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        className="border-border-subtle bg-bg-surface mt-12 rounded-xl border p-8"
        role="status"
      >
        <p className="bv3-mono" style={{ color: "var(--bv3-spine-text)" }}>
          Received
        </p>
        <p className="text-ink-primary mt-4 text-lg text-pretty">
          That is logged and Dailen will come back to you
          {email ? "" : " — though without an email there is nowhere to reply, so add one if you want an answer rather than just to be heard"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-12">
      <label htmlFor="ask-question" className="bv3-mono text-ink-muted block">
        Your question
      </label>
      <textarea
        id="ask-question"
        required
        minLength={8}
        maxLength={2000}
        rows={5}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What do you actually want to know?"
        className="border-border-subtle bg-bg-surface text-ink-primary placeholder:text-ink-dim focus-visible:border-accent mt-3 w-full rounded-xl border p-4 text-lg leading-relaxed outline-none transition-colors"
      />

      <label
        htmlFor="ask-email"
        className="bv3-mono text-ink-muted mt-8 block"
      >
        Email — optional, but there is nowhere to reply without it
      </label>
      <input
        id="ask-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="border-border-subtle bg-bg-surface text-ink-primary placeholder:text-ink-dim focus-visible:border-accent mt-3 w-full rounded-xl border p-4 outline-none transition-colors"
      />

      {/* Honeypot — visually hidden, not display:none, so bots still fill it. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="ask-website">Website</label>
        <input
          id="ask-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {error && (
        <p
          className="bv3-mono mt-6"
          style={{ color: "var(--bv3-destructive, #e24b4a)" }}
          role="alert"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending" || question.trim().length < 8}
        className="bg-accent text-accent-contrast mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state === "sending" ? "Sending…" : "Send it"}
      </button>
    </form>
  );
}
