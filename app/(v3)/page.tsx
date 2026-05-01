// app/(v3)/page.tsx — Synapse Dynamics homepage (v3 redesign)
// Six-section IA per redesign PRD lock 2026-04-28:
//   1. Hero — wordmark stack + H1 + dual CTA
//   2. Portfolio at-a-glance — 3-column grid of layer-1 + layer-3 products
//   3. Foundation Subscription invitation strip
//   4. Services preview — Architect / Automator / Strategist
//   5. Now / Next / Later transparency strip
//   6. Latest from the channels — Allday 24seven + Day One AI cross-routing

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { projectsByStatus } from "@/lib/content/portfolio";
import { RevealGroup, RevealItem } from "@/components/v3/RevealOnScroll";
import { Wordmark } from "@/components/brand/Wordmark";

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const gradientY = useTransform(heroProgress, [0, 1], ["0%", "15%"]);
  const heroTextOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0px", "-40px"]);

  // Portfolio at-a-glance — pull LIVE + PRE-LAUNCH only (skip PARKED + INTERNAL)
  const featured = [
    ...projectsByStatus("LIVE"),
    ...projectsByStatus("PRE-LAUNCH"),
  ].slice(0, 6);

  return (
    <>
      {/* ============================================================
          1. HERO — emerald gradient + Bricolage display + dual CTA
          ============================================================ */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden min-h-[88vh] flex items-end pb-16 md:pb-24"
        aria-label="Hero"
      >
        <motion.div
          className="absolute inset-0 -z-10 gradient-blaze"
          style={{ y: gradientY }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />

        <motion.div
          className="container-x relative z-10"
          style={{ opacity: heroTextOpacity, y: heroTextY }}
        >
          <Wordmark
            withTag="stacked"
            className="mb-10 md:mb-14 text-white"
            style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
          />

          <h1
            className="display text-white text-balance"
            style={{ fontSize: "clamp(3rem, 8.5vw, 6.25rem)", maxWidth: "16ch" }}
          >
            Ship AI that actually&nbsp;works.
          </h1>

          <p
            className="mt-8 md:mt-10 text-lg md:text-xl text-pretty leading-relaxed"
            style={{ color: "rgba(255,255,255,0.92)", maxWidth: "44rem" }}
          >
            Synapse Dynamics is an AI agency building websites, custom apps,
            automations, and strategy for founders who need results, not decks.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0a0f0c] px-7 py-4 font-medium hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white border border-white/40 px-7 py-4 font-medium hover:bg-white/20 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Explore the portfolio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          2. PORTFOLIO AT-A-GLANCE — LIVE + PRE-LAUNCH grid
          ============================================================ */}
      <section className="container-x py-20 md:py-28 border-b border-border-subtle">
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="mono-label mb-3">The portfolio</p>
            <h2 className="display-section text-4xl md:text-5xl text-ink-primary text-balance max-w-xl">
              Twelve products. One mesh.
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            See all 12
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project) => {
            const isLive = project.status === "LIVE";
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
                          : "rgba(45, 143, 80, 0.12)",
                        color: isLive ? "#34d880" : "#5fcc8a",
                      }}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          isLive ? "live-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: isLive ? "#22c55e" : "#2d8f50",
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
                    style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.75rem)", letterSpacing: "-0.02em" }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed text-pretty">
                    {project.tagline}
                  </p>
                  <p className="mt-6 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
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
          3. FOUNDATION SUBSCRIPTION INVITATION
          ============================================================ */}
      <section className="container-x py-20 md:py-28 border-b border-border-subtle">
        <div className="rounded-3xl border border-border-subtle bg-bg-surface p-8 md:p-14 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 items-center">
          <div>
            <p className="mono-label mb-4">Bridge offer · Pre-launch</p>
            <h2
              className="font-bricolage font-bold text-ink-primary mb-6 text-balance leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.02em" }}
            >
              Ride along while we build it.
            </h2>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty mb-2">
              <strong className="text-ink-primary">$19/mo</strong> for access
              to the entire portfolio mesh while it&rsquo;s being built.
              Behind-the-build content, direction-shaping Discord, weekly
              Q&amp;A recap, and early access to every product as it
              launches.
            </p>
            <p className="text-base text-ink-dim leading-relaxed text-pretty">
              Auto-converts to Apotheosis Pro at launch — same $19/mo, no
              price change.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              href="/foundation"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-4 font-semibold hover:bg-accent-bright transition-colors text-center"
            >
              Foundation Subscription
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/matchmaker"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle text-ink-primary px-7 py-4 font-medium hover:border-accent hover:text-accent transition-colors text-center"
            >
              Find your AI path
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. SERVICES PREVIEW — Architect / Automator / Strategist
          ============================================================ */}
      <section className="container-x py-20 md:py-28 border-b border-border-subtle">
        <div className="flex items-end justify-between gap-8 mb-12 md:mb-16">
          <div>
            <p className="mono-label mb-3">For businesses</p>
            <h2 className="display-section text-4xl md:text-5xl text-ink-primary text-balance max-w-xl">
              SDS Consulting.
            </h2>
            <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-2xl">
              Three engagement series. Real-revenue track record. For founders
              and operators who need help shipping AI today, not waiting on a
              roadmap.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1 rounded-full border border-border-subtle px-5 py-2.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            All series
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              slug: "architect",
              numeral: "01",
              name: "Architect",
              tag: "Custom apps + websites + platforms",
              priceHint: "$4,500 – $20,000",
            },
            {
              slug: "automator",
              numeral: "02",
              name: "Automator",
              tag: "Workflows + agents + n8n",
              priceHint: "$2,500 – $5,500 + retainers",
            },
            {
              slug: "strategist",
              numeral: "03",
              name: "Strategist",
              tag: "AI strategy + roadmap + retainer",
              priceHint: "$1,500 – $4,500 + retainers",
            },
          ].map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="group block h-full rounded-xl border border-border-subtle bg-bg-surface p-7 transition-all hover:border-accent hover:-translate-y-0.5"
              >
                <p className="mono-label mb-4">Series {s.numeral}</p>
                <h3
                  className="font-bricolage font-bold text-ink-primary mb-2 leading-tight"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)", letterSpacing: "-0.02em" }}
                >
                  {s.name}
                </h3>
                <p className="text-base text-ink-muted leading-relaxed mb-5">{s.tag}</p>
                <p className="font-mono text-sm text-accent">{s.priceHint}</p>
                <p className="mt-6 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  See {s.name}
                  <span aria-hidden="true">→</span>
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* ============================================================
          5. NOW / NEXT / LATER transparency strip
          ============================================================ */}
      <section className="container-x py-20 md:py-28 border-b border-border-subtle">
        <div className="mb-12">
          <p className="mono-label mb-3">In flight</p>
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary text-balance max-w-2xl">
            What&rsquo;s shipping.
          </h2>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <RevealItem>
            <p className="mono-label mb-3 text-accent">Now</p>
            <p className="display-quiet text-2xl md:text-3xl text-ink-primary mb-3">
              This week
            </p>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed">
              SDS Website redesign · Foundation Subscription page going live
              post-Articles approval · n8n SEO Tool credential rotation by May 5.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mono-label mb-3 text-accent">Next</p>
            <p className="display-quiet text-2xl md:text-3xl text-ink-primary mb-3">
              Next month
            </p>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed">
              Foundation Subscription soft launch (Week of May 5) · Scrlpets
              social activation · Matchmaker Phase 1 interview build.
            </p>
          </RevealItem>
          <RevealItem>
            <p className="mono-label mb-3 text-accent">Later</p>
            <p className="display-quiet text-2xl md:text-3xl text-ink-primary mb-3">
              By August
            </p>
            <p className="text-base md:text-lg text-ink-muted leading-relaxed">
              Apotheosis v1.0 ships before EU AI Act deadline. BookStack Phase 1.
              AWA Phase 0 validation. NeoHood v0 architecture begins.
            </p>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* ============================================================
          6. LATEST FROM THE CHANNELS — content cross-routing
          ============================================================ */}
      <section className="container-x py-20 md:py-28">
        <div className="mb-12">
          <p className="mono-label mb-3">Building in public</p>
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary text-balance max-w-2xl">
            Latest from the channels.
          </h2>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RevealItem>
            <div className="rounded-xl border border-border-subtle bg-bg-surface p-7 h-full flex flex-col">
              <p className="mono-label mb-3">Allday 24seven</p>
              <h3
                className="font-bricolage font-bold text-ink-primary mb-3 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", letterSpacing: "-0.02em" }}
              >
                Founder journey, building in public.
              </h3>
              <p className="text-base text-ink-muted leading-relaxed text-pretty mb-6 flex-grow">
                Watch a solo founder build a real AI portfolio instead of
                bullshit demos. Weekly long-form, daily shorts.
              </p>
              <p className="text-sm text-ink-dim italic">
                YouTube embed lands when channel goes live (Week 2 of phased rollout).
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="rounded-xl border border-border-subtle bg-bg-surface p-7 h-full flex flex-col">
              <p className="mono-label mb-3">Day One AI</p>
              <h3
                className="font-bricolage font-bold text-ink-primary mb-3 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)", letterSpacing: "-0.02em" }}
              >
                AI for people brand new to it.
              </h3>
              <p className="text-base text-ink-muted leading-relaxed text-pretty mb-6 flex-grow">
                From zero AI knowledge to actually getting things done — without
                buying $400/mo of tools.
              </p>
              <p className="text-sm text-ink-dim italic">
                YouTube embed lands when channel goes live (Week 3 of phased rollout).
              </p>
            </div>
          </RevealItem>
        </RevealGroup>

        {/* Newsletter */}
        <div className="mt-16 rounded-3xl bg-bg-dark border border-border-subtle p-8 md:p-12 text-center">
          <p className="mono-label mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
            Newsletter · Weekly
          </p>
          <h3
            className="display text-white text-balance mb-4 mx-auto"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", maxWidth: "20ch" }}
          >
            One synthesis email per week.
          </h3>
          <p className="text-base md:text-lg text-pretty leading-relaxed mb-8 mx-auto max-w-2xl" style={{ color: "rgba(255,255,255,0.78)" }}>
            What we shipped, what we learned, what&rsquo;s next. No marketing
            fluff, no upsell sequence.
          </p>
          <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.55)" }}>
            Email capture wires up post-domain + Resend activation.
          </p>
        </div>
      </section>
    </>
  );
}
