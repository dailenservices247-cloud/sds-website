// app/(brand-v3)/o1-review/page.tsx
//
// O1 Architecture Review 3-tier ladder landing page.
// Locked 2026-05-20 per
// AI Hub/Decisions/decision-2026-05-20-o1-review-three-tier-ladder.md
//
// Brand v3 V3 Cursor register per
// AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md

import type { Metadata } from "next";
import {
  STRIPE_O1_REVIEW_ESSENTIALS_LINK,
  STRIPE_O1_REVIEW_STANDARD_LINK,
  STRIPE_O1_REVIEW_PREMIUM_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "O1 Architecture Review — three tiers for AI builds | Synapse Dynamics Segmented",
  description:
    "Senior architect review for your AI build, deployment, or stuck system. Three tiers: $1.5K Essentials, $2.5K Standard, $5K Premium. 90-min review, written report within 72 hours, full refund before the call.",
  alternates: { canonical: `${SITE_URL}/o1-review` },
  openGraph: {
    title: "O1 Architecture Review — three tiers",
    description:
      "Senior architect review for AI builds. $1.5K Essentials / $2.5K Standard / $5K Premium. Full refund before the call.",
    url: `${SITE_URL}/o1-review`,
    type: "website",
  },
};

const TIERS = [
  {
    slug: "essentials",
    label: "TIER / 01",
    name: "Essentials",
    price: "$1,500",
    stripeUrl: STRIPE_O1_REVIEW_ESSENTIALS_LINK,
    tagline: "For the first-time buyer testing the relationship",
    deliverables: [
      "90-minute review call (Zoom or Meet)",
      "Written report within 72 hours of the call",
      "Two follow-up emails over 30 days",
    ],
    bestFor:
      "First consulting engagement with SDS. Single-system audit. Pre-build sanity check before committing to a longer engagement.",
  },
  {
    slug: "standard",
    label: "TIER / 02",
    name: "Standard",
    price: "$2,500",
    stripeUrl: STRIPE_O1_REVIEW_STANDARD_LINK,
    tagline: "For the build that's past prototype",
    deliverables: [
      "Everything in Essentials",
      "Six-component implementation checklist scorecard (workflow / data / authority / evals / audit / recovery)",
      "Per-component remediation plan",
      "One follow-up call at 30 days (45 min)",
    ],
    bestFor:
      "Mid-stage AI build with multiple moving parts. Repeat or referred buyer. Production deployment with stakes.",
  },
  {
    slug: "premium",
    label: "TIER / 03",
    name: "Premium",
    price: "$5,000",
    stripeUrl: STRIPE_O1_REVIEW_PREMIUM_LINK,
    tagline: "For active deployments with multi-stakeholder stakes",
    deliverables: [
      "Everything in Standard",
      "Second 90-minute call at 30 days",
      "Private Slack channel access for 60 days",
      "Direct architect on call for blocking questions during 60-day window",
    ],
    bestFor:
      "Active AI deployment with revenue or compliance stakes. Multi-stakeholder project. Need an architect on call for ~2 months.",
  },
];

const SIX_COMPONENT_CHECKLIST = [
  {
    num: "01",
    name: "WORKFLOW",
    what: "What's the actual job being automated? One-shot pipeline or multi-step agentic loop?",
  },
  {
    num: "02",
    name: "DATA",
    what: "What data does the agent need, where does it live, what governance + access controls exist?",
  },
  {
    num: "03",
    name: "AUTHORITY",
    what: "What's the agent allowed to do unilaterally vs. needs human-in-loop? Documented?",
  },
  {
    num: "04",
    name: "EVALS",
    what: "How is success measured? Scenario tests, regression checks, eval scripts?",
  },
  {
    num: "05",
    name: "AUDIT",
    what: "What's logged? Can post-incident review reconstruct what happened?",
  },
  {
    num: "06",
    name: "RECOVERY",
    what: "When the agent fails or hallucinates, what's the fallback? Manual? Automated rollback?",
  },
];

