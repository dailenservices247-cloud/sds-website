// app/(brand-v3)/work/page.tsx
//
// Canonical consulting hub for SDS. V3 Cursor brand register.
// Single high-trust overview surface for consulting buyers — Architect /
// Automator / Strategist tracks + O1 Architecture Review ladder +
// Headless Architect Retainer (banked) + process + refund.
//
// Complements (does not replace) the existing (marketing)/services/
// route group, which keeps role-by-role subpages (architect / automator /
// strategist). /work is the "what's it like to work with SDS" canonical
// surface; /services/* is the per-role deep-dive.
//
// Per brand v3 V3 Cursor register decision (2026-05-20).

import type { Metadata } from "next";
import {
  STRIPE_O1_REVIEW_ESSENTIALS_LINK,
  STRIPE_O1_REVIEW_STANDARD_LINK,
  STRIPE_O1_REVIEW_PREMIUM_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Work with SDS — consulting tracks, O1 Review, retainer | Synapse Dynamics Segmented",
  description:
    "Three consulting tracks (Architect / Automator / Strategist) plus the O1 Architecture Review three-tier ladder ($1.5K / $2.5K / $5K). Founder-built, not VC-built. Full refund before the call.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: "Work with SDS",
    description:
      "Architect / Automator / Strategist tracks + O1 Architecture Review ladder. Full refund before the call.",
    url: `${SITE_URL}/work`,
    type: "website",
  },
};

const TRACKS = [
  {
    label: "TRACK / 01",
    name: "Architect",
    tagline: "Custom apps, web platforms, and the systems they run on.",
    when:
      "When off-the-shelf doesn't fit and you need software built the way your business actually works.",
    engagements: [
      { name: "Lean Build", price: "$4,500+", note: "~2-week focused build, single deliverable" },
      { name: "Standard Platform", price: "see /services/architect", note: "Multi-feature production application" },
      { name: "Enterprise Build", price: "see /services/architect", note: "Multi-stakeholder long-engagement" },
    ],
    href: "/services/architect",
  },
  {
    label: "TRACK / 02",
    name: "Automator",
    tagline: "Recurring work that should run itself.",
    when:
      "When manual recurring tasks are eating real time + the workflow is stable enough to automate.",
    engagements: [
      { name: "Workflow Spark", price: "$2,500+", note: "One automation, deployed + monitored + documented" },
      { name: "Operations Suite", price: "$5,500+", note: "Connected automations covering a whole function" },
      { name: "Embedded Automator", price: "$1,500/mo", note: "Part-time automation team, ongoing" },
    ],
    href: "/services/automator",
  },
  {
    label: "TRACK / 03",
    name: "Strategist",
    tagline: "AI strategy, positioning, and the work before the work.",
    when:
      "When the team wants to add AI somewhere but doesn't know where. Or when 5 vendors are circling and you need a structured evaluation.",
    engagements: [
      { name: "Discovery Sprint", price: "$1,500", note: "1-week mapping + prioritized hit list" },
      { name: "Quarterly Plan", price: "$4,500", note: "90-day roadmap + vendor evals + build-vs-buy" },
      { name: "Embedded Strategist", price: "$3,500/mo", note: "Advisor access + quarterly reviews" },
    ],
    href: "/services/strategist",
  },
];

