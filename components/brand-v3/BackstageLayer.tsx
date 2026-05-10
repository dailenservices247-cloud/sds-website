// components/brand-v3/BackstageLayer.tsx
// Backstage transparency layer per Immersive Garden spec mandate.
// Toggle button bottom-right; opens overlay revealing 3 real panels:
//   1. The brand — token swatches with hex + role labels
//   2. The motion — Nox journey timeline diagram
//   3. The Nox — lock history strip (7 PNGs from public/brand-v3/)
//
// "Absolute transparency" — exposes wireframes, design rationale, lock history.
//
// Refs:
// - shape brief: docs/shape/v1-immersive-garden-shape.md (Q3 picked A)
// - awa-v3-immersive-garden-spec.md: "Absolute Transparency" creative principle

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Token data — synced from lib/design/brand-v3-tokens.ts + DESIGN.md
// ---------------------------------------------------------------------------

const COLOR_TOKENS: Array<{
  name: string;
  hex: string;
  role: string;
  textOnSwatch: string;
}> = [
  { name: "shell", hex: "#3a3b3d", role: "Body shell / primary ground", textOnSwatch: "#efede5" },
  { name: "shell-deep", hex: "#2a2a2d", role: "Elevated card / depth shift", textOnSwatch: "#efede5" },
  { name: "spine", hex: "#2a6055", role: "Petrol primary accent", textOnSwatch: "#efede5" },
  { name: "gold", hex: "#c8a23e", role: "Antique gold accent / CTA pill", textOnSwatch: "#3a3b3d" },
  { name: "cream", hex: "#efede5", role: "Ink on shell (text only)", textOnSwatch: "#3a3b3d" },
  { name: "wine", hex: "#7e303a", role: "Emotion accent (sparingly)", textOnSwatch: "#efede5" },
];

const NOX_LOCK_HISTORY: Array<{
  src: string;
  label: string;
  date: string;
}> = [
  { src: "/brand-v3/nox-PRIMARY-LOCKED.png", label: "Primary", date: "2026-05-08" },
  { src: "/brand-v3/nox-MONOGRAM-LOCKED.png", label: "Monogram", date: "2026-05-08" },
  { src: "/brand-v3/nox-WORDMARK-LOCKUP-LOCKED.png", label: "Wordmark", date: "2026-05-08" },
  { src: "/brand-v3/nox-pose-WORKING-LOCKED.png", label: "Working", date: "2026-05-08" },
  { src: "/brand-v3/nox-pose-LISTENING-LOCKED.png", label: "Listening", date: "2026-05-08" },
  { src: "/brand-v3/nox-pose-PRESENTING-LOCKED.png", label: "Presenting", date: "2026-05-08" },
  { src: "/brand-v3/nox-pose-RESTING-LOCKED.png", label: "Resting", date: "2026-05-08" },
];

// Section markers for motion timeline — sync with v1-garden SECTION_THRESHOLDS
const TIMELINE_SECTIONS: Array<{ start: number; end: number; pose: string; label: string }> = [
  { start: 0.0, end: 0.16, pose: "working", label: "Hero" },
  { start: 0.16, end: 0.34, pose: "working", label: "Portfolio" },
  { start: 0.34, end: 0.5, pose: "listening", label: "Foundation" },
  { start: 0.5, end: 0.68, pose: "presenting", label: "Services" },
  { start: 0.68, end: 0.86, pose: "working", label: "Now/Next/Later" },
  { start: 0.86, end: 1.0, pose: "resting", label: "Channels" },
];

// ---------------------------------------------------------------------------
// Panel 1 — The brand
// ---------------------------------------------------------------------------

