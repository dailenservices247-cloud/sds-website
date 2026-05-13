// app/(brand-v3)/v1-garden/page.tsx
// Variant 1 — Immersive Garden direction.
// Matte-gray monolith ground throughout. Scroll-orchestrated cinematic motion.
// ONE traveling Nox at fixed position, driven by document scrollYProgress —
// translates x/y/scale and crossfades poses across section thresholds.
//
// Brand v3 tokens: lib/design/brand-v3-tokens.ts
// CSS scope: [data-theme="brand-v3"] in app/globals.css

"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { Nox } from "@/components/brand-v3/Nox";
import { projectsByStatus } from "@/lib/content/portfolio";
import { services } from "@/lib/content/services";
import { RevealGroup, RevealItem } from "@/components/v3/RevealOnScroll";
import { BackstageLayer } from "@/components/brand-v3/BackstageLayer";
import { Stage as NoxStage } from "@/components/brand-v3/nox/Stage";
import {
  ScrubReveal,
  ScrubWords,
  ParallaxLayer,
} from "@/components/brand-v3/ScrollMotion";

// ---------------------------------------------------------------------------
// Motion primitives
// ---------------------------------------------------------------------------

const sectionEnter = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// (TravelingNox removed — replaced by CosmosVideo per shape brief Q3 path C.
//  See git history for the previous static-pose crossfade implementation.)

// ---------------------------------------------------------------------------
// Hairline section rule — petrol-green SVG path that draws in on view
// ---------------------------------------------------------------------------

