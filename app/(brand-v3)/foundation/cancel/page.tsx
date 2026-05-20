// app/(v3)/foundation/cancel/page.tsx
// Customers land here if they back out of Stripe Checkout without paying.

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription not started",
  description: "You backed out of checkout. No charges were made.",
};

export default function FoundationCancelPage() {
  return (
    <article className="container-x py-24 md:py-40 max-w-3xl text-center">
      <p className="mono-label mb-6 mx-auto inline-block">No charges made</p>

      <h1
        className="display text-ink-primary text-balance mb-8 mx-auto"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", maxWidth: "20ch" }}
      >
        You stopped before checkout.
      </h1>

      <p className="text-lg md:text-xl text-ink-muted leading-relaxed text-pretty mb-12 mx-auto max-w-2xl">
        That&rsquo;s fine. Nothing was charged. If you have questions about Foundation Subscription
        or just want to look around the portfolio first, here are some doors.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/foundation"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-3 font-medium hover:bg-accent-bright transition-colors"
        >
          Back to Foundation
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle px-7 py-3 font-medium hover:border-accent hover:text-accent transition-colors"
        >
          Explore the portfolio
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle px-7 py-3 font-medium hover:border-accent hover:text-accent transition-colors"
        >
          Ask a question
        </Link>
      </div>
    </article>
  );
}
