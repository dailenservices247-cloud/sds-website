// app/(v3)/preview/page.tsx
// HIGH-FIDELITY REFERENCE — homepage hero in brand v3 synthesis aesthetic.
// One page. Get user feedback. Iterate. Then scale to /portfolio, /foundation, etc.
//
// Implements DESIGN.md synthesis pattern "Quiet shell, loud moments":
//   1. Loud register hero — Hero Blaze gradient + Bricolage 80px display + parallax + dotted-underline link
//   2. Quiet register transition strip — pure white, restraint
//   3. Sequential reveal cards — Replicate model-gallery feel via portfolio data
//   4. Manifesto closer — dark surface + 96px Bricolage display
//
// Scroll animation per video 2 youtu.be/TcFeSjwTo7g:
//   - parallax on gradient background as user scrolls
//   - sequential card reveals (60ms stagger)
//   - manifesto type entrance (scale + fade)

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sortedPortfolio } from "@/lib/content/portfolio";
import { RevealGroup, RevealItem } from "@/components/v3/RevealOnScroll";
import { Creature } from "@/components/v3/Creature";
import { Wordmark } from "@/components/brand/Wordmark";

export default function PreviewPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Gradient parallax: shift gradient position 0-15% of viewport height as hero scrolls past.
  const gradientY = useTransform(heroProgress, [0, 1], ["0%", "15%"]);
  // Hero text fades + drifts up as it leaves
  const heroTextOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0px", "-40px"]);

  const projects = sortedPortfolio().slice(0, 6); // First 6 for the gallery strip

  return (
    <>
      {/* ============================================================
          1. LOUD HERO — full-bleed gradient, massive Bricolage display
          ============================================================ */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden min-h-[88vh] flex items-end pb-16 md:pb-24"
        aria-label="Hero"
      >
        {/* Gradient background with parallax */}
        <motion.div
          className="absolute inset-0 -z-10 gradient-blaze"
          style={{ y: gradientY }}
          aria-hidden="true"
        />

        {/* Subtle grain overlay (CSS noise) for texture */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        {/* (Worm3D removed 2026-04-30 — wrong interpretation; rebuilding) */}

        {/* Hero content */}
        <motion.div
          className="container-x relative z-10"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          {/* Stacked wordmark — worm-S in both "Synapse" and "Segmented".
              NodalWorm removed 2026-04-30 per Dailen. */}
          <Wordmark
            withTag="stacked"
            className="mb-10 md:mb-14 text-white"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
          />

          <h1
            className="display text-white text-balance"
            style={{
              fontSize: "clamp(3rem, 8.5vw, 6.25rem)",
              maxWidth: "16ch",
            }}
          >
            Build the AI portfolio you can actually use.
          </h1>

          <p
            className="mt-8 md:mt-10 text-lg md:text-xl text-pretty leading-relaxed"
            style={{ color: "rgba(255,255,255,0.92)", maxWidth: "44rem" }}
          >
            One founder, building twelve products that connect. No VC. No deck.
            Watch it ship —{" "}
            <Link href="/portfolio" className="link-dotted" style={{ color: "white", textDecorationColor: "rgba(255,255,255,0.6)" }}>
              follow the portfolio
            </Link>{" "}
            or{" "}
            <Link href="/foundation" className="link-dotted" style={{ color: "white", textDecorationColor: "rgba(255,255,255,0.6)" }}>
              join the build for $19/month
            </Link>
            .
          </p>

          {/* CTAs — pill-shaped; primary = white-on-dark over emerald gradient,
              secondary = glass with white border. Both readable on the gradient. */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/foundation"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0f0c] px-7 py-4 font-medium hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Join Foundation — $19/mo
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white border border-white/40 px-7 py-4 font-medium hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Need an engagement?
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          2. QUIET TRANSITION STRIP — dark canvas restraint after the loud hero
          ============================================================ */}
      <section className="relative border-b border-border-subtle overflow-hidden">
        <Creature slug="axolotl" position="top-right" opacity={0.12} tint="muted" />
        <div className="container-x py-20 md:py-28 relative z-10">
          <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
            <RevealItem>
              <p className="mono-label mb-3">Layer 1.A</p>
              <p className="display-quiet text-3xl md:text-4xl text-ink-primary mb-3">
                Funnel hub
              </p>
              <p className="text-base md:text-lg text-ink-muted leading-relaxed">
                This site you&rsquo;re on. The front door for the entire portfolio,
                running an active consulting business beside it.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mono-label mb-3">Layer 1</p>
              <p className="display-quiet text-3xl md:text-4xl text-ink-primary mb-3">
                Shipping today
              </p>
              <p className="text-base md:text-lg text-ink-muted leading-relaxed">
                Scrlpets is live. n8n SEO Tool is live. Paperclip orchestrates
                the agent layer behind everything.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mono-label mb-3">Layer 3 + 4</p>
              <p className="display-quiet text-3xl md:text-4xl text-ink-primary mb-3">
                In flight
              </p>
              <p className="text-base md:text-lg text-ink-muted leading-relaxed">
                Apotheosis ships before August 2 (EU AI Act deadline). BookStack
                + AWA + four Horizon products parked with named unblock conditions.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ============================================================
          3. PORTFOLIO STRIP — Replicate-flavored gallery with sequential reveals
          ============================================================ */}
      <section className="container-x py-24 md:py-32">
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="mono-label mb-3">The portfolio</p>
            <h2 className="display-section text-4xl md:text-5xl text-ink-primary text-balance max-w-xl">
              Twelve products. One mesh.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium hover:border-ink-primary transition-colors"
          >
            See all
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => {
            const isLive = project.status === "LIVE";
            const isParked = project.status === "PARKED";
            return (
              <RevealItem key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block h-full rounded-xl border border-border-subtle bg-bg-surface p-7 transition-all hover:border-accent hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mono-label text-[10px]"
                      style={{
                        backgroundColor: isLive
                          ? "rgba(34, 197, 94, 0.15)"
                          : isParked
                          ? "rgba(148, 163, 160, 0.12)"
                          : "rgba(45, 143, 80, 0.12)",
                        color: isLive
                          ? "#34d880"
                          : isParked
                          ? "#94a3a0"
                          : "#5fcc8a",
                      }}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          isLive ? "live-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: isLive
                            ? "#22c55e"
                            : isParked
                            ? "#5f6b66"
                            : "#2d8f50",
                        }}
                        aria-hidden="true"
                      />
                      <span>{project.status}</span>
                    </span>
                    <span className="mono-label text-[10px]">
                      Layer {project.layer}
                    </span>
                  </div>

                  <h3
                    className="font-bricolage font-bold text-ink-primary mb-2 text-balance leading-tight"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 1.75rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed text-pretty">
                    {project.tagline}
                  </p>

                  {project.parkedUntil && (
                    <p className="mt-5 pt-4 border-t border-border-soft text-sm text-ink-dim leading-relaxed">
                      <span className="mono-label text-[10px] block mb-1">
                        Unblocks when
                      </span>
                      {project.parkedUntil}
                    </p>
                  )}

                  <p className="mt-6 text-sm font-medium text-ink-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* ============================================================
          4. MANIFESTO — dark surface + Bricolage 96px max-impact close
          ============================================================ */}
      <section className="relative bg-bg-dark py-24 md:py-40 overflow-hidden">
        <Creature slug="planaria" position="mid-left" opacity={0.10} tint="accent" />
        <div className="container-x relative z-10">
          <RevealGroup>
            <RevealItem>
              <p
                className="mono-label mb-8"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                Synapse Dynamics
              </p>
            </RevealItem>
            <RevealItem>
              <h2
                className="display text-white text-balance"
                style={{
                  fontSize: "clamp(3rem, 11vw, 8rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                }}
              >
                Imagine what you can ship.
              </h2>
            </RevealItem>
            <RevealItem>
              <p
                className="mt-10 md:mt-14 text-xl md:text-2xl leading-relaxed max-w-3xl"
                style={{ color: "rgba(255,255,255,0.78)" }}
              >
                Not vapor. Not a deck. A real portfolio of twelve products
                connecting through a single mesh — built by one operator, in
                public, with you.
              </p>
            </RevealItem>
            <RevealItem>
              <Link
                href="/foundation"
                className="mt-12 inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-4 font-medium text-base md:text-lg hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get the launch ping
                <span aria-hidden="true">→</span>
              </Link>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
