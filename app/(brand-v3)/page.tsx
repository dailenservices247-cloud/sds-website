// app/(brand-v3)/page.tsx — Synapse Dynamics homepage
//
// REGISTER CHANGE, 2026-08-21.
//
// This page previously ran the "V3 Cursor" developer-tool register: terminal
// command prompts (`$ cursor --about`), line-numbered file-tree lists, keyboard
// shortcut hints, a status-bar footer. That register was locked 2026-05-20 as a
// deliberate NINETY-DAY commitment running through 2026-08-20 — see
// AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md.
//
// That window closed yesterday. The decision's own revisit trigger names the
// exact signal to replace it on: "felt too playful / too dev-tool-y." Dailen
// gave that signal directly. So this is not a lock being broken — it is the
// lock expiring on schedule and its stated trigger firing.
//
// WHAT REPLACES IT: the page is the descent.
//
// The mascot narrative (AI Hub/PRDs/helix-mascot-spec-2026-08-20.md, "THE PAGE
// NARRATIVE") is that Helix drifts idle, notices you, then travels down the
// page staying ahead of something — pausing to do clever things with his
// segments, until the last trick left is to divide. Lux goes one way, Nox the
// other, and the thing chasing one signature can only follow half.
//
// The page structure encodes that arc rather than illustrating it:
//   hero (idle → notices) → services (descending) → a STOP → portfolio →
//   a STOP → channels → the split (two ways in)
//
// The two STOP beats are not filler. They are where the creature pauses, and
// structurally they are the only reason the cosmos is ever visible: content
// arrives, holds, and LEAVES via <Beat>, so between beats the background is
// alone on screen. The old page faded content in and never let it go, which is
// why mounting a persistent WebGL canvas behind it bought nothing.
//
// Brand v3 tokens, palette, and the Bricolage display lock are unchanged. The
// hero now uses .bv3-display rather than hand-rolling Bricolage inline, which
// closes the non-conformance DESIGN.md:194 records as "scheduled for
// correction" (it was dropping uppercase, the opsz axis, and the line-height).

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Beat } from "@/components/brand-v3/Beat";
import { channels } from "@/lib/content/channels";
import { portfolioProjects } from "@/lib/content/portfolio";
import { services } from "@/lib/content/services";

// Status reads as a quiet token-coloured word, NOT via portfolio.ts's
// `statusBadge` — that map is built from Tailwind emerald/sky/amber classes and
// saturated emerald is forbidden outright by DESIGN.md:157 (it is the dead
// brand-v2 accent). Same information, on-palette.
const STATUS_TONE: Record<string, string> = {
  LIVE: "var(--bv3-spine-bright)",
  "PRE-LAUNCH": "var(--bv3-gold)",
  INTERNAL: "var(--bv3-gold)",
  CONCEPT: "var(--bv3-ink-dim)",
  PARKED: "var(--bv3-ink-dim)",
};

const STATUS_LABEL: Record<string, string> = {
  LIVE: "Live",
  "PRE-LAUNCH": "In progress",
  INTERNAL: "Internal",
  CONCEPT: "Banked",
  PARKED: "Banked",
};