function SpineRule({ label }: { label?: string }) {
  // The label sits centered ON the petrol hairline. Give it generous
  // horizontal padding + vertical breathing room so the type isn't visually
  // bisected by the rule, and use a flex row layout so the line is split
  // around the label rather than running through it.
  return (
    <div className="relative flex items-center justify-center py-6">
      {/* Left half of rule */}
      <motion.svg
        viewBox="0 0 600 2"
        preserveAspectRatio="none"
        className="block h-px flex-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="600"
          y2="1"
          stroke="var(--bv3-spine)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>

      {label ? (
        <span
          className="bv3-mono px-6"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.1em" }}
        >
          {label}
        </span>
      ) : (
        <span className="px-3" />
      )}

      {/* Right half of rule */}
      <motion.svg
        viewBox="0 0 600 2"
        preserveAspectRatio="none"
        className="block h-px flex-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
      >
        <motion.line
          x1="0"
          y1="1"
          x2="600"
          y2="1"
          stroke="var(--bv3-spine)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        />
      </motion.svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GardenVariantHome() {
  const reduce = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(heroProgress, [0, 1], ["0px", "-80px"]);
  const copyOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const goldGlow = useTransform(heroProgress, [0, 1], [0.45, 0.08]);
  // Scroll indicator fades out fast once user starts scrolling.
  const scrollIndicatorOpacity = useTransform(heroProgress, [0, 0.05, 0.12], [1, 1, 0]);

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
    <div ref={pageRef} className="relative md:pr-[50vw]">
      {/* Fixed right-half stage: brand-tinted cosmos shader + placeholder
          8-capsule worm. Phase 1 motion architecture proven before real
          art lands. Content lives in the unpadded left half; the worm
          dig-descends as the user scrolls thanks to scrollProgress wired
          into both the cosmos uniform and the worm's Y bias. */}
      <NoxStage />

      {/* Backstage transparency layer — toggle bottom-right */}
      <BackstageLayer />

      {/* =====================================================================
          1. HERO — fullscreen monolith, copy left, traveling Nox right
          ===================================================================== */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden"
        style={{ minHeight: "100vh" }}
        aria-label="Hero"
      >
        {/* Drifting gold radial — ambient warmth */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            opacity: goldGlow,
            y: heroBgY,
            background:
              "radial-gradient(55% 45% at 70% 50%, rgba(200,162,62,0.22) 0%, rgba(200,162,62,0) 70%)",
          }}
        />
        {/* Petrol gradient floor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-[40vh]"
          style={{
            background:
              "linear-gradient(180deg, rgba(42,96,85,0) 0%, rgba(42,96,85,0.18) 100%)",
          }}
        />

        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px -z-10"
          style={{ background: "var(--bv3-spine)" }}
        />

        <div className="relative grid h-full min-h-[100vh] grid-cols-12 gap-6 px-6 pt-32 pb-20 md:px-12">
          {/* Mark / monogram top-left, mono identifier */}
          <motion.div
            className="col-span-12 flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: "-3rem" }}
          >
            <Nox
              variant="monogram"
              width={120}
              height={120}
              className="h-9 w-9 object-contain"
              alt="Synapse Dynamics monogram"
            />
            <span className="bv3-mono">Synapse Dynamics — Brand v3 / V1 Immersive Garden</span>
          </motion.div>

          {/* Copy column */}
          <motion.div
            className="col-span-12 flex flex-col justify-center md:col-span-7 lg:col-span-7"
            style={reduce ? undefined : { y: copyY, opacity: copyOpacity }}
          >
            <p className="bv3-mono mb-8">
              <span style={{ color: "var(--bv3-gold)" }}>Vol. 03 / Issue Nº 01</span>
              <span className="mx-3" style={{ color: "var(--bv3-ink-dim)" }}>·</span>
              <span>An AI architecture studio</span>
            </p>

            <h1
              className="bv3-display text-balance"
              style={{
                // Tightened for two-column layout — content lives in left
                // 50vw, so hero scales off the column width (4vw of full
                // viewport ≈ 8vw of column), capped at 5rem so it never
                // overruns the narrower gutter.
                fontSize: "clamp(2.5rem, 4.4vw, 5rem)",
                color: "var(--bv3-cream)",
                maxWidth: "12ch",
                lineHeight: 0.96,
              }}
            >
              {["Build the", null, "thinking", null, "into the", null, "thing."].map((word, i) => {
                if (word === null) return <br key={`br-${i}`} />;
                const isAccent = word === "thinking";
                const isSpine = word === "thing.";
                return (
                  <span
                    key={`w-${i}`}
                    className="inline-block"
                    style={{
                      color: isAccent
                        ? "var(--bv3-gold)"
                        : isSpine
                        ? "var(--bv3-spine-bright)"
                        : "var(--bv3-cream)",
                      marginRight: "0.18em",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </h1>

            <p
              className="mt-10 text-lg leading-relaxed text-pretty md:text-xl"
              style={{ color: "var(--bv3-ink-muted)", maxWidth: "44rem" }}
            >
              For solo founders, multi-product builders, and operators-who-build.
              Sites, apps, automations, and the strategy underneath them — shipped
              by a small studio that thinks before it codes.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-7 py-4 font-medium transition-all"
                style={{
                  background: "var(--bv3-gold)",
                  color: "var(--bv3-shell)",
                  borderRadius: "9999px",
                }}
              >
                Start a project
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="#portfolio"
                className="inline-flex items-center gap-2 px-7 py-4 font-medium transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  background: "transparent",
                  color: "var(--bv3-cream)",
                  border: "1px solid var(--bv3-border-strong)",
                  borderRadius: "9999px",
                }}
              >
                Explore the portfolio
              </Link>
            </div>

            {/* Editorial footnote */}
            <p className="bv3-mono mt-16" style={{ color: "var(--bv3-ink-dim)" }}>
              I.&nbsp;&nbsp;Open Berlin — Closed Friday — MMXXVI
            </p>
          </motion.div>

          {/* Right column reserved for the traveling Nox (fixed-positioned globally) */}
          <div className="hidden md:col-span-5 md:block" aria-hidden="true" />
        </div>

        {/* Scroll indicator — fades out once user scrolls past hero */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: scrollIndicatorOpacity }}
          initial={{ y: 16 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="bv3-mono" style={{ color: "var(--bv3-ink-dim)" }}>
              Scroll
            </span>
            <motion.div
              className="h-8 w-px"
              style={{ background: "var(--bv3-gold)" }}
              animate={reduce ? undefined : { scaleY: [0, 1, 0], originY: [0, 0, 1] }}
              transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <SpineRule label="II.  PORTFOLIO" />

      {/* =====================================================================
          2. PORTFOLIO — left-anchored editorial register
          ===================================================================== */}
      <SectionShell id="portfolio" ariaLabel="Portfolio">
        <ParallaxHeader
          eyebrow="The portfolio"
          title="Twelve products."
          accent="One mesh."
          right={
            <Link
              href="/portfolio"
              className="bv3-link hidden items-center gap-1 px-5 py-2.5 text-sm font-medium sm:inline-flex"
            >
              See all 12 →
            </Link>
          }
        />

        {/* Editorial stacked list — minimum register, no card chrome.
            Hairline rule between items; status pill + name + tagline per row. */}
        <RevealGroup className="mt-14">
          {featured.map((project, i) => {
            const isLive = project.status === "LIVE";
            return (
              <RevealItem key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block py-6 transition-colors"
                  style={{
                    borderTop:
                      i === 0 ? "1px solid var(--bv3-border-subtle)" : "none",
                    borderBottom: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className="bv3-mono shrink-0"
                      style={{
                        color: isLive
                          ? "var(--bv3-spine-bright)"
                          : "var(--bv3-ink-dim)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      [{project.status}]
                    </span>
                    <div className="flex-1">
                      <h3
                        className="text-2xl font-semibold transition-colors group-hover:text-[var(--bv3-gold)]"
                        style={{ color: "var(--bv3-cream)" }}
                      >
                        {project.name}
                      </h3>
                      <p
                        className="mt-1 text-base leading-relaxed"
                        style={{ color: "var(--bv3-ink-muted)" }}
                      >
                        {project.tagline}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="bv3-mono shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--bv3-gold)" }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </SectionShell>

      <SpineRule label="III.  THE FOUNDATION" />

      {/* =====================================================================
          3. FOUNDATION — invitation strip
          ===================================================================== */}
      <SectionShell ariaLabel="Foundation">
        <div className="grid grid-cols-12 gap-8">
          <motion.div
            className="col-span-12 md:col-span-7 lg:col-span-7"
            variants={sectionEnter}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-15%" }}
          >
            <p className="bv3-mono mb-4">A standing seat</p>
            <ScrubWords
              as="h2"
              text="At the architecture table."
              className="bv3-display-section text-balance"
              style={{
                fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
                color: "var(--bv3-cream)",
                maxWidth: "22ch",
                lineHeight: 1.0,
              }}
              start="top 90%"
              end="top 50%"
              emphasis={(word, index) =>
                // "At" "the" "architecture" "table." → indices 0, 2, 4, 6
                index === 6 ? (
                  <span style={{ color: "var(--bv3-gold)" }}>{word}</span>
                ) : (
                  word
                )
              }
            />
            <p
              className="mt-8 text-lg leading-relaxed"
              style={{ color: "var(--bv3-ink-muted)", maxWidth: "44rem" }}
            >
              Monthly subscription. Direct access to the strategist, architect, and
              automator. Decisions get made; momentum stays. Three founding members
              receive retroactive non-equity NFTs on the NeoHood Genesis Block when
              it ships.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/foundation"
                className="group inline-flex items-center gap-2 px-7 py-4 font-medium transition-all hover:bg-[rgba(255,255,255,0.04)]"
                style={{
                  background: "transparent",
                  color: "var(--bv3-cream)",
                  border: "1px solid var(--bv3-border-strong)",
                  borderRadius: "9999px",
                }}
              >
                Take a seat
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
                <span
                  className="bv3-mono ml-2"
                  style={{ color: "var(--bv3-gold)" }}
                  aria-hidden="true"
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
          </motion.div>

          {/* Quote block — clip-path mask grows on scroll */}
          <ScrubReveal
            className="col-span-12 md:col-span-5 lg:col-span-5"
            clipFrom="inset(15% 8% 15% 8% round 24px)"
            clipTo="inset(0% 0% 0% 0% round 16px)"
            yFrom={40}
            scaleFrom={0.94}
            start="top 80%"
            end="top 35%"
          >
            <div
              className="relative h-full rounded-2xl p-8"
              style={{
                background: "var(--bv3-shell-deep)",
                border: "1px solid var(--bv3-border-subtle)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute -top-4 left-7 text-6xl leading-none"
                style={{ color: "var(--bv3-gold)", fontFamily: "var(--bv3-font-display, serif)" }}
              >
                &ldquo;
              </span>
              <p
                className="text-lg leading-relaxed italic"
                style={{ color: "var(--bv3-cream)" }}
              >
                The work that comes before the work — the framing that holds the
                build — is where the leverage actually lives.
              </p>
              <p className="bv3-mono mt-6" style={{ color: "var(--bv3-gold)" }}>
                — Filed under: practice notes
              </p>
            </div>
          </ScrubReveal>
        </div>
      </SectionShell>

      <SpineRule label="IV.  WORKSTREAMS" />

      {/* =====================================================================
          4. SERVICES — Architect / Automator / Strategist
          ===================================================================== */}
      <SectionShell ariaLabel="Services">
        <ParallaxHeader
          eyebrow="Three workstreams"
          title="Architect."
          accent="Automate. Strategize."
        />

        {/* Editorial stacked services list — minimum register. */}
        <RevealGroup className="mt-14">
          {services.map((s, i) => {
            const tier = tierByService[s.slug];
            return (
              <RevealItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group block py-8"
                  style={{
                    borderTop:
                      i === 0 ? "1px solid var(--bv3-border-subtle)" : "none",
                    borderBottom: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  <div className="flex items-baseline gap-6">
                    <span
                      className="bv3-mono shrink-0 w-12"
                      style={{ color: "var(--bv3-gold)" }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <p
                        className="bv3-mono mb-2"
                        style={{ color: "var(--bv3-ink-muted)" }}
                      >
                        {s.name}
                      </p>
                      <h3
                        className="text-2xl font-semibold md:text-3xl transition-colors group-hover:text-[var(--bv3-gold)]"
                        style={{ color: "var(--bv3-cream)", lineHeight: 1.1 }}
                      >
                        {s.tagline}
                      </h3>
                      <div className="mt-4 flex items-baseline justify-between gap-6">
                        <span
                          className="bv3-mono"
                          style={{ color: "var(--bv3-ink-dim)" }}
                        >
                          {tier.name}
                        </span>
                        <span
                          className="bv3-mono"
                          style={{ color: "var(--bv3-cream)" }}
                        >
                          {tier.price}
                        </span>
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="bv3-mono shrink-0 transition-transform group-hover:translate-x-0.5"
                      style={{ color: "var(--bv3-gold)" }}
                    >
                      →
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </SectionShell>

      <SpineRule label="V.  NOW / NEXT / LATER" />

      {/* =====================================================================
          5. NOW / NEXT / LATER — transparency strip
          ===================================================================== */}
      <SectionShell ariaLabel="Roadmap">
        <ParallaxHeader
          eyebrow="In the open"
          title="What we're building."
          accent="Out loud."
        />

        {/* Editorial stacked roadmap — minimum register. */}
        <ol className="mt-14">
          {[
            {
              label: "Now",
              num: "I",
              body: "Phase 0 of Autonomous Web Agency. Brand v3 mascot lock. Foundation seats opening.",
            },
            {
              label: "Next",
              num: "II",
              body: "Foundation subscription public. AWA v2 toolchain validation. BookStack vertical 1 ships.",
            },
            {
              label: "Later",
              num: "III",
              body: "Apotheosis v1.0 (pre-Aug 2026). NeoHood Sovereign Engine v0. Super App Platform blueprint.",
            },
          ].map((row, i) => (
            <li
              key={row.label}
              className="grid grid-cols-[6rem_1fr_auto] items-baseline gap-6 py-6"
              style={{
                borderTop:
                  i === 0 ? "1px solid var(--bv3-border-subtle)" : "none",
                borderBottom: "1px solid var(--bv3-border-subtle)",
              }}
            >
              <span
                className="bv3-mono"
                style={{ color: "var(--bv3-gold)" }}
              >
                {row.label.toUpperCase()}
              </span>
              <p
                className="text-base leading-relaxed md:text-lg"
                style={{ color: "var(--bv3-cream)" }}
              >
                {row.body}
              </p>
              <span
                className="bv3-mono shrink-0"
                style={{ color: "var(--bv3-ink-dim)" }}
              >
                Phase {row.num}
              </span>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SpineRule label="VI.  CHANNELS" />

      {/* =====================================================================
          6. CHANNELS — Allday 24seven + Day One AI
          ===================================================================== */}
      <SectionShell ariaLabel="Channels">
        <ParallaxHeader
          eyebrow="Latest from the channels"
          title="Building"
          accent="in public."
        />

        {/* Editorial stacked channels list — minimum register. */}
        <RevealGroup className="mt-14">
          {[
            {
              tag: "Allday 24seven",
              copy: "Studio dispatches. Brand work, taste anchors, and the weeks where it all changes.",
              meta: "Long-form essays · weekly cadence",
              href: "/channels/allday",
            },
            {
              tag: "Day One AI",
              copy: "Builder logs. Tools shipped, agents wired, and what we'd skip next time.",
              meta: "Field notes · whenever it matters",
              href: "/channels/day-one",
            },
          ].map((c, i) => (
            <RevealItem key={c.tag}>
              <Link
                href={c.href}
                className="group block py-7"
                style={{
                  borderTop:
                    i === 0 ? "1px solid var(--bv3-border-subtle)" : "none",
                  borderBottom: "1px solid var(--bv3-border-subtle)",
                }}
              >
                <div className="flex items-baseline gap-6">
                  <div className="flex-1">
                    <p
                      className="bv3-mono mb-2"
                      style={{ color: "var(--bv3-gold)" }}
                    >
                      {c.tag}
                    </p>
                    <p
                      className="text-base leading-relaxed md:text-lg transition-colors group-hover:text-[var(--bv3-cream-deep)]"
                      style={{ color: "var(--bv3-cream)" }}
                    >
                      {c.copy}
                    </p>
                    <p
                      className="bv3-mono mt-3"
                      style={{ color: "var(--bv3-ink-dim)" }}
                    >
                      {c.meta}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="bv3-mono shrink-0 transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--bv3-gold)" }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Closing wordmark — oversized editorial footer */}
        <motion.div
          className="mt-32 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="bv3-display select-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 14rem)",
              lineHeight: 0.9,
              color: "var(--bv3-shell-deep)",
              letterSpacing: "-0.04em",
              WebkitTextStroke: "1px var(--bv3-spine)",
            }}
          >
            Synapse&nbsp;Dynamics.
          </p>
        </motion.div>

        <div
          className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t pt-8"
          style={{ borderColor: "var(--bv3-border-subtle)" }}
        >
          <p className="bv3-mono" style={{ color: "var(--bv3-ink-dim)" }}>
            FIN.&nbsp;&nbsp;·&nbsp;&nbsp;MMXXVI&nbsp;&nbsp;·&nbsp;&nbsp;Edited in Berlin
          </p>
          <p className="bv3-mono" style={{ color: "var(--bv3-gold)" }}>
            v1 · Immersive Garden
          </p>
        </div>
      </SectionShell>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Local layout primitives
// ---------------------------------------------------------------------------

function SectionShell({
  children,
  ariaLabel,
  id,
}: {
  children: React.ReactNode;
  ariaLabel: string;
  id?: string;
}) {
  // Full-width centered editorial layout. Max content column 1360px.
  // Section ground is transparent so the cosmos video persists behind.
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className="relative px-6 py-24 md:px-12 md:py-32"
    >
      <div className="relative mx-auto max-w-[1360px]">{children}</div>
    </section>
  );
}

function ParallaxHeader({
  eyebrow,
  title,
  accent,
  right,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  right?: React.ReactNode;
}) {
  // Combine title + accent into a single ScrubWords text. Use the emphasis
  // callback to color-shift words past the title length.
  const fullText = accent ? `${title} ${accent}` : title;
  // Tokenize the same way ScrubWords does so we can compute the index where
  // accent words start. ScrubWords splits on /(\s+)/ which preserves spaces,
  // so the index alternates word, space, word, space — emphasis comes in at
  // the index of the first accent-word slot.
  const titleTokens = title.split(/(\s+)/);
  const accentStartIndex = accent ? titleTokens.length + 1 : Number.POSITIVE_INFINITY;

  return (
    <ParallaxLayer
      yPercent={6}
      start="top bottom"
      end="bottom top"
      className="flex items-end justify-between gap-8"
    >
      <div>
        <p className="bv3-mono mb-4">{eyebrow}</p>
        <ScrubWords
          as="h2"
          text={fullText}
          ariaLabel={fullText}
          className="bv3-display-section text-balance"
          style={{
            fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
            color: "var(--bv3-cream)",
            maxWidth: "22ch",
            lineHeight: 1.0,
          }}
          start="top 90%"
          end="top 50%"
          emphasis={(word, index) =>
            index >= accentStartIndex ? (
              <span style={{ color: "var(--bv3-gold)" }}>{word}</span>
            ) : (
              word
            )
          }
        />
      </div>
      {right}
    </ParallaxLayer>
  );
}
