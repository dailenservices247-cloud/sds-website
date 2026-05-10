// app/(brand-v3)/v2-linear/page.tsx
// Variant 2 — Linear direction
//
// Typography-rigor minimal. Tight spacing, dense layouts, Inter-style geometric
// body (Geist), aggressive negative letter-spacing on display, semi-transparent
// borders for structure-without-noise, restrained motion (no scroll-orchestrated
// cinematic, no traveling Nox, no R3F canvas).
//
// Brand v3 palette is preserved (matte gray + petrol + gold) — Linear's
// indigo-violet is REPLACED with petrol-green as the brand v3 accent. The
// register is Linear's; the colors are SDS Brand v3.
//
// Differentiation from V1 Immersive Garden:
// - NO traveling Nox (static monogram top-right only)
// - NO R3F canvas
// - NO scroll-orchestrated cinematic motion
// - TIGHTER density (16–24px gaps, not 32–48px)
// - SHARPER typography (Geist 510-equivalent, -0.04em display tracking)
// - Multi-layered semi-transparent borders for structure
// - Status pills prominent
//
// PRD: AI Hub/PRDs/sds-brand-v3-rebuild-prd.md (V2 Linear direction row)
// Brand v3 tokens: lib/design/brand-v3-tokens.ts

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { Nox } from "@/components/brand-v3/Nox";
import { projectsByStatus } from "@/lib/content/portfolio";
import { services } from "@/lib/content/services";

// ---------------------------------------------------------------------------
// Reveal helpers — Linear's motion is restrained: tiny y-shift + opacity,
// 200ms ease-out, no stagger longer than 60ms.
// ---------------------------------------------------------------------------

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

// ---------------------------------------------------------------------------
// Section anchor — tight uppercase mono caption, no spine rule. Linear avoids
// big section dividers; structure comes from spacing + border subtlety.
// ---------------------------------------------------------------------------