export default function HomePage() {
  const reduced = useReducedMotion();

  // Portfolio, grouped the way Dailen asked for it: finished, in progress,
  // banked — and deliberately not revealing more than the name and a line.
  const live = portfolioProjects.filter((p) => p.status === "LIVE");
  const building = portfolioProjects.filter(
    (p) => p.status === "PRE-LAUNCH" || p.status === "INTERNAL",
  );
  const banked = portfolioProjects.filter(
    (p) => p.status === "CONCEPT" || p.status === "PARKED",
  );

  return (
    <main className="relative">
      {/* ===================================================================
          HERO — he is drifting, and then he notices you.
          Deliberately sparse. One idea, one action, and a great deal of
          nothing, so the creature and the cosmos own the first screen.
          =================================================================== */}
      <section
        aria-label="Introduction"
        className="relative flex min-h-[92vh] items-center"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-6xl px-6"
        >
          <h1
            className="bv3-display text-balance"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
              color: "var(--bv3-cream)",
              maxWidth: "14ch",
            }}
          >
            Think before you{" "}
            <span style={{ color: "var(--bv3-wine-text)" }}>code</span>.
          </h1>

          <p
            className="mt-8 text-pretty text-lg leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "48ch" }}
          >
            An AI architecture studio. We build the pipeline an industry
            actually runs on, secure the systems that carry it, and ship the
            sites and apps around it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: "var(--bv3-spine)",
                color: "var(--bv3-on-spine)",
              }}
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
            {/* Plain <a>, deliberately NOT next/link. Next's Link intercepts the
                click and preventDefaults it to run a router navigation, which
                does nothing useful for a same-page fragment AND stops the Lenis
                anchor handler in LenisProvider from ever seeing the event. */}
            <a
              href="#portfolio"
              className="text-sm underline-offset-4 transition-colors hover:underline"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              See what we&rsquo;ve built
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===================================================================
          SERVICES — three, and only three. The scope retraction is the
          point: everything that used to live here that is not one of these
          is off the homepage.
          =================================================================== */}
      <Beat id="services" label="What we do" width="wide">
        <h2
          className="bv3-display-section"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            color: "var(--bv3-cream)",
          }}
        >
          Three things
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block"
            >
              <div
                className="text-xs tracking-[0.18em]"
                style={{ color: "var(--bv3-gold)" }}
              >
                {service.numeral}
              </div>
              <h3
                className="mt-4 text-2xl font-semibold transition-colors"
                style={{ color: "var(--bv3-cream)" }}
              >
                {service.name}
              </h3>
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: "var(--bv3-ink-muted)" }}
              >
                {service.tagline}
              </p>
              <span
                className="mt-5 inline-block text-sm opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: "var(--bv3-spine-bright)" }}
                aria-hidden="true"
              >
                Read more →
              </span>
            </Link>
          ))}
        </div>
      </Beat>

      {/* ===================================================================
          STOP — the first pause. He stops, works a segment, moves on.
          Nothing here but a claim and a lot of room. The room IS the point:
          this is where the cosmos is alone on screen.
          =================================================================== */}
      <Beat label="How we work">
        <p
          className="text-balance text-2xl leading-[1.4] sm:text-3xl"
          style={{ color: "var(--bv3-cream)", maxWidth: "22ch" }}
        >
          Every one of them was built for ourselves first.
        </p>
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-ink-muted)", maxWidth: "46ch" }}
        >
          The portfolio is the proof. Not a case-study deck.
        </p>
      </Beat>

      {/* ===================================================================
          PORTFOLIO — finished / in progress / banked. Name and one line
          only; the detail lives on the premiere pages.
          =================================================================== */}
      <Beat id="portfolio" label="Portfolio">
        <h2
          className="bv3-display-section"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            color: "var(--bv3-cream)",
          }}
        >
          What we&rsquo;ve built
        </h2>

        <div className="mt-14 space-y-12">
          {[
            { heading: "Shipped", items: live },
            { heading: "In progress", items: building },
            { heading: "Banked", items: banked },
          ]
            .filter((g) => g.items.length > 0)
            .map((group) => (
              <div key={group.heading}>
                <div
                  className="text-xs uppercase tracking-[0.18em]"
                  style={{ color: "var(--bv3-ink-dim)" }}
                >
                  {group.heading}
                </div>
                <ul className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                  {group.items.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="group block"
                      >
                        <div className="flex items-baseline gap-3">
                          <span
                            className="text-lg font-semibold"
                            style={{ color: "var(--bv3-cream)" }}
                          >
                            {project.name}
                          </span>
                          <span
                            className="text-[11px] uppercase tracking-[0.12em]"
                            style={{
                              color:
                                STATUS_TONE[project.status] ??
                                "var(--bv3-ink-dim)",
                            }}
                          >
                            {STATUS_LABEL[project.status] ?? project.status}
                          </span>
                        </div>
                        <p
                          className="mt-2 text-[15px] leading-relaxed"
                          style={{ color: "var(--bv3-ink-muted)" }}
                        >
                          {project.tagline}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>

        <Link
          href="/portfolio"
          className="mt-12 inline-block text-sm underline-offset-4 hover:underline"
          style={{ color: "var(--bv3-spine-bright)" }}
        >
          The whole portfolio →
        </Link>
      </Beat>

      {/* ===================================================================
          STOP — the second pause, and the bridge into the channels.
          =================================================================== */}
      <Beat label="Working in the open">
        <p
          className="text-balance text-2xl leading-[1.4] sm:text-3xl"
          style={{ color: "var(--bv3-cream)", maxWidth: "24ch" }}
        >
          We document while we build.
        </p>
        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-ink-muted)", maxWidth: "46ch" }}
        >
          Most of it reaches a channel before it reaches a proposal.
        </p>
      </Beat>

      {/* =================================================================== */}
      <Beat id="channels" label="Channels">
        <h2
          className="bv3-display-section"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            color: "var(--bv3-cream)",
          }}
        >
          Channels
        </h2>

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {channels.map((channel) => {
            const body = (
              <>
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-lg font-semibold"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {channel.name}
                  </span>
                  <span
                    className="text-[11px] uppercase tracking-[0.12em]"
                    style={{ color: "var(--bv3-ink-dim)" }}
                  >
                    {channel.status}
                  </span>
                </div>
                <p
                  className="mt-2 text-[15px] leading-relaxed"
                  style={{ color: "var(--bv3-ink-muted)" }}
                >
                  {channel.tagline}
                </p>
              </>
            );

            return (
              <li key={channel.slug}>
                {channel.url ? (
                  <a
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </Beat>

      {/* ===================================================================
          THE SPLIT — the last beat, and the payoff of the whole descent.
          He runs out of tricks and uses the only one left: he divides.
          Two ways in, deliberately. The page ends where the story does.
          =================================================================== */}
      <Beat label="Get in touch" space="tight" className="pb-[28vh]">
        <h2
          className="bv3-display-section text-balance"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            color: "var(--bv3-cream)",
            maxWidth: "16ch",
          }}
        >
          Two ways in
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--bv3-cream)" }}
            >
              You know what you need
            </h3>
            <p
              className="mt-3 text-[15px] leading-relaxed"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Tell us the shape of it and we&rsquo;ll tell you what it takes.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                background: "var(--bv3-spine)",
                color: "var(--bv3-on-spine)",
              }}
            >
              Start a project
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--bv3-cream)" }}
            >
              You have a question first
            </h3>
            <p
              className="mt-3 text-[15px] leading-relaxed"
              style={{ color: "var(--bv3-ink-muted)" }}
            >
              Ask it in your own words. A person answers.
            </p>
            <Link
              href="/ask"
              className="mt-5 inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-colors"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-cream)",
              }}
            >
              Ask
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </Beat>
    </main>
  );
}
