// app/(brand-v3)/stack/page.tsx
//
// Pre-purchase product page for Peer Operator's Stack v1.
// Lives under the brand-v3 route group so it inherits the matte-gray shell.
// Companion post-purchase page at /stack-paid.
//
// ICP locked 2026-05-20 per
// AI Hub/Decisions/decision-2026-05-20-stack-v1-icp-solo-ai-builder-context-drift.md
// Brand v3 variant V3 Cursor locked 2026-05-20 per
// AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md

import type { Metadata } from "next";
import { STRIPE_PEER_OPERATOR_STACK_LINK, SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "Peer Operator's Stack v1 — 20 patterns for solo AI builders | Synapse Dynamics Segmented",
  description:
    "For the solo AI builder who's lost a session to context drift. Twenty patterns to keep agents from drifting, hallucinating, and losing memory across sessions. $149 once. Lifetime v1.x access. 14-day refund.",
  alternates: { canonical: `${SITE_URL}/stack` },
  openGraph: {
    title: "Peer Operator's Stack v1",
    description:
      "Twenty patterns to keep AI agents from drifting, hallucinating, and losing memory. For solo AI builders who've lost a session to context drift.",
    url: `${SITE_URL}/stack`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peer Operator's Stack v1",
    description:
      "Twenty patterns to keep AI agents from drifting, hallucinating, and losing memory.",
  },
};

export default function StackPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* Header: mono-prefixed product label (V3 Cursor register) */}
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          OPERATOR LIBRARY / S1
        </p>

        {/* H1: working name + stuck-point pull */}
        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          Peer Operator&apos;s Stack v1
        </h1>

        {/* Stuck-point lead per locked ICP copy seed */}
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          For the solo AI builder who&apos;s lost a session to context drift.
          Twenty patterns to keep agents from drifting, hallucinating, and
          losing memory across sessions. Founder-built, not VC-built.
        </p>

        {/* Pill row: key attributes */}
        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>$149 ONCE</li>
          <li>LIFETIME V1.X ACCESS</li>
          <li>14-DAY REFUND</li>
          <li>20 NAMED PATTERNS</li>
          <li>5 CATEGORIES</li>
        </ul>

        {/* Buy CTA above the fold (V3 Cursor: terminal-prompt aesthetic) */}
        <section className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={STRIPE_PEER_OPERATOR_STACK_LINK}
            className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--bv3-gold)",
              color: "var(--bv3-shell)",
            }}
          >
            Buy the Stack — $149
          </a>
          <a
            href="#what-you-get"
            className="rounded-md px-6 py-4 text-base"
            style={{
              border: "1px solid var(--bv3-border-strong)",
              color: "var(--bv3-ink)",
            }}
          >
            See what&apos;s inside
          </a>
        </section>

        {/* What you get — categorized skill table */}
        <section
          id="what-you-get"
          className="mt-16 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{
              color: "var(--bv3-gold)",
              letterSpacing: "0.18em",
            }}
          >
            INVENTORY / 20 PATTERNS
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What&apos;s in the box
          </h2>

          {STACK_CATEGORIES.map((cat) => (
            <div key={cat.title} className="mt-8 first:mt-6">
              <p
                className="bv3-mono text-xs"
                style={{
                  color: "var(--bv3-gold-bright)",
                  letterSpacing: "0.14em",
                }}
              >
                {cat.label}
              </p>
              <h3
                className="bv3-display mt-2 text-lg"
                style={{ color: "var(--bv3-cream)" }}
              >
                {cat.title}
              </h3>

              <ul className="mt-4 flex flex-col gap-3">
                {cat.skills.map((s) => (
                  <li key={s.num} className="flex items-start gap-4">
                    <span
                      className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                      style={{
                        color: "var(--bv3-gold-bright)",
                        border: "1px solid var(--bv3-border-subtle)",
                      }}
                    >
                      {s.num}
                    </span>
                    <span className="flex-1">
                      <code
                        className="bv3-mono text-sm"
                        style={{ color: "var(--bv3-cream)" }}
                      >
                        {s.name}
                      </code>
                      <span
                        className="ml-3 text-sm"
                        style={{ color: "var(--bv3-ink-muted)" }}
                      >
                        {s.what}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Why this exists — context-drift problem framing */}
        <section className="mt-16">
          <p
            className="bv3-mono text-xs"
            style={{
              color: "var(--bv3-gold)",
              letterSpacing: "0.18em",
            }}
          >
            WHY THIS EXISTS
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            You lost a session. Then another.
          </h2>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            You ship with Claude Code daily. Sometimes Cursor or Codex.
            Eventually you hit the wall every solo AI builder hits.
            The agent drifts. Voice slides. Memory thins. A two-hour
            session lands a feature that breaks three existing ones. You
            burn an evening untangling decisions the agent made on its
            own.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            The Stack is the working library I use inside my own builds
            to stop this. Twenty patterns, five categories, written down
            so each one can be forked, adapted, and put to work in your
            own stack within an hour of reading it.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Not a course. Not a SaaS subscription. A library of patterns.
            You read, you fork, you ship. The patterns compound across
            every project you start after the first one.
          </p>
        </section>

        {/* Who this is for / not for */}
        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <p
              className="bv3-mono text-xs"
              style={{
                color: "var(--bv3-gold-bright)",
                letterSpacing: "0.14em",
              }}
            >
              FOR
            </p>
            <h3
              className="bv3-display mt-2 text-lg"
              style={{ color: "var(--bv3-cream)" }}
            >
              Solo AI builders who&apos;ve felt the drift
            </h3>
            <ul
              className="mt-4 flex flex-col gap-2 text-sm leading-relaxed"
              style={{ color: "var(--bv3-ink)" }}
            >
              <li>
                Running Claude Code, Cursor, or Codex inside your daily
                workflow
              </li>
              <li>
                Have hit memory drift, voice drift, or a hallucination that
                cost real hours
              </li>
              <li>
                Solo or pair-programming with one technical buddy
              </li>
              <li>
                Want a fork-and-adapt library, not a course to consume
              </li>
              <li>
                Operate a small (1-3 person) shop, indie practice, or
                pre-revenue indie product
              </li>
            </ul>
          </div>

          <div>
            <p
              className="bv3-mono text-xs"
              style={{
                color: "var(--bv3-wine)",
                letterSpacing: "0.14em",
              }}
            >
              NOT FOR
            </p>
            <h3
              className="bv3-display mt-2 text-lg"
              style={{ color: "var(--bv3-cream)" }}
            >
              Tourists and tool-shoppers
            </h3>
            <ul
              className="mt-4 flex flex-col gap-2 text-sm leading-relaxed"
              style={{ color: "var(--bv3-ink)" }}
            >
              <li>
                No-code &quot;set it and forget it&quot; automation kit
                shoppers — the patterns assume you&apos;ll fork
              </li>
              <li>
                People who haven&apos;t yet picked up a coding assistant
              </li>
              <li>
                Operators looking for a single end-to-end SaaS — this is a
                library, you assemble the stack
              </li>
            </ul>
          </div>
        </section>

        {/* Bottom CTA with cross-sell to Atomic Note Pack */}
        <section className="mt-16 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{
              color: "var(--bv3-gold)",
              letterSpacing: "0.18em",
            }}
          >
            NEXT STEP
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Stop losing sessions.
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            $149 once. Lifetime v1.x access. 14-day refund. If the patterns
            don&apos;t pay for themselves inside two weeks of working through
            them, mail me and I refund.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={STRIPE_PEER_OPERATOR_STACK_LINK}
              className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--bv3-gold)",
                color: "var(--bv3-shell)",
              }}
            >
              Buy the Stack — $149
            </a>
            <a
              href="/atomic-note-pack"
              className="rounded-md px-6 py-4 text-base"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-ink)",
              }}
            >
              Or start with Atomic Note Pack — $19
            </a>
          </div>
        </section>

        {/* Status bar footer (V3 Cursor register) */}
        <footer
          className="mt-24 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-xs"
          style={{
            borderColor: "var(--bv3-border-subtle)",
            color: "var(--bv3-ink-dim)",
          }}
        >
          <p className="bv3-mono" style={{ letterSpacing: "0.14em" }}>
            S1 / V1.0 / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
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

