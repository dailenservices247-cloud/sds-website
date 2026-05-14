// app/(brand-v3)/diagnostic/page.tsx
//
// L2 5-min Diagnostic landing page.
// Server component wrapper for the client-side DiagnosticForm.
// Lives under the brand-v3 route group so it inherits the matte-gray shell.

import type { Metadata } from "next";
import { DiagnosticForm } from "@/components/brand-v3/DiagnosticForm";

export const metadata: Metadata = {
  title: "5-min Diagnostic — Synapse Dynamics Segmented",
  description:
    "Five questions on your agent stack. Score, identify the weakest layer, get a path to fix it. No email required.",
};

export default function DiagnosticPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <header className="mx-auto mb-12 w-full max-w-3xl md:mb-16">
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          LEAD MAGNET / DIAGNOSTIC
        </p>
        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          5-min Diagnostic
        </h1>
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          Five questions on how your agent stack is structured today. Honest answers
          produce an honest score. You will see exactly which layer is weakest and
          which path closes the gap fastest.
        </p>
        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>5 QUESTIONS</li>
          <li>5 MINUTES</li>
          <li>NO EMAIL REQUIRED</li>
          <li>SCORE / 25</li>
        </ul>
      </header>

      <DiagnosticForm />

      <footer
        className="mx-auto mt-24 w-full max-w-3xl text-xs"
        style={{ color: "var(--bv3-ink-dim)" }}
      >
        <p>
          Built by{" "}
          <a
            href="/v1-garden"
            style={{ color: "var(--bv3-gold)", textDecoration: "underline" }}
          >
            Synapse Dynamics Segmented
          </a>
          . The diagnostic measures one snapshot. Your stack changes as you build.
          Run it again any time.
        </p>
      </footer>
    </main>
  );
}