export default function WorkPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
        >
          CONSULTING / WORK WITH SDS
        </p>

        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          Work with SDS
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          Three consulting tracks plus the O1 Architecture Review for
          AI-specific audits. Founder-built, not VC-built. Specific deliverables,
          fixed-fee where possible, full refund before the call.
        </p>

        {/* Pill row */}
        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>3 TRACKS</li>
          <li>O1 REVIEW 3-TIER LADDER</li>
          <li>FIXED-FEE WHERE POSSIBLE</li>
          <li>FULL REFUND BEFORE CALL</li>
          <li>RESPONSE WITHIN 48 HR</li>
        </ul>

        {/* Decision-tree section */}
        <section
          className="mt-16 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            PICK A STARTING POINT
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Where to start depends on the question.
          </h2>

          <ul className="mt-6 flex flex-col gap-4">
            {[
              {
                if: "You want a senior architect's eye on your AI build",
                then: "Book the O1 Architecture Review (3-tier ladder, $1.5K / $2.5K / $5K)",
                href: "/o1-review",
              },
              {
                if: "You need software built (web app, internal tool, platform)",
                then: "Start with Architect track. Lean Build for one focused deliverable, Standard or Enterprise for larger.",
                href: "/services/architect",
              },
              {
                if: "You have manual workflows eating recurring time",
                then: "Start with Automator track. Workflow Spark for one specific pain, Operations Suite for a whole function.",
                href: "/services/automator",
              },
              {
                if: "You don't know where to add AI yet — strategy first",
                then: "Start with Strategist Discovery Sprint ($1,500). One week, mapping + hit list.",
                href: "/services/strategist",
              },
              {
                if: "You want ongoing access to SDS as part-time team",
                then: "Embedded engagement on any of the 3 tracks. Monthly retainer, scope per track.",
                href: "/services",
              },
            ].map((row, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                  style={{
                    color: "var(--bv3-wine-text)",
                    border: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  IF
                </span>
                <div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink)" }}
                  >
                    {row.if}
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    →{" "}
                    <a
                      href={row.href}
                      style={{
                        color: "var(--bv3-wine-text)",
                        textDecoration: "underline",
                      }}
                    >
                      {row.then}
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 3 tracks */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            THREE TRACKS / 09 ENGAGEMENT MODELS
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What SDS actually ships
          </h2>

          <div className="mt-8 flex flex-col gap-8">
            {TRACKS.map((track) => (
              <div
                key={track.name}
                className="rounded-md p-6 md:p-8"
                style={{
                  backgroundColor: "var(--bv3-shell-deep)",
                  border: "1px solid var(--bv3-border-subtle)",
                }}
              >
                <p
                  className="bv3-mono text-xs"
                  style={{
                    color: "var(--bv3-wine-text)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {track.label}
                </p>
                <h3
                  className="bv3-display mt-2 text-3xl"
                  style={{ color: "var(--bv3-ink-strong)" }}
                >
                  {track.name}
                </h3>
                <p
                  className="mt-2 text-base"
                  style={{ color: "var(--bv3-cream)" }}
                >
                  {track.tagline}
                </p>

                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  <span
                    className="bv3-mono text-xs"
                    style={{
                      color: "var(--bv3-wine-text)",
                      letterSpacing: "0.14em",
                    }}
                  >
                    WHEN:{" "}
                  </span>
                  {track.when}
                </p>

                <ul className="mt-6 flex flex-col gap-3">
                  {track.engagements.map((e) => (
                    <li
                      key={e.name}
                      className="flex items-start gap-4 text-sm"
                    >
                      <span
                        className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                        style={{
                          color: "var(--bv3-wine-text)",
                          border: "1px solid var(--bv3-border-subtle)",
                        }}
                      >
                        {e.price}
                      </span>
                      <span>
                        <code
                          className="bv3-mono text-sm"
                          style={{ color: "var(--bv3-cream)" }}
                        >
                          {e.name}
                        </code>
                        <span
                          className="ml-3 text-sm"
                          style={{ color: "var(--bv3-ink-muted)" }}
                        >
                          {e.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 text-sm">
                  <a
                    href={track.href}
                    style={{
                      color: "var(--bv3-wine-text)",
                      textDecoration: "underline",
                    }}
                  >
                    Full {track.name} track spec →
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* O1 Review block */}
        <section
          className="mt-20 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            AI-SPECIFIC AUDIT / 3-TIER
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            O1 Architecture Review
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Senior architect&apos;s eye on your AI deployment. 90-minute review +
            written report within 72 hours + follow-up. Standard and Premium
            tiers include the six-component implementation checklist (workflow
            / data / authority / evals / audit / recovery).
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
                backgroundColor: "var(--bv3-wine)",
                color: "var(--bv3-on-wine)",
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

          <p className="mt-6 text-sm">
            <a
              href="/o1-review"
              style={{
                color: "var(--bv3-wine-text)",
                textDecoration: "underline",
              }}
            >
              Full O1 Review spec, tier comparison, and 6-component checklist →
            </a>
          </p>
        </section>

        {/* Headless Architect Retainer (banked) */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            R1 / BANKED
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Headless Architect Retainer
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Monthly architecture review + governance handoff + value-back
            guarantee for capped cohort. $3-5K/mo, 10-client cap. Currently
            BANKED — opens when Stack v1 validates ICP signal or a warm
            referral surfaces interest. Email to express interest early.
          </p>
        </section>

        {/* Process explainer */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            HOW IT WORKS
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            From inquiry to delivery
          </h2>

          <ol className="mt-8 flex flex-col gap-6">
            {[
              {
                step: "01",
                title: "You inquire",
                body: "Pick a starting point (O1 Review, Architect/Automator/Strategist track, or Discovery Sprint). Pay if it&apos;s a fixed-fee tier; book a call if it needs scoping first.",
              },
              {
                step: "02",
                title: "Intake form (~10 min)",
                body: "13-question intake captures what you&apos;re building, where it is, what&apos;s stuck, what success looks like. Lands in your inbox within 5 minutes of payment / booking.",
              },
              {
                step: "03",
                title: "Live review or kickoff call",
                body: "90 minutes for O1 Review. Longer scoping call for build / automation / strategy engagements. Zoom or Meet, recorded if you want it.",
              },
              {
                step: "04",
                title: "Written report within 72 hours (O1) or build kickoff (engagements)",
                body: "O1 Review buyers get the written report + prioritized remediation plan. Build / automation / strategy engagements move into the agreed work cadence.",
              },
              {
                step: "05",
                title: "Follow-up",
                body: "Per tier. O1 Essentials = 2 emails over 30 days. Standard = +1 follow-up call. Premium = +Slack channel for 60 days. Embedded engagements = ongoing.",
              },
            ].map((s) => (
              <li key={s.step} className="flex items-start gap-6">
                <span
                  className="bv3-mono shrink-0 rounded-md px-3 py-1 text-xs"
                  style={{
                    color: "var(--bv3-wine-text)",
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
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Refund + cancellation */}
        <section className="mt-20">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
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
            O1 Review tiers: Stripe-processed full refund if you cancel before
            the 90-minute call. Post-call refunds at SDS discretion based on
            engagement specifics.
          </p>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Build / automation / strategy engagements: liability-capped at fees
            paid per engagement-letter template. No quarrels on the cancellation
            terms in the letter.
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
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
          >
            START HERE
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Pick the starting point that fits the question.
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Not sure? Default to O1 Architecture Review Essentials ($1,500). 90
            minutes, written report within 72 hours, full refund before the
            call. The fastest way to find out if SDS is the right fit for the
            specific question you have.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={STRIPE_O1_REVIEW_ESSENTIALS_LINK}
              className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--bv3-wine)",
                color: "var(--bv3-on-wine)",
              }}
            >
              Book O1 Review Essentials — $1,500
            </a>
            <a
              href="/diagnostic"
              className="rounded-md px-6 py-4 text-base"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-ink)",
              }}
            >
              Or run the free 5-min diagnostic first
            </a>
          </div>

          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "60ch" }}
          >
            The free 5-minute diagnostic at <code className="bv3-mono">/diagnostic</code>{" "}
            scores your AI agent stack across 8 layers and identifies the weakest
            one. No email required. Useful if you want a self-serve read before
            paying for a tier.
          </p>
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
            WORK / CONSULTING-HUB / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
          </p>
          <p>
            <a
              href="/"
              style={{ color: "var(--bv3-wine-text)", textDecoration: "underline" }}
            >
              ← Synapse Dynamics
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