const STACK_CATEGORIES = [
  {
    label: "CATEGORY / 01",
    title: "Memory and retrieval",
    skills: [
      {
        num: "01",
        name: "atomic-node-template",
        what: "Single-claim memory units, typed frontmatter, graph-linked",
      },
      {
        num: "02",
        name: "retrieval-contract-template",
        what: "Short per-project file that defines what the agent needs to know",
      },
      {
        num: "03",
        name: "decisions-log-rolling-index",
        what: "One-line index linking into atomic decision nodes",
      },
      {
        num: "04",
        name: "inferences-log-rolling-index",
        what: "Same pattern for claims, kept separate from decisions",
      },
    ],
  },
  {
    label: "CATEGORY / 02",
    title: "Voice and craft",
    skills: [
      {
        num: "05",
        name: "brand-voice-linter",
        what: "Regex pre-commit lint that catches banned tokens",
      },
      {
        num: "06",
        name: "doctrine-injection-pattern",
        what: "Two-prompt sequence for craft: dissect canon, then generate",
      },
      {
        num: "07",
        name: "banned-words-list-template",
        what: "Typed, scoped list paired with the linter",
      },
      {
        num: "08",
        name: "drop-overclaim-editing-pass",
        what: "Six-check pass that strips hype after the first draft",
      },
    ],
  },
  {
    label: "CATEGORY / 03",
    title: "Workflow and skills",
    skills: [
      {
        num: "09",
        name: "find-skill-router",
        what: "Gateway router that scores installed skills against the task",
      },
      {
        num: "10",
        name: "claude-md-toc-pattern",
        what: "Keeps CLAUDE.md under 200 lines as a router into specialized docs",
      },
      {
        num: "11",
        name: "goal-session-start-ritual",
        what: "Three-step opening: goal, plan, managed outcomes",
      },
      {
        num: "12",
        name: "plan-mode-brief-template",
        what: "Read-only plan the agent writes before any mutation",
      },
      {
        num: "13",
        name: "chrome-devtools-mcp-verification",
        what: "Self-verify what the browser actually renders",
      },
      {
        num: "14",
        name: "subagent-dispatch-template",
        what: "When to spawn, what to brief, what return shape to require",
      },
    ],
  },
  {
    label: "CATEGORY / 04",
    title: "Engagement layer",
    skills: [
      {
        num: "15",
        name: "engagement-letter-template",
        what: "Liability-capped engagement letter for productized services",
      },
      {
        num: "16",
        name: "calendly-to-stripe-redirect",
        what: "Schedule first, pay second, no-show rate near zero",
      },
      {
        num: "17",
        name: "tally-intake-form-spec",
        what: "13-question pre-call intake form",
      },
      {
        num: "18",
        name: "stripe-hosted-confirmation-pattern",
        what: "Custom post-purchase message that closes the onboarding loop",
      },
    ],
  },
  {
    label: "CATEGORY / 05",
    title: "Diagnostic + discipline",
    skills: [
      {
        num: "19",
        name: "eight-layer-agent-stack-diagnostic",
        what: "Scoring instrument for auditing an agent stack",
      },
      {
        num: "20",
        name: "icac-tier-discipline",
        what: "Full / Light / No tier-gated ingest for memory hygiene",
      },
    ],
  },
];
