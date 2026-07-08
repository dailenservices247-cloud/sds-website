// app/(brand-v3)/page.tsx — Synapse Dynamics homepage
//
// V3 Cursor brand register, locked 2026-05-20 as production variant per
// AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md
// (90-day commit, re-evaluate 2026-08-20).
//
// Developer-tool clean. Asymmetric command-palette layouts, line-numbered
// content blocks, terminal-prompt aesthetic, status-bar footer, kinetic-playful
// hover reveals. Brand v3 matte-gray ground preserved (does NOT adopt Cursor's
// warm cream — that violates brand v3 lock). Only Cursor's STRUCTURAL +
// INTERACTION patterns applied.
//
// Sibling preview routes (v1-garden / v2-linear / v3-cursor / preview) were
// removed from prod 2026-07-06 (coherence migration). Revival templates live
// in git history before commit "redesign/v3-coherence".
//
// Brand v3 tokens preserved. PRD: AI Hub/PRDs/sds-brand-v3-rebuild-prd.md

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { Nox } from "@/components/brand-v3/Nox";
import { projectsByStatus } from "@/lib/content/portfolio";
import { services } from "@/lib/content/services";
import { SKOOL_SYNAPSE_STUDIO } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Cursor's "timeline state colors" mapped to brand v3 palette
//   thinking → gold       (anti-pattern in cursor: peach;  brand v3: gold)
//   read     → spine      (cursor: soft blue;             brand v3: petrol)
//   grep     → spine-bright (cursor: sage green;          brand v3: petrol-bright)
//   edit     → wine       (cursor: lavender;              brand v3: wine)
//   delete   → wine       (rare)
// ---------------------------------------------------------------------------

const STATE_COLOR = {
  thinking: "var(--bv3-wine-text)",
  read: "var(--bv3-spine)",
  grep: "var(--bv3-spine-bright)",
  edit: "var(--bv3-wine-bright)",
};

// ---------------------------------------------------------------------------
// CommandLine — terminal prompt aesthetic. Used for section anchors.
//
//   $ cursor --portfolio
//   ↳ 12 products · 6 featured
// ---------------------------------------------------------------------------

