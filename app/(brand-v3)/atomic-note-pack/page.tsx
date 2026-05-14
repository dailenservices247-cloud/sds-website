// app/(brand-v3)/atomic-note-pack/page.tsx
//
// Buy page for the M1 Atomic Note Template Pack.
// Free on GitHub under MIT; $19 Stripe Payment Link as honor-system tip.
// Lives under the brand-v3 route group so it inherits the matte-gray shell.

import type { Metadata } from "next";

// REPLACE BEFORE LIVE: paste the Stripe Payment Link URL here once created
// in the Stripe dashboard. Until then the button degrades to a mailto.
const STRIPE_PAYMENT_LINK =
  "https://buy.stripe.com/REPLACE_WITH_LIVE_PAYMENT_LINK";
const GITHUB_ZIP =
  "https://github.com/dailenservices247-cloud/atomic-note-pack/archive/refs/heads/main.zip";
const GITHUB_REPO =
  "https://github.com/dailenservices247-cloud/atomic-note-pack";

export const metadata: Metadata = {
  title: "Atomic Note Template Pack — Synapse Dynamics Segmented",
  description:
    "Five Obsidian-ready markdown templates for graph-native vault memory. Four atom types plus a retrieval contract. Free on GitHub or pay $19 to support the work.",
};

export default function AtomicNotePackPage() {
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
          MICRO PRODUCT / M1
        </p>

        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          Atomic Note Template Pack
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          Five Obsidian-ready markdown templates that turn a sprawling vault
          into graph-native memory your AI can scan, follow, and act on. Four
          atom types plus a retrieval contract.
        </p>

        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>FREE ON GITHUB</li>
          <li>$19 TO SUPPORT</li>
          <li>MIT LICENSED</li>
          <li>SAME CONTENT EITHER PATH</li>
        </ul>

        <section
          className="mt-12 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <h2
            className="bv3-display text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What you get
          </h2>

          <ul className="mt-6 flex flex-col gap-3">
            {PACK_CONTENTS.map((item) => (
              <li key={item.file} className="flex items-start gap-4">
                <span
                  className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                  style={{
                    color: "var(--bv3-gold-bright)",
                    border: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  {item.type}
                </span>
                <span className="flex-1">
                  <code
                    className="bv3-mono text-sm"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {item.file}
                  </code>
                  <span
                    className="ml-3 text-sm"
                    style={{ color: "var(--bv3-ink-muted)" }}
                  >
                    {item.purpose}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2
            className="bv3-display text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Why atomic, why typed
          </h2>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            The default vault structure (one rolling decisions log, one
            lessons-learned file, one meeting-notes dump) forces your AI agent
            to read entire files every time it needs context. At scale that
            wastes a documented 85% of agent compute on rediscovering things
            your system already wrote down.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            The atomic-node format inverts this. Each decision, each inference,
            each context snapshot, each test result lives in its own short
            markdown file with a one-sentence summary at the top. Agents scan
            the summaries cheaply, follow typed edges only when they need
            detail.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Four atom types is the minimum that maps onto how knowledge actually
            accumulates in a working business. Four edge types is the minimum
            that lets the graph compound. The pack ships the format, the
            templates, and five filled-in examples drawn from production work.
          </p>
        </section>

        <section className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={STRIPE_PAYMENT_LINK}
            className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--bv3-gold)",
              color: "var(--bv3-shell)",
            }}
          >
            Pay $19, support the work
          </a>
          <a
            href={GITHUB_ZIP}
            className="rounded-md px-6 py-4 text-base"
            style={{
              border: "1px solid var(--bv3-border-strong)",
              color: "var(--bv3-ink)",
            }}
          >
            Or grab it free (ZIP)
          </a>
          <a
            href={GITHUB_REPO}
            className="text-sm underline"
            style={{ color: "var(--bv3-ink-muted)" }}
          >
            View on GitHub
          </a>
        </section>

        <footer
          className="mt-24 text-xs"
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
            . MIT licensed. Use the templates anywhere. Attribution appreciated,
            not required.
          </p>
        </footer>
      </div>
    </main>
  );
}

const PACK_CONTENTS = [
  {
    type: "TEMPLATE",
    file: "decision-node.md",
    purpose: "A locked choice plus alternatives considered",
  },
  {
    type: "TEMPLATE",
    file: "inference-node.md",
    purpose: "A claim or pattern derived from sources",
  },
  {
    type: "TEMPLATE",
    file: "context-node.md",
    purpose: "A snapshot of state at a moment in time",
  },
  {
    type: "TEMPLATE",
    file: "test-node.md",
    purpose: "A validation, eval, or experiment with results",
  },
  {
    type: "TEMPLATE",
    file: "retrieval-contract.md",
    purpose: "What an agent needs to know, before any infrastructure pick",
  },
  {
    type: "EXAMPLES",
    file: "examples/",
    purpose: "Five filled-in examples drawn from production work",
  },
  {
    type: "README",
    file: "README.md",
    purpose: "Methodology, Obsidian + Notion + Cursor setup, anti-patterns",
  },
];
