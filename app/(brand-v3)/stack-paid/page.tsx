// app/(brand-v3)/stack-paid/page.tsx
//
// Post-purchase landing page for Peer Operator's Stack v1 buyers.
// Reachable at /stack-paid. The Stripe Payment Link confirmation message
// can be updated (Dashboard-only) to point here instead of the raw zip URL
// for a richer post-purchase experience.
//
// Page intentionally has no auth gate. The URL itself is the soft gate —
// only buyers know to come here (linked from the Stripe confirmation page
// + the Resend welcome email).

import type { Metadata } from "next";
import { SKOOL_SYNAPSE_STUDIO } from "@/lib/site-config";

const STACK_ZIP_URL = "https://synapsedynamics.io/stack-v1.zip";
// Tally feedback form for testimonial collection. Until the day-7 Tally form
// is built per ~/Desktop/peer-operators-stack-testimonial-form-spec.md, this
// link points at a mailto fallback so buyers have a path to send feedback.
const FEEDBACK_LINK =
  "mailto:dailen@synapsedynamics.io?subject=Peer%20Operator%27s%20Stack%20%E2%80%94%20feedback";

export const metadata: Metadata = {
  title: "You're in — Peer Operator's Stack v1",
  description:
    "Download your Stack zip, find the install steps, and pick the first skill to install. Welcome to the operator library.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StackPaidPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <div className="mx-auto w-full max-w-3xl">
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          YOU&apos;RE IN / STACK V1
        </p>

        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          The Stack is yours.
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          Lifetime access to v1 and any v1.x updates. 14-day refund window. The
          download is below; the install steps are below that; the rest of this
          page is the day-1 walkthrough you&apos;d want from the person who shipped it.
        </p>

        <section className="mt-12">
          <a
            href={STACK_ZIP_URL}
            className="inline-block rounded px-8 py-4 text-base font-semibold"
            style={{
              background: "var(--bv3-gold)",
              color: "var(--bv3-ink-strong)",
            }}
            download
          >
            Download stack-v1.zip
          </a>
          <p
            className="mt-3 bv3-mono text-sm"
            style={{ color: "var(--bv3-cream)" }}
          >
            ~57KB · 20 skills · README + INSTALL + CHANGELOG inside
          </p>
        </section>

        <section className="mt-16">
          <h2
            className="bv3-display text-3xl md:text-4xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Day 1 — what to do
          </h2>
          <ol
            className="mt-6 space-y-4 text-base leading-relaxed"
            style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
          >
            <li>
              <strong>1. Unzip somewhere stable.</strong>{" "}
              <code className="bv3-mono">~/Desktop/peer-operators-stack-v1/</code>{" "}
              is fine.
            </li>
            <li>
              <strong>2. Read the README.</strong> It groups the 20 skills into
              5 categories and tells you which ones to skim first.
            </li>
            <li>
              <strong>3. Pick the one skill</strong> that addresses what&apos;s
              frustrating you most this week. Not the most interesting one. The
              most painful one.
            </li>
            <li>
              <strong>4. Install that one skill.</strong> Each skill is
              standalone and runs 300 to 1,000 words. You can install one in 20
              minutes, not 20 in one day.
            </li>
            <li>
              <strong>5. Run it for a week.</strong> If it lands, install the
              next. If it doesn&apos;t, the refund window is open. Reply to your
              Stripe receipt with one line.
            </li>
          </ol>
        </section>

        <section className="mt-16">
          <h2
            className="bv3-display text-3xl md:text-4xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What&apos;s in it
          </h2>
          <div
            className="mt-6 space-y-4 text-base leading-relaxed"
            style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
          >
            <p>
              <strong>Memory + retrieval (skills 1-4):</strong> atomic-node
              template, retrieval contracts, decisions-log + inferences-log
              index patterns. The stuff that keeps an agent from forgetting
              what you decided last week.
            </p>
            <p>
              <strong>Voice + craft (skills 5-8):</strong> brand-voice linter,
              doctrine injection, banned-words list, drop-overclaim editing
              pass. So generated copy doesn&apos;t ship sounding like everyone
              else&apos;s generated copy.
            </p>
            <p>
              <strong>Workflow + skills (skills 9-14):</strong> find-skill
              router, CLAUDE.md TOC pattern, /goal session-start ritual,
              Plan-Mode brief, Chrome DevTools MCP verification, subagent
              dispatch.
            </p>
            <p>
              <strong>Engagement layer (skills 15-18):</strong> engagement
              letter (caps liability at fees paid), Calendly-to-Stripe redirect
              (no-show rate from 40% to 5%), Tally intake spec, Stripe
              hosted-confirmation pattern.
            </p>
            <p>
              <strong>Bonus + diagnostic (skills 19-20):</strong> 8-Layer Agent
              Stack Diagnostic and ICAC tier discipline for what to ingest and
              what to skip.
            </p>
          </div>
        </section>

        <section className="mt-16">
          <h2
            className="bv3-display text-3xl md:text-4xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Join the community
          </h2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
          >
            Synapse Studio on Skool is where the build-notes drop. Weekly
            architecture office hours. Comment on what&apos;s next in v1.1. Drop
            your weakest 8-Layer Diagnostic layer and I&apos;ll point you at the
            skill that bites it soonest.
          </p>
          <a
            href={SKOOL_SYNAPSE_STUDIO}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded px-6 py-3 text-sm font-semibold"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "var(--bv3-gold)",
              color: "var(--bv3-gold)",
            }}
          >
            Join Synapse Studio →
          </a>
        </section>

        <section className="mt-16">
          <h2
            className="bv3-display text-3xl md:text-4xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Founder-beta ask
          </h2>
          <p
            className="mt-6 text-base leading-relaxed"
            style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
          >
            If a specific pattern lands for you in the first week, I&apos;d
            value a one-line quote I can put on the landing page. The current
            quotes are placeholders. Yours would be the first real one. Reply
            to this thread or email me direct:
          </p>
          <a
            href={FEEDBACK_LINK}
            className="mt-6 inline-block rounded px-6 py-3 text-sm font-semibold"
            style={{
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "var(--bv3-cream)",
              color: "var(--bv3-cream)",
            }}
          >
            Send a one-line quote →
          </a>
        </section>

        <section
          className="mt-16 mb-8 border-t pt-8"
          style={{ borderColor: "var(--bv3-cream-dim, rgba(239, 237, 229, 0.25))" }}
        >
          <p
            className="bv3-mono text-sm"
            style={{ color: "var(--bv3-cream)" }}
          >
            14-day refund window starts the day you bought. Reply to your
            Stripe receipt with one line and the refund is yours, no questions
            asked.
          </p>
          <p
            className="bv3-mono mt-2 text-sm"
            style={{ color: "var(--bv3-cream)" }}
          >
            Synapse Dynamics Segmented · Black Sheep 247 LLC · Toledo, OH
          </p>
        </section>
      </div>
    </main>
  );
}
