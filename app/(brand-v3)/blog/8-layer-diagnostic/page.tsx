// app/(brand-v3)/blog/8-layer-diagnostic/page.tsx
//
// Canonical SDS blog version of the 8-Layer Agent Stack Diagnostic.
// First long-form blog post for synapsedynamics.io. Cross-posted to
// LinkedIn (live as urn:li:activity:7461665305245782016) and to X
// (teaser tweet from @day1ai_official linking back to LinkedIn).
//
// This canonical URL is what we'll point future cross-channel content at
// so SEO + backlinks compound here rather than at LinkedIn / X.

import type { Metadata } from "next";
import { STRIPE_PEER_OPERATOR_STACK_LINK } from "@/lib/site-config";

const STACK_PAID_URL = "https://synapsedynamics.io/stack-paid";

export const metadata: Metadata = {
  title: "The 8-Layer Diagnostic: A 20-Minute Self-Audit for Your Agent Stack",
  description:
    "A scoring instrument that surfaces the highest-leverage gap in your agent stack in 20 minutes. Used as a quarterly self-audit or as the spine of a paid architecture review. Free.",
  openGraph: {
    title:
      "The 8-Layer Diagnostic: A 20-Minute Self-Audit for Your Agent Stack",
    description:
      "Score your agent stack across 8 layers. Surface the one bottleneck actually slowing you down. Free diagnostic from Synapse Dynamics Segmented.",
    type: "article",
    url: "https://synapsedynamics.io/blog/8-layer-diagnostic",
    siteName: "Synapse Dynamics Segmented",
    // OG image auto-resolved by Next.js from opengraph-image.tsx in this
    // same route segment. Dynamic ImageResponse at edge runtime.
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The 8-Layer Diagnostic: A 20-Minute Self-Audit for Your Agent Stack",
    description:
      "Score your agent stack across 8 layers. Surface the one bottleneck actually slowing you down.",
    // Twitter card image is auto-derived from the opengraph-image.tsx file
  },
};