export default function O1ReviewPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          ARCHITECT REVIEW / 3-TIER LADDER
        </p>

        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          O1 Architecture Review
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          For the operator who needs a senior architect&apos;s eye on their
          AI deployment — before it ships, while it&apos;s stuck, or when the
          stakes just rose. Three tiers. Founder-built, not VC-built. Full
          refund before the call.
        </p>

        {/* Pill row */}
        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>90-MIN CALL</li>
          <li>WRITTEN REPORT &lt; 72 HR</li>
          <li>FOLLOW-UP INCLUDED</li>
          <li>FULL REFUND BEFORE THE CALL</li>
        </ul>

        {/* Three tier cards */}
        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.slug}
              className="flex flex-col rounded-md p-6"
              style={{
                backgroundColor: "var(--bv3-shell-deep)",
                border: "1px solid var(--bv3-border-subtle)",
              }}
            >
              <p
                className="bv3-mono text-xs"
                style={{
                  color: "var(--bv3-gold-bright)",
                  letterSpacing: "0.14em",
                }}
              >
                {tier.label}
              </p>
              <h2
                className="bv3-display mt-2 text-3xl"
                style={{ color: "var(--bv3-ink-strong)" }}
              >
                {tier.name}
              </h2>
              <p
                className="bv3-display mt-1 text-2xl"
                style={{ color: "var(--bv3-gold)" }}
              >
                {tier.price}
              </p>

              <p
                className="mt-4 text-sm leading-relaxed"
                style={{ color: "var(--bv3-cream)" }}
              >
                {tier.tagline}
              </p>

              <ul
                className="mt-6 flex flex-col gap-2 text-sm leading-relaxed"
                style={{ color: "var(--bv3-ink)" }}
              >
                {tier.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <span
                      className="bv3-mono mt-1 shrink-0 text-xs"
                      style={{ color: "var(--bv3-gold-bright)" }}
                    >
                      ▸
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div
                className="mt-6 border-t pt-4"
                style={{ borderColor: "var(--bv3-border-subtle)" }}
              >
                <p
                  className="bv3-mono text-xs"
                  style={{
                    color: "var(--bv3-ink-muted)",
                    letterSpacing: "0.14em",
                  }}
                >
                  BEST FOR
                </p>
                <p
                  className="mt-2 text-xs leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  {tier.bestFor}
                </p>
              </div>

              <a
                href={tier.stripeUrl}
                className="mt-6 rounded-md px-4 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--bv3-gold)",
                  color: "var(--bv3-shell)",
                }}
              >
                Book {tier.name}
              </a>
            </div>
          ))}
        </section>

        {/* What the 6-component checklist is */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            STANDARD + PREMIUM DELIVERABLE
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The six-component implementation checklist
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Standard and Premium tiers ship with a per-component scorecard.
            Each dimension below gets a present/partial/missing rating, plus
            a concrete remediation step. The framework comes from
            implementation-deployment work at scale — adapted for the
            indie-and-mid-market builder.
          </p>

          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {SIX_COMPONENT_CHECKLIST.map((item) => (
              <li
                key={item.num}
                className="rounded-md p-5"
                style={{
                  backgroundColor: "var(--bv3-shell-deep)",
                  border: "1px solid var(--bv3-border-subtle)",
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className="bv3-mono text-xs"
                    style={{
                      color: "var(--bv3-gold-bright)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    {item.num}
                  </span>
                  <h3
                    className="bv3-mono text-sm"
                    style={{
                      color: "var(--bv3-cream)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {item.name}
                  </h3>
                </div>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--bv3-ink)" }}
                >
                  {item.what}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* How the engagement works */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            From payment to report
          </h2>

          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                step: "01",
                title: "Pay + intake",
                body: "Stripe checkout for your tier. Within 5 minutes you get the intake form (13 questions, ~10 minutes to fill in). The intake captures what you're building, where it is, and what you're stuck on.",
              },
              {
                step: "02",
                title: "Schedule the call",
                body: "Calendly link in the confirmation email. Pick a 90-minute slot. The call happens within 7 days unless you need it sooner — message and we'll move heaven and earth for urgent work.",
              },
              {
                step: "03",
                title: "Live review",
                body: "90 minutes, Zoom or Meet, recorded. We walk your build, your data, your agent stack. For Standard and Premium tiers, the six-component checklist drives the agenda.",
              },
              {
                step: "04",
                title: "Written report (within 72 hr)",
                body: "Written findings, prioritized remediation plan, and the next-three-things you should do. For Standard and Premium, includes per-component scorecard.",
              },
              {
                step: "05",
                title: "Follow-up",
                body: "Essentials: two follow-up emails over 30 days. Standard: +1 follow-up call at 30 days. Premium: +second 90-min call and private Slack channel for 60 days.",
              },
            ].map((s) => (
              <li key={s.step} className="flex items-start gap-6">
                <span
                  className="bv3-mono shrink-0 rounded-md px-3 py-1 text-xs"
                  style={{
                    color: "var(--bv3-gold-bright)",
                    border: "1px solid var(--bv3-border-subtle)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <h3
                    className="bv3-display text-lg"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Refund + cancellation */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            REFUND POLICY
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Full refund before the call
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Stripe-processed full refund if you cancel before the 90-minute
            call happens. Post-call refunds at SDS discretion based on
            engagement specifics. No quarrels, no questions. If the
            relationship isn&apos;t a fit, easier for both of us to find that
            out fast.
          </p>
        </section>

        {/* Bottom CTA */}
        <section
          className="mt-20 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            START HERE
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Pick the tier that fits the stakes.
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Not sure which tier? Default to Essentials if this is your first
            engagement with SDS. Default to Standard if your build is past
            prototype. Default to Premium if you need an architect on call
            for ~2 months. Refund before the call if it&apos;s not the right
            fit.
          </p>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <a
              href={STRIPE_O1_REVIEW_ESSENTIALS_LINK}
              className="rounded-md px-4 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-ink)",
              }}
            >
              Essentials — $1,500
            </a>
            <a
              href={STRIPE_O1_REVIEW_STANDARD_LINK}
              className="rounded-md px-4 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--bv3-gold)",
                color: "var(--bv3-shell)",
              }}
            >
              Standard — $2,500
            </a>
            <a
              href={STRIPE_O1_REVIEW_PREMIUM_LINK}
              className="rounded-md px-4 py-3 text-center text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-ink)",
              }}
            >
              Premium — $5,000
            </a>
          </div>
        </section>

        {/* Status bar footer */}
        <footer
          className="mt-24 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-xs"
          style={{
            borderColor: "var(--bv3-border-subtle)",
            color: "var(--bv3-ink-dim)",
          }}
        >
          <p className="bv3-mono" style={{ letterSpacing: "0.14em" }}>
            O1 / 3-TIER / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
          </p>
          <p>
            <a
              href="/"
              style={{ color: "var(--bv3-gold)", textDecoration: "underline" }}
            >
              ← Synapse Dynamics
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
