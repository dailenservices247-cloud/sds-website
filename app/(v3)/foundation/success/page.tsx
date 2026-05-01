// app/(v3)/foundation/success/page.tsx
// Stripe Checkout returns customers here after successful payment.
// session_id query param can be used for analytics or retrieving subscription details.

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Thanks for joining Foundation Subscription.",
};

export default function FoundationSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; product?: string };
}) {
  const isSetup = searchParams.product === "setup";

  return (
    <article className="container-x py-24 md:py-40 max-w-3xl text-center">
      <p className="mono-label mb-6 mx-auto inline-block text-accent">
        ✓ Payment received
      </p>

      <h1
        className="display text-ink-primary text-balance mb-8 mx-auto"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", maxWidth: "20ch" }}
      >
        {isSetup ? "Welcome — let's get you set up." : "Welcome to Foundation."}
      </h1>

      <p className="text-lg md:text-xl text-ink-muted leading-relaxed text-pretty mb-12 mx-auto max-w-2xl">
        {isSetup
          ? "Your Setup Session is booked. You'll get a Loom + voice-message kickoff from Dailen within 48 hours, with the full setup checklist and timeline."
          : "Your subscription is active. Welcome aboard. You'll get a Discord invite + first behind-the-build content drop within 24 hours."}
      </p>

      <div className="rounded-2xl bg-bg-surface border border-border-subtle p-6 md:p-8 mb-10 text-left max-w-2xl mx-auto">
        <p className="mono-label mb-3">What happens next</p>
        <ol className="space-y-3 text-base text-ink-muted leading-relaxed list-decimal list-inside">
          {isSetup ? (
            <>
              <li>You&apos;ll receive a confirmation email with your receipt + a calendar link to schedule the kickoff window.</li>
              <li>Dailen reviews your existing stack via async intake.</li>
              <li>Loom walkthrough + voice messages over the following week.</li>
              <li>Wrap-up: your CLAUDE.md, Keychain, Denise persona, three starter skills — fully configured.</li>
            </>
          ) : (
            <>
              <li>You&apos;ll receive a confirmation email with your receipt + a Discord invite.</li>
              <li>The first behind-the-build content drop arrives within 24 hours.</li>
              <li>Friday Q&amp;A recap in your inbox at the end of this week.</li>
              <li>You&apos;ll be notified when Apotheosis launches and your subscription auto-converts to Pro — same $19/mo, no price change.</li>
            </>
          )}
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-3 font-medium hover:bg-accent-bright transition-colors"
        >
          Explore the portfolio
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle px-7 py-3 font-medium hover:border-accent hover:text-accent transition-colors"
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