export default function EightLayerDiagnosticPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <article className="mx-auto w-full max-w-3xl">
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.18em" }}
        >
          METHODOLOGY / FREE
        </p>

        <h1
          className="bv3-display mt-4 text-4xl md:text-5xl lg:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 1.0 }}
        >
          The 8-Layer Diagnostic: A 20-Minute Self-Audit for Your Agent Stack
        </h1>

        <p
          className="bv3-mono mt-4 text-sm"
          style={{ color: "var(--bv3-cream)" }}
        >
          Dailen Huntley · 2026-05-17 · ~7 min read
        </p>

        <div
          className="mt-12 space-y-6 text-base leading-relaxed md:text-lg"
          style={{ color: "var(--bv3-cream)" }}
        >
          <p>Most &ldquo;my agent stack feels slow&rdquo; problems are misdiagnosed.</p>

          <p>
            An operator I talked to last month had spent three months and
            $4,000 migrating from one orchestration tool to another. The stack
            still felt the same way slow. The migration was clean. The new
            tool worked. The slowness stayed.
          </p>

          <p>
            The reason is almost always the same. Operators reach for
            capability when the actual bottleneck is coordination. They add
            another agent, another MCP, another orchestration layer. The
            capability was fine. The coordination was not.
          </p>

          <p>
            I built a diagnostic to catch this before the next $4,000 gets
            spent. It scores an agent stack across eight layers and surfaces
            the highest-leverage point in 20 minutes. I run it on my own stack
            quarterly. I use it as the spine of paid architecture reviews.
            Here it is, free.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The 8 layers
          </h2>

          <ol className="space-y-4">
            <li>
              <strong>Organizational frame.</strong> Who the agent serves and
              what role it plays. The check: if you described the agent&apos;s
              job to a new hire, could they tell you what it does in one
              sentence?
            </li>
            <li>
              <strong>Tactical layer.</strong> Specific named tasks the agent
              runs. Not abstract capabilities. Actual tasks from this week.
              The check: what are the 5 specific tasks this agent ran in the
              last 7 days?
            </li>
            <li>
              <strong>Vertical loop.</strong> The agent&apos;s repeatable
              workflow per task. Input, work, output, verification. The check:
              walk me through what the agent does when given task X, step by
              step.
            </li>
            <li>
              <strong>Artifact layer.</strong> Deliverable format and audience
              fit. The check: does the output match what the recipient needs,
              or is the recipient doing extra work to use it?
            </li>
            <li>
              <strong>Memory authoring.</strong> Atomic decisions, inferences,
              and contradiction tracking. The check: can the agent cite a
              specific past decision by ID, or is it summarizing chat history?
            </li>
            <li>
              <strong>Orchestration.</strong> How multiple agents or sessions
              coordinate. Handoff format. Queue discipline. The check: when
              session A&apos;s work feeds session B, is the handoff a written
              artifact or a vague memory?
            </li>
            <li>
              <strong>Goal and methodology.</strong> Plan mode. Gap analysis.
              Socratic spec. Completion-condition discipline. The check: does
              the agent know what the session&apos;s completion condition is
              before any mutation starts?
            </li>
            <li>
              <strong>Retrieval contract.</strong> What gets pulled, when, how
              filtered. Token budget per turn. The check: does this project
              have a retrieval contract, or does the agent read whatever it
              can find?
            </li>
          </ol>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            How to score
          </h2>

          <p>For each layer, score one of three:</p>

          <ul className="space-y-2">
            <li>
              <strong>Present (2 points):</strong> the layer is in place,
              documented, and used in practice.
            </li>
            <li>
              <strong>Partial (1 point):</strong> the layer exists but is
              undocumented, inconsistent, or only used sometimes.
            </li>
            <li>
              <strong>Absent (0 points):</strong> the layer is missing or is
              only an idea.
            </li>
          </ul>

          <p>Total possible: 16 points.</p>

          <p>
            <strong>0 to 5</strong> &mdash; Starting. The stack is mostly
            informal. The next move is to write down the organizational frame
            and pick one task to formalize.
          </p>
          <p>
            <strong>6 to 10</strong> &mdash; Building. Pieces are in place but
            coverage is uneven. The next move is to identify the one weakest
            layer and bring it up to par before adding new capability.
          </p>
          <p>
            <strong>11 to 14</strong> &mdash; Compounding. The stack works.
            The next move is to refine the lowest-scoring layer and start
            orchestrating across projects.
          </p>
          <p>
            <strong>15 to 16</strong> &mdash; Mature. Rare. Usually means you
            are being generous in scoring or the stack is genuinely
            well-tuned. Stress-test by asking a peer to score it.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The honesty is the work
          </h2>

          <p>
            The two-point scale is deliberately coarse. A finer-grained
            scoring instrument is harder to use honestly. The whole instrument
            falls apart if you give yourself a 1.5 on memory authoring because
            you have an Obsidian vault. The question is not whether you have a
            vault. The question is whether the agent cites past decisions by
            ID. If the agent is summarizing chat history, that is Absent.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Where stacks actually fail
          </h2>

          <p>
            Run the diagnostic and you will see a pattern. Most operator
            stacks have respectable scores in layers 1 through 3. Capability
            tends to be fine. The collapse happens in layers 5 through 8.
            Memory authoring scores Absent. Retrieval contract scores Absent.
            Orchestration is informal. Goal-discipline is missing.
          </p>

          <p>
            This is not a tooling problem. Adding a sixth MCP does not fix it.
            The honest answer is usually to write down the retrieval contract
            before adding the next tool, then check whether the tool is still
            necessary once retrieval is sane.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The worked case
          </h2>

          <p>
            Same operator from the opening. Stack felt slow. Their plan:
            migrate orchestration from tool X to tool Y. Three months, $4,000.
          </p>

          <p>
            Diagnostic surfaced: Memory authoring scored Absent. Retrieval
            contract scored Absent. Orchestration scored Partial. The
            orchestration layer was not the bottleneck. The layers feeding it
            were.
          </p>

          <p>
            They wrote a retrieval contract for one project (the spec is about
            a page). They adopted an atomic-node memory format for new
            decisions going forward. They left orchestration alone.
          </p>

          <p>
            Three months later the stack feels faster because the actual
            bottleneck got fixed. The orchestration migration they were
            planning is now sitting in the parked-for-now folder where it
            belongs.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The 20-minute protocol
          </h2>

          <p>
            Block 20 minutes. For each of the 8 layers, write one paragraph (3
            to 5 sentences) describing the current state. Score Present,
            Partial, or Absent honestly. Identify the lowest-scoring layer.
            Identify the single move that would bring it up one level. Write
            that move as your next 30-day commitment.
          </p>

          <p>
            That is the diagnostic. It is not the same thing as the fix, but
            the diagnostic is what tells you which fix to spend the next month
            on.
          </p>

          <h2
            className="bv3-display mt-12 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            If the diagnostic landed
          </h2>

          <p>
            I packaged 19 more patterns like this one into Peer Operator&apos;s
            Stack v1. Atomic-node memory format, retrieval contract template,
            brand-voice linter, doctrine injection, find-skill router,
            engagement letter that caps liability at fees paid,
            Calendly-to-Stripe redirect that takes no-show rate from 40% to
            5%, plus 12 more. Working-builder voice. Each skill 300 to 1,000
            words. $149 once, lifetime access to v1 and any v1.x updates,
            14-day refund no questions asked.
          </p>

          <p>
            If the diagnostic showed you a weak layer, the Stack has at least
            one pattern that addresses it directly.
          </p>

          <p className="pt-6">
            <a
              href={STRIPE_PEER_OPERATOR_STACK_LINK}
              className="inline-block rounded px-6 py-3 text-base font-semibold"
              style={{
                background: "var(--bv3-wine)",
                color: "var(--bv3-ink-strong)",
              }}
            >
              Buy the Stack &mdash; $149 →
            </a>
            {" "}
            <a
              href={STACK_PAID_URL}
              className="ml-3 inline-block text-sm underline"
              style={{ color: "var(--bv3-cream)" }}
            >
              (or read the buyer walkthrough first)
            </a>
          </p>
        </div>

        <section
          className="mt-16 mb-8 border-t pt-8"
          style={{ borderColor: "var(--bv3-cream-dim, rgba(239, 237, 229, 0.25))" }}
        >
          <p
            className="bv3-mono text-sm"
            style={{ color: "var(--bv3-cream)" }}
          >
            Dailen Huntley · Founder, Black Sheep 247 LLC · Toledo, OH ·
            synapsedynamics.io
          </p>
        </section>
      </article>
    </main>
  );
}
