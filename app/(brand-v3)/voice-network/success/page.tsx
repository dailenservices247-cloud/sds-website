// app/(brand-v3)/voice-network/success/page.tsx
// Stripe Checkout returns Voice Network Pack buyers here after payment.
// session_id query param available for analytics; webhook fires the
// Resend post-purchase email separately (see app/api/stripe-webhook/route.ts).

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to the Voice Network",
  description: "Thanks for buying the Claude Voice Network Pack v1.",
};

export default function VoiceNetworkSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <article className="container-x py-24 md:py-40 max-w-3xl text-center">
      <p className="mono-label mb-6 mx-auto inline-block text-accent-ink">
        ✓ Payment received
      </p>

      <h1
        className="display text-ink-primary text-balance mb-8 mx-auto"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", maxWidth: "22ch" }}
      >
        Welcome to the Voice Network.
      </h1>

      <p className="text-lg md:text-xl text-ink-muted leading-relaxed text-pretty mb-12 mx-auto max-w-2xl">
        Your $79 purchase is confirmed. The pack download + install walkthrough land in your inbox within 5 minutes (check spam if it&apos;s not there in 10).
      </p>

      <div className="rounded-2xl bg-bg-surface border border-border-subtle p-6 md:p-8 mb-10 text-left max-w-2xl mx-auto">
        <p className="mono-label mb-3">What happens next</p>
        <ol className="space-y-3 text-base text-ink-muted leading-relaxed list-decimal list-inside">
          <li>Email arrives with the ZIP download link + 5-step install walkthrough.</li>
          <li>Run <code>./bridge/smoke-test.sh</code> after install — passes 5/5 layers if your bridge is healthy.</li>
          <li>Drop the <code>vault-template/</code> into your Obsidian vault root.</li>
          <li>Upload one of the starter Project templates to Claude.ai — open from your phone.</li>
          <li>Reply to the welcome email when v1.1 lands (full starter Projects + bearer-auth middleware, by 2026-05-28). Free upgrade.</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/anti-slop"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-contrast px-7 py-3 font-medium hover:bg-accent-bright transition-colors"
        >
          Add Anti-Slop — $49
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle px-7 py-3 font-medium hover:border-accent hover:text-accent-ink transition-colors"
        >
          Back to home
        </Link>
      </div>

      <p className="mt-10 text-xs text-ink-dim font-mono">
        {searchParams.session_id ? `Reference: ${searchParams.session_id}` : ""}
      </p>
    </article>
  );
}