function PanelBrand() {
  return (
    <div>
      <p
        className="bv3-mono mb-4"
        style={{ color: "var(--bv3-gold)" }}
      >
        I. The brand
      </p>
      <h3
        className="bv3-display-section mb-6"
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: "var(--bv3-cream)",
        }}
      >
        Tokens, not vibes.
      </h3>
      <p
        className="mb-8 text-base leading-relaxed"
        style={{ color: "var(--bv3-ink-muted)", maxWidth: "44rem" }}
      >
        Every color earns a role. Tinted neutrals only — no pure black, no pure
        gray. Petrol-green and antique-gold each carry under 10% of any
        surface; the matte shell carries the rest.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {COLOR_TOKENS.map((t) => (
          <div
            key={t.name}
            className="rounded-xl p-4"
            style={{
              background: t.hex,
              color: t.textOnSwatch,
              border: "1px solid var(--bv3-border-subtle)",
            }}
          >
            <p
              className="bv3-mono mb-1"
              style={{ color: t.textOnSwatch, opacity: 0.85 }}
            >
              {t.name}
            </p>
            <p
              className="text-sm font-medium leading-tight"
              style={{ color: t.textOnSwatch }}
            >
              {t.hex}
            </p>
            <p
              className="mt-2 text-xs leading-snug"
              style={{ color: t.textOnSwatch, opacity: 0.75 }}
            >
              {t.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel 2 — The motion (timeline diagram)
// ---------------------------------------------------------------------------

function PanelMotion() {
  return (
    <div>
      <p
        className="bv3-mono mb-4"
        style={{ color: "var(--bv3-gold)" }}
      >
        II. The motion
      </p>
      <h3
        className="bv3-display-section mb-6"
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: "var(--bv3-cream)",
        }}
      >
        One Nox, six poses, scroll-orchestrated.
      </h3>
      <p
        className="mb-8 text-base leading-relaxed"
        style={{ color: "var(--bv3-ink-muted)", maxWidth: "44rem" }}
      >
        A single Nox instance travels the page on scroll. Pose swaps fire at
        section thresholds via GSAP ScrollTrigger; AnimatePresence handles the
        crossfade. Lenis hijacks the scroll for cinematic pacing. Every motion
        falls back gracefully under prefers-reduced-motion.
      </p>

      {/* Timeline diagram — SVG */}
      <div
        className="rounded-xl p-6"
        style={{
          background: "var(--bv3-shell-deep)",
          border: "1px solid var(--bv3-border-subtle)",
        }}
      >
        <svg
          viewBox="0 0 1000 140"
          className="block w-full"
          preserveAspectRatio="none"
        >
          {/* Baseline */}
          <line
            x1="20"
            y1="80"
            x2="980"
            y2="80"
            stroke="var(--bv3-spine)"
            strokeWidth="1"
            opacity="0.6"
          />
          {/* Section markers + labels */}
          {TIMELINE_SECTIONS.map((s, i) => {
            const x = 20 + s.start * 960;
            const w = (s.end - s.start) * 960;
            return (
              <g key={`sec-${i}`}>
                {/* Section bracket */}
                <line
                  x1={x}
                  y1="68"
                  x2={x}
                  y2="92"
                  stroke="var(--bv3-gold)"
                  strokeWidth="1.5"
                />
                {/* Section pose label above */}
                <text
                  x={x + w / 2}
                  y="48"
                  fill="var(--bv3-gold)"
                  fontSize="11"
                  fontFamily="var(--font-jetbrains)"
                  textAnchor="middle"
                  letterSpacing="0.08em"
                  style={{ textTransform: "uppercase" }}
                >
                  {s.pose}
                </text>
                {/* Section name below */}
                <text
                  x={x + w / 2}
                  y="115"
                  fill="var(--bv3-cream)"
                  fontSize="12"
                  fontFamily="var(--font-geist-sans)"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {s.label}
                </text>
                {/* Section progress bar */}
                <line
                  x1={x}
                  y1="80"
                  x2={x + w}
                  y2="80"
                  stroke="var(--bv3-cream)"
                  strokeWidth="2.5"
                  opacity="0.85"
                />
              </g>
            );
          })}
          {/* End marker */}
          <line
            x1="980"
            y1="68"
            x2="980"
            y2="92"
            stroke="var(--bv3-gold)"
            strokeWidth="1.5"
          />
          {/* Scale labels — 0 / 1 */}
          <text
            x="20"
            y="135"
            fill="var(--bv3-ink-dim)"
            fontSize="10"
            fontFamily="var(--font-jetbrains)"
          >
            scroll: 0
          </text>
          <text
            x="980"
            y="135"
            fill="var(--bv3-ink-dim)"
            fontSize="10"
            fontFamily="var(--font-jetbrains)"
            textAnchor="end"
          >
            scroll: 1
          </text>
        </svg>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel 3 — The Nox lock history
// ---------------------------------------------------------------------------

function PanelNox() {
  return (
    <div>
      <p
        className="bv3-mono mb-4"
        style={{ color: "var(--bv3-gold)" }}
      >
        III. The Nox
      </p>
      <h3
        className="bv3-display-section mb-6"
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
          color: "var(--bv3-cream)",
        }}
      >
        Seven artifacts, one creature.
      </h3>
      <p
        className="mb-8 text-base leading-relaxed"
        style={{ color: "var(--bv3-ink-muted)", maxWidth: "44rem" }}
      >
        Closed-sculpted segmented worm. Apertures cut into a matte monolith
        shell expose interior worlds: brain, gears, DNA, galaxy, particles.
        Locked across nine generation rounds via Higgsfield Nano Banana Pro.
        Every pose is a real artifact in <span className="bv3-mono">/public/brand-v3/</span>,
        not generated on demand.
      </p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {NOX_LOCK_HISTORY.map((p) => (
          <div
            key={p.src}
            className="rounded-xl p-3"
            style={{
              background: "var(--bv3-shell-deep)",
              border: "1px solid var(--bv3-border-subtle)",
            }}
          >
            <div
              className="relative mb-3 aspect-[3/2] w-full overflow-hidden rounded-md"
              style={{ background: "var(--bv3-cream)" }}
            >
              <Image
                src={p.src}
                alt={`Nox — ${p.label} pose lock artifact`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-contain"
              />
            </div>
            <p
              className="bv3-mono mb-1"
              style={{ color: "var(--bv3-gold)" }}
            >
              {p.date}
            </p>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--bv3-cream)" }}
            >
              {p.label}
            </p>
          </div>
        ))}
      </div>
      <p
        className="mt-8 text-xs leading-relaxed"
        style={{ color: "var(--bv3-ink-dim)" }}
      >
        Built with Open Design + Claude Code (Opus 4.7) + Gemini CLI (Pro) +
        Higgsfield Nano Banana Pro. Source on{" "}
        <a
          href="https://github.com/dailenservices247-cloud/sds-website"
          className="bv3-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BackstageLayer — toggle + overlay
// ---------------------------------------------------------------------------

export function BackstageLayer() {
  const [open, setOpen] = useState(false);

  // Close on Escape
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onKeyDown]);

  return (
    <>
      {/* Toggle — bottom-right, sticky, unobtrusive */}
      <button
        type="button"
        aria-label="Open backstage — see how this was built"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="bv3-mono fixed bottom-6 right-6 z-40 rounded-full px-4 py-2 transition-all"
        style={{
          background: "var(--bv3-shell-deep)",
          color: "var(--bv3-gold)",
          border: "1px solid var(--bv3-border-strong)",
        }}
      >
        {open ? "× close backstage" : "↑ backstage"}
      </button>

      {/* Overlay — dim + panel */}
      {open && (
        <div
          className="fixed inset-0 z-30 flex items-end justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Backstage — how this was built"
        >
          {/* Dim background */}
          <button
            type="button"
            aria-label="Close backstage"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default"
            style={{
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(2px)",
            }}
          />
          {/* Panel slides up from bottom */}
          <div
            className="relative w-full max-w-7xl overflow-y-auto rounded-t-2xl p-8 sm:p-12"
            style={{
              background: "var(--bv3-shell)",
              borderTop: "1px solid var(--bv3-spine)",
              maxHeight: "85vh",
            }}
          >
            <div className="mb-12">
              <p
                className="bv3-mono mb-2"
                style={{ color: "var(--bv3-gold)" }}
              >
                BACKSTAGE — VOL. 03 / ISSUE Nº 01
              </p>
              <h2
                className="bv3-display-section text-balance"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "var(--bv3-cream)",
                  maxWidth: "22ch",
                }}
              >
                How this was built.
              </h2>
            </div>

            <div className="space-y-16">
              <PanelBrand />
              <hr
                style={{
                  border: 0,
                  borderTop: "1px solid var(--bv3-spine)",
                }}
              />
              <PanelMotion />
              <hr
                style={{
                  border: 0,
                  borderTop: "1px solid var(--bv3-spine)",
                }}
              />
              <PanelNox />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