function CommandLine({
  command,
  result,
}: {
  command: string;
  result?: string;
}) {
  return (
    <div className="bv3-mono mb-6">
      <div className="flex items-baseline gap-2">
        <span style={{ color: "var(--bv3-spine-bright)" }}>$</span>
        <span style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.06em" }}>
          {command}
        </span>
      </div>
      {result ? (
        <div
          className="ml-4 mt-1 flex items-baseline gap-2"
          style={{ color: "var(--bv3-ink-muted)" }}
        >
          <span style={{ color: "var(--bv3-ink-dim)" }}>↳</span>
          <span>{result}</span>
        </div>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// LineNumberItem — dev-tool line-numbered list pattern
// ---------------------------------------------------------------------------

function LineNumberItem({
  index,
  state,
  label,
  body,
}: {
  index: number;
  state: keyof typeof STATE_COLOR;
  label: string;
  body: string;
}) {
  return (
    <li
      className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-3 transition-colors"
      style={{ borderTop: "1px solid var(--bv3-border-subtle)" }}
    >
      <span
        className="bv3-mono text-right"
        style={{ color: "var(--bv3-ink-dim)" }}
      >
        {String(index).padStart(2, "0")}
      </span>
      <div>
        <div className="flex items-center gap-2">
          <span
            className="bv3-mono"
            style={{ color: STATE_COLOR[state], letterSpacing: "0.08em" }}
          >
            [{state.toUpperCase()}]
          </span>
          <h3
            className="font-semibold"
            style={{
              color: "var(--bv3-cream)",
              fontSize: "1.125rem",
              letterSpacing: "-0.01em",
            }}
          >
            {label}
          </h3>
        </div>
        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--bv3-ink-muted)" }}
        >
          {body}
        </p>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// KbdHint — keyboard shortcut hint, dev-tool signature
// ---------------------------------------------------------------------------

function KbdHint({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((k, i) => (
        <kbd
          key={`${k}-${i}`}
          className="bv3-mono rounded px-1.5 py-0.5 text-[0.65rem]"
          style={{
            background: "var(--bv3-shell-deep)",
            color: "var(--bv3-cream)",
            border: "1px solid var(--bv3-border-subtle)",
            letterSpacing: "0.04em",
          }}
        >
          {k}
        </kbd>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const fadeIn = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function CursorVariantHome() {
  const reduce = useReducedMotion();

  const featured = useMemo(
    () =>
      [...projectsByStatus("LIVE"), ...projectsByStatus("PRE-LAUNCH")].slice(0, 6),
    [],
  );

  const tierByService = useMemo(() => {
    const map: Record<string, { name: string; price: string }> = {};
    for (const s of services) {
      const tier = s.engagementModels[0];
      map[s.slug] = { name: tier.name, price: tier.price };
    }
    return map;
  }, []);

  return (
    <div className="relative">
      {/* ===================================================================
          File-tree sidebar nav — dev-tool signature.
          Sticky-left on desktop, top bar on mobile.
          =================================================================== */}
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{
          background: "rgba(58, 59, 61, 0.85)",
          borderBottom: "1px solid var(--bv3-border-subtle)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <Nox
              variant="monogram"
              width={48}
              height={48}
              className="h-6 w-6 object-contain"
              alt="Synapse Dynamics monogram"
            />
            <span
              className="bv3-mono"
              style={{ color: "var(--bv3-cream)", letterSpacing: "0.06em" }}
            >
              ~/synapse-dynamics
            </span>
            <span
              className="bv3-mono hidden sm:inline-block"
              style={{ color: "var(--bv3-ink-dim)" }}
            >
              · main · /
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={SKOOL_SYNAPSE_STUDIO}
              target="_blank"
              rel="noopener noreferrer"
              className="bv3-mono hidden items-center text-sm transition-colors hover:opacity-80 sm:inline-flex"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Community
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all"
              style={{
                background: "var(--bv3-spine)",
                color: "var(--bv3-on-spine)",
              }}
            >
              Start a project
              <span aria-hidden="true">→</span>
              <KbdHint keys={["⌘", "K"]} />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-20">
        {/* =================================================================
            1. HERO — asymmetric command-palette feel.
            Big display + inline working-Nox + terminal prompt on right
            ================================================================= */}
        <section className="grid grid-cols-1 gap-12 pb-20 lg:grid-cols-12 lg:gap-8" aria-label="Hero">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7"
          >
            <motion.div variants={fadeIn}>
              <CommandLine
                command="cursor --about"
                result="An AI architecture studio for Peer Operators"
              />
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="mt-2 text-balance"
              style={{
                fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                letterSpacing: "-0.035em",
                color: "var(--bv3-cream)",
                maxWidth: "20ch",
              }}
            >
              Think before you{" "}
              <span style={{ color: "var(--bv3-wine-text)" }}>code</span>.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 text-pretty text-lg leading-relaxed"
              style={{ color: "var(--bv3-ink-muted)", maxWidth: "55ch" }}
            >
              Synapse Dynamics is a small studio building sites, apps, and
              automations for solo founders, multi-product builders, and
              operators-who-build. We ship deliberate. We document publicly.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all"
                style={{
                  background: "var(--bv3-spine)",
                  color: "var(--bv3-on-spine)",
                }}
              >
                Start a project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all"
                style={{
                  background: "transparent",
                  color: "var(--bv3-cream)",
                  border: "1px solid var(--bv3-border-strong)",
                }}
              >
                Explore the portfolio
                <KbdHint keys={["P"]} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right column — inline working-Nox + terminal status block */}
          <motion.aside
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5"
          >
            <div
              className="rounded-lg border p-4"
              style={{
                background: "var(--bv3-shell-deep)",
                borderColor: "var(--bv3-border-subtle)",
              }}
            >
              {/* Terminal title bar */}
              <div
                className="mb-3 flex items-center justify-between border-b pb-3"
                style={{ borderColor: "var(--bv3-border-subtle)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--bv3-wine)" }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--bv3-wine)" }}
                  />
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: "var(--bv3-spine-bright)" }}
                  />
                </div>
                <span
                  className="bv3-mono"
                  style={{ color: "var(--bv3-ink-dim)" }}
                >
                  lux.studio.live
                </span>
              </div>

              {/* Lux live feed — cosmos-dig loop (Kling 3.0, locked mascot).
                  Poster = working pose so first paint is instant; video streams in.
                  prefers-reduced-motion users keep the still via the media query
                  in globals.css (.bv3-hero-video). */}
              <div
                className="relative mb-3 overflow-hidden rounded-md"
                style={{ background: "var(--bv3-shell-deep)" }}
              >
                <video
                  className="bv3-hero-video block h-auto w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/brand-v3/nox-pose-WORKING-LOCKED.png"
                  aria-label="Lux — Synapse Dynamics mascot, moving through a cosmos scene"
                >
                  <source src="/brand-v3/lux-cosmos-dig.mp4" type="video/mp4" />
                </video>
                {/* Reduced-motion fallback still */}
                <Nox
                  variant="working"
                  width={1264}
                  height={848}
                  className="bv3-hero-video-still block h-auto w-full object-contain"
                  alt="Lux — working pose"
                />
              </div>

              {/* Status lines */}
              <div className="space-y-1">
                <div className="flex items-baseline justify-between bv3-mono text-xs">
                  <span style={{ color: STATE_COLOR.thinking }}>[THINKING]</span>
                  <span style={{ color: "var(--bv3-ink-muted)" }}>
                    architecture decisions
                  </span>
                </div>
                <div className="flex items-baseline justify-between bv3-mono text-xs">
                  <span style={{ color: STATE_COLOR.read }}>[READ]</span>
                  <span style={{ color: "var(--bv3-ink-muted)" }}>
                    PRODUCT.md · DESIGN.md
                  </span>
                </div>
                <div className="flex items-baseline justify-between bv3-mono text-xs">
                  <span style={{ color: STATE_COLOR.edit }}>[EDIT]</span>
                  <span style={{ color: "var(--bv3-ink-muted)" }}>
                    app/(brand-v3)
                  </span>
                </div>
              </div>
            </div>
          </motion.aside>
        </section>

        {/* =================================================================
            2. PORTFOLIO — line-numbered list pattern (file-tree style)
            ================================================================= */}
        <section
          id="portfolio"
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Portfolio"
        >
          <CommandLine
            command="ls portfolio/"
            result={`${featured.length} entries shown · 12 total`}
          />

          <h2
            className="mb-10 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
            }}
          >
            Twelve products. One mesh.
          </h2>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="border-b"
            style={{ borderColor: "var(--bv3-border-subtle)" }}
          >
            {featured.map((p, i) => {
              const stateMap: Record<string, keyof typeof STATE_COLOR> = {
                LIVE: "grep",
                "PRE-LAUNCH": "thinking",
                CONCEPT: "edit",
              };
              const state = stateMap[p.status] ?? "read";
              return (
                <motion.div key={p.slug} variants={fadeIn} className="contents">
                  <LineNumberItem
                    index={i + 1}
                    state={state}
                    label={p.name}
                    body={p.tagline}
                  />
                </motion.div>
              );
            })}
          </motion.ol>

          <Link
            href="/portfolio"
            className="bv3-mono mt-6 inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.08em" }}
          >
            SEE ALL 12 → <KbdHint keys={["⌘", "P"]} />
          </Link>
        </section>

        {/* =================================================================
            2b. RECEIPTS — honest proof strip (2026-07-06, war-game R4:
            proof by demonstration, not borrowed testimonials)
            ================================================================= */}
        <section
          id="receipts"
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Proof"
        >
          <CommandLine
            command="cat receipts.txt"
            result="proof you can click, not claims"
          />

          <h2
            className="mb-10 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
            }}
          >
            Receipts, not promises.
          </h2>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="border-b"
            style={{ borderColor: "var(--bv3-border-subtle)" }}
          >
            <motion.div variants={fadeIn} className="contents">
              <LineNumberItem
                index={1}
                state="grep"
                label="Scrlpets is live"
                body="A full-stack social marketplace for animal breeders, built end-to-end in-house and running in pre-beta right now. Click around — it's real."
              />
            </motion.div>
            <motion.div variants={fadeIn} className="contents">
              <LineNumberItem
                index={2}
                state="read"
                label="This site is the demo"
                body="Same stack, same process we install for clients. The pitch and the product are the same artifact."
              />
            </motion.div>
            <motion.div variants={fadeIn} className="contents">
              <LineNumberItem
                index={3}
                state="thinking"
                label="No logo wall"
                body="Zero borrowed testimonials. Until the first case studies land, the proof is shipped product — not quotes we wrote ourselves."
              />
            </motion.div>
          </motion.ol>

          <Link
            href="/lab/scrlpets"
            className="bv3-mono mt-6 inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.08em" }}
          >
            READ THE SCRLPETS BUILD →
          </Link>
        </section>

        {/* =================================================================
            3. FOUNDATION — diff-style call-to-action panel
            ================================================================= */}
        <section
          id="foundation"
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Foundation"
        >
          <CommandLine
            command="git log foundation"
            result="3 of 8 seats remaining"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2
                className="mb-5 text-balance"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  color: "var(--bv3-cream)",
                  maxWidth: "20ch",
                }}
              >
                A standing seat at the architecture table.
              </h2>
              <p
                className="mb-8 max-w-prose text-base leading-relaxed"
                style={{ color: "var(--bv3-ink-muted)" }}
              >
                Monthly subscription. Direct access to the strategist, architect,
                and automator. Decisions get made; momentum stays.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/foundation"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all"
                  style={{
                    background: "transparent",
                    color: "var(--bv3-cream)",
                    border: "1px solid var(--bv3-border-strong)",
                  }}
                >
                  Take a seat
                  <span aria-hidden="true">→</span>
                  <span
                    className="bv3-mono ml-2"
                    style={{ color: "var(--bv3-wine-text)" }}
                  >
                    $3,500/mo
                  </span>
                </Link>
                <span
                  className="bv3-mono"
                  style={{ color: "var(--bv3-ink-dim)" }}
                >
                  Cancel anytime
                </span>
              </div>
            </div>

            {/* Diff-style panel — git diff aesthetic */}
            <div className="lg:col-span-5">
              <div
                className="overflow-hidden rounded-lg border"
                style={{
                  background: "var(--bv3-shell-deep)",
                  borderColor: "var(--bv3-border-subtle)",
                }}
              >
                <div
                  className="bv3-mono border-b px-4 py-2 text-xs"
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    borderColor: "var(--bv3-border-subtle)",
                    color: "var(--bv3-ink-muted)",
                  }}
                >
                  diff: foundation/membership
                </div>
                <pre
                  className="p-4 text-xs leading-relaxed"
                  style={{
                    fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
                  }}
                >
                  <code>
                    <span style={{ color: "var(--bv3-spine-bright)" }}>
                      {"+ direct access to strategist + architect + automator"}
                    </span>
                    {"\n"}
                    <span style={{ color: "var(--bv3-spine-bright)" }}>
                      {"+ weekly office hours"}
                    </span>
                    {"\n"}
                    <span style={{ color: "var(--bv3-spine-bright)" }}>
                      {"+ retroactive Genesis allocation"}
                    </span>
                    {"\n"}
                    <span style={{ color: "var(--bv3-wine)" }}>
                      {"- decision-fatigue from going alone"}
                    </span>
                    {"\n"}
                    <span style={{ color: "var(--bv3-wine)" }}>
                      {"- waiting for the next discovery call"}
                    </span>
                    {"\n\n"}
                    <span style={{ color: "var(--bv3-ink-muted)" }}>
                      {"// 3 of 8 seats remain. cancel anytime."}
                    </span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. SERVICES — 3 panels, asymmetric, with state badges
            ================================================================= */}
        <section
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Services"
        >
          <CommandLine
            command="services --list"
            result="3 workstreams · 9 engagement tiers"
          />

          <h2
            className="mb-10 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
            }}
          >
            Architect.{" "}
            <span style={{ color: "var(--bv3-wine-text)" }}>Automate.</span>{" "}
            <span style={{ color: "var(--bv3-spine-bright)" }}>Strategize.</span>
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {services.map((s, i) => {
              const tier = tierByService[s.slug];
              const stateColors = [
                STATE_COLOR.thinking,
                STATE_COLOR.grep,
                STATE_COLOR.read,
              ];
              return (
                <motion.div
                  key={s.slug}
                  variants={fadeIn}
                  className="group relative overflow-hidden rounded-lg border p-6 transition-colors"
                  style={{
                    background: "var(--bv3-shell-deep)",
                    borderColor: "var(--bv3-border-subtle)",
                  }}
                >
                  <Link
                    href={`/services/${s.slug}`}
                    className="absolute inset-0"
                    aria-label={`${s.name} — view tier details`}
                  />
                  <div className="mb-6 flex items-center justify-between">
                    <span
                      className="bv3-mono"
                      style={{ color: stateColors[i], letterSpacing: "0.08em" }}
                    >
                      [0{i + 1}]
                    </span>
                    <KbdHint keys={[String(i + 1)]} />
                  </div>
                  <h3
                    className="mb-3 text-xl font-semibold"
                    style={{ color: "var(--bv3-cream)", letterSpacing: "-0.015em" }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="mb-6 text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink-muted)" }}
                  >
                    {s.tagline}
                  </p>
                  <div
                    className="border-t pt-3 bv3-mono text-xs"
                    style={{ borderColor: "var(--bv3-border-subtle)" }}
                  >
                    <div className="flex items-baseline justify-between">
                      <span style={{ color: "var(--bv3-ink-dim)" }}>tier</span>
                      <span style={{ color: "var(--bv3-cream)" }}>
                        {tier?.name}
                      </span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span style={{ color: "var(--bv3-ink-dim)" }}>price</span>
                      <span style={{ color: "var(--bv3-wine-text)" }}>
                        {tier?.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* =================================================================
            5. NOW / NEXT / LATER — line-numbered todo list
            ================================================================= */}
        <section
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Roadmap"
        >
          <CommandLine
            command="todo --view all"
            result="3 in flight · 8 backlog"
          />

          <h2
            className="mb-10 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
              maxWidth: "20ch",
            }}
          >
            What we&apos;re building. Out loud.
          </h2>

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="border-b"
            style={{ borderColor: "var(--bv3-border-subtle)" }}
          >
            {[
              {
                state: "grep" as const,
                label: "Now",
                body: "Phase 0 of Autonomous Web Agency. Brand v3 mascot lock. Otates close.",
              },
              {
                state: "thinking" as const,
                label: "Next",
                body: "Foundation subscription public. AWA v2 toolchain validation. Scrlpets v2 brand.",
              },
              {
                state: "edit" as const,
                label: "Later",
                body: "Apotheosis v1.0. NeoHood programmable digital jurisdiction. Sovereign Ledger.",
              },
            ].map((row, i) => (
              <motion.div key={row.label} variants={fadeIn} className="contents">
                <LineNumberItem
                  index={i + 1}
                  state={row.state}
                  label={row.label}
                  body={row.body}
                />
              </motion.div>
            ))}
          </motion.ol>
        </section>

        {/* =================================================================
            6. CHANNELS — 2-col with command-prompt accents
            ================================================================= */}
        <section
          className="border-t py-16"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
          aria-label="Channels"
        >
          <CommandLine
            command="channels --tail"
            result="2 active feeds"
          />

          <h2
            className="mb-10 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
            }}
          >
            Building in public.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {[
              {
                name: "Allday 24seven",
                meta: "long-form essays · weekly cadence",
                copy: "Studio dispatches. Brand work, taste anchors, and the weeks where it all changes.",
                href: "/channels/allday",
                state: "thinking" as const,
              },
              {
                name: "Day One AI",
                meta: "field notes · whenever it matters",
                copy: "Builder logs. Tools shipped, agents wired, and what we'd skip next time.",
                href: "/channels/day-one",
                state: "grep" as const,
              },
            ].map((c) => (
              <motion.div
                key={c.name}
                variants={fadeIn}
                className="group relative rounded-lg border p-6 transition-colors"
                style={{
                  background: "var(--bv3-shell-deep)",
                  borderColor: "var(--bv3-border-subtle)",
                }}
              >
                <Link
                  href={c.href}
                  className="absolute inset-0 rounded-lg"
                  aria-label={`${c.name} — visit channel`}
                />
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="bv3-mono"
                    style={{ color: STATE_COLOR[c.state], letterSpacing: "0.08em" }}
                  >
                    [FEED]
                  </span>
                  <span
                    className="bv3-mono"
                    style={{ color: "var(--bv3-ink-dim)" }}
                  >
                    {c.meta}
                  </span>
                </div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--bv3-cream)", letterSpacing: "-0.015em" }}
                >
                  {c.name}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  {c.copy}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ===================================================================
            Productized packs — flat list, low-noise
            =================================================================== */}
        <section
          className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20"
          style={{ borderTop: "1px solid var(--bv3-border-subtle)" }}
        >
          <CommandLine
            command="packs --list"
            result="4 productized digital packs · ship-ready"
          />
          <h2
            className="mb-8 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bv3-cream)",
            }}
          >
            One-time packs. Lifetime v1.x updates.
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Link
              href="/voice-network"
              className="group rounded-lg border p-5 transition-colors"
              style={{
                background: "var(--bv3-shell-deep)",
                borderColor: "var(--bv3-border-subtle)",
              }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="bv3-mono text-xs" style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.14em" }}>
                  [NEW] CLAUDE VOICE NETWORK PACK
                </span>
                <span className="bv3-mono text-sm" style={{ color: "var(--bv3-cream)" }}>$79</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv3-ink-muted)" }}>
                Persistent AI specialists that travel with you. Bridge installer + Playbook + vault template + 5 starter Projects.
              </p>
            </Link>
            <Link
              href="/stack"
              className="group rounded-lg border p-5 transition-colors"
              style={{
                background: "var(--bv3-shell-deep)",
                borderColor: "var(--bv3-border-subtle)",
              }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="bv3-mono text-xs" style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.14em" }}>
                  PEER OPERATOR&apos;S STACK V1
                </span>
                <span className="bv3-mono text-sm" style={{ color: "var(--bv3-cream)" }}>$149</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv3-ink-muted)" }}>
                20 patterns for solo AI builders. Anti-context-drift, anti-hallucination, anti-memory-loss working library.
              </p>
            </Link>
            <Link
              href="/anti-slop"
              className="group rounded-lg border p-5 transition-colors"
              style={{
                background: "var(--bv3-shell-deep)",
                borderColor: "var(--bv3-border-subtle)",
              }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="bv3-mono text-xs" style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.14em" }}>
                  ANTI-SLOP SKILL PACK V1
                </span>
                <span className="bv3-mono text-sm" style={{ color: "var(--bv3-cream)" }}>$49</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv3-ink-muted)" }}>
                Strip banned phrases, hype-tone, AI-influencer vocabulary, filler before publish. Six-category blocklist + voice scan.
              </p>
            </Link>
            <Link
              href="/atomic-note-pack"
              className="group rounded-lg border p-5 transition-colors"
              style={{
                background: "var(--bv3-shell-deep)",
                borderColor: "var(--bv3-border-subtle)",
              }}
            >
              <div className="mb-2 flex items-baseline justify-between">
                <span className="bv3-mono text-xs" style={{ color: "var(--bv3-wine-text)", letterSpacing: "0.14em" }}>
                  ATOMIC NOTE TEMPLATE PACK
                </span>
                <span className="bv3-mono text-sm" style={{ color: "var(--bv3-cream)" }}>$19 tip</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--bv3-ink-muted)" }}>
                Decision / inference / context / test atomic node format. MIT on GitHub, honor-system tip on Stripe.
              </p>
            </Link>
          </div>
        </section>
      </main>

      {/* ===================================================================
          Status bar footer — dev-tool signature
          =================================================================== */}
      <footer
        className="sticky bottom-0 z-20"
        style={{
          background: "rgba(42, 42, 45, 0.92)",
          borderTop: "1px solid var(--bv3-border-subtle)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 md:px-10">
          <div className="bv3-mono flex items-center gap-4 text-xs">
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--bv3-spine-bright)" }}
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--bv3-spine-bright)" }}
              />
              live
            </span>
            <span style={{ color: "var(--bv3-ink-dim)" }}>·</span>
            <span style={{ color: "var(--bv3-ink-muted)" }}>
              brand-v3 / homepage
            </span>
            <span style={{ color: "var(--bv3-ink-dim)" }}>·</span>
            <span style={{ color: "var(--bv3-ink-muted)" }}>
              MMXXVI
            </span>
          </div>
          <div className="bv3-mono hidden items-center gap-3 text-xs sm:flex">
            <span style={{ color: "var(--bv3-ink-muted)" }}>
              press <KbdHint keys={["⌘", "K"]} /> to start
            </span>
          </div>
        </div>
      </footer>
      {/* Suppress unused reduce var warning */}
      {reduce ? null : null}
    </div>
  );
}