function SectionAnchor({ index, label }: { index: string; label: string }) {
  return (
    <p
      className="bv3-mono mb-3"
      style={{ color: "var(--bv3-gold)", letterSpacing: "0.12em" }}
    >
      <span style={{ color: "var(--bv3-ink-dim)" }}>{index}</span>
      &nbsp;&nbsp;{label}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Status pill — Linear-prominent. Uppercase mono, semi-transparent ground.
// ---------------------------------------------------------------------------

function StatusPill({ status }: { status: string }) {
  const isLive = status === "LIVE";
  return (
    <span
      className="bv3-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5"
      style={{
        background: isLive ? "rgba(42, 96, 85, 0.18)" : "rgba(255, 255, 255, 0.04)",
        color: isLive ? "var(--bv3-spine-bright)" : "var(--bv3-ink-muted)",
        border: `1px solid ${isLive ? "rgba(42, 96, 85, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
        letterSpacing: "0.08em",
      }}
    >
      {isLive ? (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--bv3-spine-bright)" }}
        />
      ) : null}
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LinearVariantHome() {
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
          Top utility nav — Linear-style: tight, mono, monogram + identifier
          =================================================================== */}
      <header
        className="sticky top-0 z-30 backdrop-blur"
        style={{
          background: "rgba(58, 59, 61, 0.85)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
          <Link
            href="/v2-linear"
            className="flex items-center gap-3"
            aria-label="Synapse Dynamics"
          >
            <Nox
              variant="monogram"
              width={64}
              height={64}
              className="h-7 w-7 object-contain"
              alt="Synapse Dynamics monogram"
            />
            <span
              className="bv3-mono"
              style={{ color: "var(--bv3-cream)", letterSpacing: "0.06em" }}
            >
              SYNAPSE&nbsp;DYNAMICS
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="#portfolio"
              className="hidden text-sm font-medium md:inline-block"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Portfolio
            </Link>
            <Link
              href="#services"
              className="hidden text-sm font-medium md:inline-block"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Services
            </Link>
            <Link
              href="#foundation"
              className="hidden text-sm font-medium md:inline-block"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Foundation
            </Link>
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
              style={{
                background: "var(--bv3-gold)",
                color: "var(--bv3-shell)",
              }}
            >
              Start a project →
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 md:px-10">
        {/* =================================================================
            1. HERO — typography-first, no full-bleed cinematic.
            Compact display + mono caption + dual CTA + tight subhead.
            ================================================================= */}
        <section className="border-b py-24 md:py-36" style={{ borderColor: "rgba(255,255,255,0.06)" }} aria-label="Hero">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeIn}
              className="bv3-mono mb-6"
              style={{ color: "var(--bv3-gold)", letterSpacing: "0.12em" }}
            >
              <span style={{ color: "var(--bv3-ink-dim)" }}>v2 / linear</span>
              &nbsp;&nbsp;AN AI ARCHITECTURE STUDIO
            </motion.p>

            <motion.h1
              variants={fadeIn}
              className="text-balance"
              style={{
                fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                fontSize: "clamp(2.5rem, 6.5vw, 5rem)",
                fontWeight: 700,
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: "var(--bv3-cream)",
                maxWidth: "20ch",
              }}
            >
              Sites, apps, and the strategy underneath them.
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mt-6 text-pretty text-lg leading-relaxed"
              style={{ color: "var(--bv3-ink-muted)", maxWidth: "55ch" }}
            >
              Synapse Dynamics is a small studio for solo founders, multi-product
              builders, and operators-who-build. We think before we code.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all"
                style={{
                  background: "var(--bv3-gold)",
                  color: "var(--bv3-shell)",
                }}
              >
                Start a project
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  color: "var(--bv3-cream)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Explore the portfolio
              </Link>
              <span
                className="bv3-mono ml-2 hidden sm:inline-block"
                style={{ color: "var(--bv3-ink-dim)" }}
              >
                v.0 / 2026
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* =================================================================
            2. PORTFOLIO — dense 3-col grid, status pills prominent
            ================================================================= */}
        <section
          id="portfolio"
          className="border-b py-20 md:py-28"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          aria-label="Portfolio"
        >
          <SectionAnchor index="II." label="THE PORTFOLIO" />

          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2
              className="text-balance"
              style={{
                fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: "var(--bv3-cream)",
                maxWidth: "22ch",
              }}
            >
              Twelve products, one mesh.
            </h2>
            <Link
              href="/portfolio"
              className="bv3-mono text-sm"
              style={{ color: "var(--bv3-gold)", letterSpacing: "0.08em" }}
            >
              SEE ALL 12 →
            </Link>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-px md:grid-cols-2 lg:grid-cols-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {featured.map((p) => (
              <motion.div
                key={p.slug}
                variants={fadeIn}
                className="group relative overflow-hidden p-6 transition-colors"
                style={{ background: "var(--bv3-shell)" }}
              >
                <Link
                  href={`/portfolio/${p.slug}`}
                  className="absolute inset-0"
                  aria-label={`${p.name} — view details`}
                />
                <div className="mb-6 flex items-center justify-between gap-3">
                  <StatusPill status={p.status} />
                  <span
                    aria-hidden="true"
                    className="text-base transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--bv3-ink-dim)" }}
                  >
                    →
                  </span>
                </div>
                <h3
                  className="mb-2 text-xl font-semibold"
                  style={{ color: "var(--bv3-cream)", letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  {p.tagline}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* =================================================================
            3. FOUNDATION — secondary CTA, ghost outline, code-snippet vibe
            ================================================================= */}
        <section
          id="foundation"
          className="border-b py-20 md:py-28"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          aria-label="Foundation Subscription"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionAnchor index="III." label="THE FOUNDATION" />
              <h2
                className="mb-5 text-balance"
                style={{
                  fontFamily: "var(--font-bricolage), system-ui, sans-serif",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--bv3-cream)",
                  maxWidth: "22ch",
                }}
              >
                A standing seat at the architecture table.
              </h2>
              <p
                className="mb-8 max-w-prose text-base leading-relaxed"
                style={{ color: "var(--bv3-ink-muted)" }}
              >
                Monthly subscription. Direct access to the strategist, architect,
                and automator. Decisions get made; momentum stays. Three founding
                members receive retroactive non-equity NFTs on the NeoHood Genesis
                Block when it ships.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/foundation"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    color: "var(--bv3-cream)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Take a seat
                  <span aria-hidden="true">→</span>
                  <span
                    className="bv3-mono ml-2"
                    style={{ color: "var(--bv3-gold)" }}
                  >
                    $3,500/mo
                  </span>
                </Link>
                <span
                  className="bv3-mono"
                  style={{ color: "var(--bv3-ink-dim)" }}
                >
                  3 of 8 seats remaining · Cancel anytime
                </span>
              </div>
            </div>

            {/* Code-snippet panel — the loud Linear visual move */}
            <div
              className="rounded-xl p-6 lg:col-span-5"
              style={{
                background: "var(--bv3-shell-deep)",
                border: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
              }}
            >
              <p
                className="bv3-mono mb-4"
                style={{ color: "var(--bv3-spine-bright)" }}
              >
                $ foundation --status
              </p>
              <pre
                className="text-xs leading-relaxed"
                style={{ color: "var(--bv3-ink-muted)" }}
              >
                <code>{`{
  "tier":     "Embedded Strategist",
  "price":    "$3,500/mo",
  "cadence":  "weekly office hours",
  "seats":    { "filled": 5, "remaining": 3 },
  "cancel":   "anytime",
  "extras": [
    "non-equity NFTs",
    "retroactive Genesis allocation"
  ]
}`}</code>
              </pre>
              <p
                className="mt-4 text-xs italic"
                style={{ color: "var(--bv3-ink-dim)" }}
              >
                — practice notes
              </p>
            </div>
          </div>
        </section>

        {/* =================================================================
            4. SERVICES — 3-col compressed, mono tier prices
            ================================================================= */}
        <section
          id="services"
          className="border-b py-20 md:py-28"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          aria-label="Services"
        >
          <SectionAnchor index="IV." label="THREE WORKSTREAMS" />

          <h2
            className="mb-12 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--bv3-cream)",
              maxWidth: "22ch",
            }}
          >
            Architect. Automate. Strategize.
          </h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-px md:grid-cols-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {services.map((s, i) => {
              const tier = tierByService[s.slug];
              return (
                <motion.div
                  key={s.slug}
                  variants={fadeIn}
                  className="group relative p-8 transition-colors"
                  style={{ background: "var(--bv3-shell)" }}
                >
                  <Link
                    href={`/services/${s.slug}`}
                    className="absolute inset-0"
                    aria-label={`${s.name} — view tier details`}
                  />
                  <div className="mb-8 flex items-baseline justify-between gap-3">
                    <span
                      className="bv3-mono"
                      style={{ color: "var(--bv3-gold)" }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-base transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--bv3-ink-dim)" }}
                    >
                      →
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-2xl font-semibold"
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
                    className="flex items-baseline justify-between border-t pt-4"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span
                      className="bv3-mono"
                      style={{ color: "var(--bv3-ink-dim)" }}
                    >
                      {tier?.name.toUpperCase()}
                    </span>
                    <span
                      className="bv3-mono"
                      style={{ color: "var(--bv3-cream)" }}
                    >
                      {tier?.price}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* =================================================================
            5. NOW / NEXT / LATER — typography-driven roadmap
            ================================================================= */}
        <section
          className="border-b py-20 md:py-28"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
          aria-label="Roadmap"
        >
          <SectionAnchor index="V." label="NOW / NEXT / LATER" />

          <h2
            className="mb-12 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--bv3-cream)",
              maxWidth: "22ch",
            }}
          >
            What we&apos;re building. Out loud.
          </h2>

          <motion.dl
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="grid grid-cols-1 gap-px md:grid-cols-3"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {[
              {
                label: "Now",
                phase: "Phase I",
                body: "Phase 0 of Autonomous Web Agency. Brand v3 mascot lock. Otates close.",
              },
              {
                label: "Next",
                phase: "Phase II",
                body: "Foundation subscription public. AWA v2 toolchain validation. Scrlpets v2 brand.",
              },
              {
                label: "Later",
                phase: "Phase III",
                body: "Apotheosis v1.0 (pre-Aug 2026). NeoHood programmable digital jurisdiction. Sovereign Ledger.",
              },
            ].map((row) => (
              <motion.div
                key={row.label}
                variants={fadeIn}
                className="p-8"
                style={{ background: "var(--bv3-shell)" }}
              >
                <div className="mb-8 flex items-baseline justify-between">
                  <dt
                    className="bv3-mono"
                    style={{ color: "var(--bv3-gold)", letterSpacing: "0.12em" }}
                  >
                    {row.label.toUpperCase()}
                  </dt>
                  <span
                    className="bv3-mono"
                    style={{ color: "var(--bv3-ink-dim)" }}
                  >
                    {row.phase}
                  </span>
                </div>
                <dd
                  className="text-base leading-relaxed"
                  style={{ color: "var(--bv3-cream)" }}
                >
                  {row.body}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </section>

        {/* =================================================================
            6. CHANNELS — 2-col Linear-card pattern
            ================================================================= */}
        <section className="py-20 md:py-28" aria-label="Channels">
          <SectionAnchor index="VI." label="LATEST FROM THE CHANNELS" />

          <h2
            className="mb-12 text-balance"
            style={{
              fontFamily: "var(--font-bricolage), system-ui, sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--bv3-cream)",
              maxWidth: "22ch",
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
                meta: "LONG-FORM ESSAYS · WEEKLY CADENCE",
                copy: "Studio dispatches. Brand work, taste anchors, and the weeks where it all changes.",
                href: "/channels/allday",
              },
              {
                name: "Day One AI",
                meta: "FIELD NOTES · WHENEVER IT MATTERS",
                copy: "Builder logs. Tools shipped, agents wired, and what we'd skip next time.",
                href: "/channels/day-one",
              },
            ].map((c) => (
              <motion.div
                key={c.name}
                variants={fadeIn}
                className="group relative rounded-xl p-7 transition-colors"
                style={{
                  background: "var(--bv3-shell-deep)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <Link
                  href={c.href}
                  className="absolute inset-0 rounded-xl"
                  aria-label={`${c.name} — visit channel`}
                />
                <p
                  className="bv3-mono mb-3"
                  style={{ color: "var(--bv3-spine-bright)" }}
                >
                  {c.meta}
                </p>
                <h3
                  className="mb-3 text-2xl font-semibold"
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

        {/* =================================================================
            Footer mark — minimal Linear-style sign-off
            ================================================================= */}
        <footer
          className="border-t py-12"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Nox
                variant="monogram"
                width={40}
                height={40}
                className="h-5 w-5 object-contain"
                alt="Synapse Dynamics"
              />
              <span
                className="bv3-mono"
                style={{ color: "var(--bv3-ink-dim)" }}
              >
                SYNAPSE DYNAMICS · BRAND V3 / V2 LINEAR
              </span>
            </div>
            <span
              className="bv3-mono"
              style={{ color: "var(--bv3-ink-dim)" }}
            >
              MMXXVI
            </span>
          </div>
        </footer>
      </main>
      {/* Suppress unused reduce var warning if ever switched off */}
      {reduce ? null : null}
    </div>
  );
}
