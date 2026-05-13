// components/brand-v3/nox/Stage.tsx
//
// The right-column R3F Canvas. Sticky on desktop (position: sticky, top:
// 0, height: 100vh) so the cosmos + worm stay locked to the viewport
// while the left column's editorial content scrolls past.
//
// Reads document scroll progress (0..1) and passes it into the worm
// component for Y descent + the cosmos shader for nebula parallax.
//
// Honors prefers-reduced-motion: renders a static frame with no
// animation, no scroll-driven uniforms, no mouse follow. The worm sits
// in its idle hero position; cosmos shader still renders but with a
// frozen sample point.
//
// Hidden on mobile (single-column stack) — desktop-first cinematic per
// brand brief.

"use client";

import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
import { Cosmos } from "./Cosmos";
import { WormPlaceholder } from "./WormPlaceholder";

export function Stage() {
  const reducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);
  // Motion-kick intensity 0..1+. Spikes when scroll stops after motion,
  // then exponentially decays to 0 over ~2.5s. The Cosmos shader
  // multiplies its time-based rotation/pulse speeds by (1 + kick),
  // so the galaxy briefly speeds up when scroll halts — a visible
  // "wake up" cue instead of silently transitioning to slow drift.
  const [motionKick, setMotionKick] = useState(0);
  const lastBoundaryLogRef = useRef(0);

  // Read scroll position + velocity every rAF. When scroll velocity
  // crosses from active (>threshold) to halted (≈0), fire a kick.
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;
    let raf = 0;
    let lastScrollY = window.scrollY;
    let lastT = performance.now();
    let wasScrolling = false;
    let kickValue = 0;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(0.001, (now - lastT) / 1000);
      const cur = window.scrollY;
      const velocity = Math.abs((cur - lastScrollY) / dt);

      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const p = Math.min(1, Math.max(0, cur / docHeight));
      setScrollProgress(p);

      // Detect scroll-stop transition
      const isScrolling = velocity > 8;  // px/sec threshold
      if (wasScrolling && !isScrolling) {
        // Just stopped → trigger a kick
        kickValue = 1.6;
      }
      wasScrolling = isScrolling;

      // Decay kick toward 0
      kickValue *= Math.pow(0.5, dt * 0.45);  // half-life ~1.5s
      if (kickValue < 0.005) kickValue = 0;
      setMotionKick(kickValue);

      lastScrollY = cur;
      lastT = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const handleBoundaryHit = () => {
    // Phase 2 will wire this to the state machine. For now we just log
    // (throttled inside the worm component so the spam is bounded).
    const now = performance.now();
    if (now - lastBoundaryLogRef.current > 2000) {
      lastBoundaryLogRef.current = now;
      // eslint-disable-next-line no-console
      console.log("[nox] boundary hit — Phase 2 will trigger personality moment");
    }
  };

  // Hero wordmark fade — visible at scroll=0, fully gone by 12% scroll.
  // Translates up + fades so the worm has the canvas to itself in dig mode.
  // Bidirectional: scrolling back up brings it back.
  const wordmarkOpacity = reducedMotion
    ? 1
    : Math.max(0, 1 - scrollProgress / 0.12);
  const wordmarkTranslateY = reducedMotion ? 0 : -Math.min(1, scrollProgress / 0.12) * 40;

  return (
    <>
      {/* Wordmark — separate fixed wrapper at z-index 5 so it renders
          ABOVE the cosmos canvas (which is at z-index -1, flowing
          under content). Right-anchored, fades + lifts on scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-[7vh] right-[3vw] hidden text-right md:block"
        style={{
          zIndex: 5,
          opacity: wordmarkOpacity,
          transform: `translateY(${wordmarkTranslateY}px)`,
          transition: "opacity 120ms linear",
        }}
      >
        <p
          className="bv3-mono mb-3"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          VOL. 03 / ISSUE Nº 01
        </p>
        <h2
          className="bv3-display"
          style={{
            fontSize: "clamp(2.25rem, 4.2vw, 3.8rem)",
            lineHeight: 0.94,
            letterSpacing: "-0.005em",
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          {/* Reverse stagger — SYNAPSE pulled left most, SEGMENTED
              flushes right. The diagonal flares OUT toward the right
              edge going down. Multi-color word emphasis per DESIGN.md
              hero rule: cream / gold / petrol-bright stack. */}
          <span style={{ marginRight: "3ch", color: "var(--bv3-cream)" }}>
            Synapse
          </span>
          <span style={{ marginRight: "1.5ch", color: "var(--bv3-gold)" }}>
            Dynamics
          </span>
          <span style={{ marginRight: "0", color: "var(--bv3-spine-bright)" }}>
            Segmented
          </span>
        </h2>
        <p
          className="bv3-mono mt-4"
          style={{
            color: "var(--bv3-ink-on-shell-muted, #9b9b96)",
            letterSpacing: "0.16em",
          }}
        >
          AI ARCHITECTURE STUDIO
        </p>
      </div>

      {/* Cosmos canvas — fixed full-viewport at z-index 0, rendered
          BEFORE content in DOM order so page content (which uses
          natural z-stacking) paints on top. The cosmos shader self-
          dims the left half (smoothstep 0.35→0.55) so atmosphere
          flows under text without breaking readability. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden md:block"
        style={{ zIndex: -1 }}
      >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#3a3b3d" /* brand shell */ }}
      >
        {/* Soft warm key — Editorial Workshop lighting */}
        <ambientLight intensity={0.55} color="#5a4828" />
        <directionalLight
          position={[4, 4, 6]}
          intensity={1.4}
          color="#f0d27a"
        />
        <directionalLight
          position={[-3, -2, -2]}
          intensity={0.45}
          color="#2a6055"
        />
        <directionalLight
          position={[0, 5, -1]}
          intensity={0.5}
          color="#7e303a"
        />

        <Suspense fallback={null}>
          <Cosmos
            scrollProgress={reducedMotion ? 0 : scrollProgress}
            motionKick={reducedMotion ? 0 : motionKick}
          />
        </Suspense>

        <WormPlaceholder
          scrollProgress={reducedMotion ? 0 : scrollProgress}
          onBoundaryHit={handleBoundaryHit}
        />
      </Canvas>
      </div>
    </>
  );
}
