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
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Cosmos } from "./Cosmos";
import { Helix } from "./Helix";
import { usePathname as usePathnameForPhase } from "next/navigation";

export function Stage() {
  const reducedMotion = useReducedMotion();
  // Locked mobile treatment (Dailen 2026-08-20): the cosmos renders, the creature
  // is a still. A persistent WebGL canvas plus an animated worm is where this class
  // of site degrades worst on touch, so the worm is dropped below md and the DPR is
  // capped — the atmosphere and the brand ground survive at near-zero GPU cost.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (ev: MediaQueryListEvent) => setIsDesktop(ev.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  const animate = isDesktop && !reducedMotion;
  // Stage mounts in the route-group layout so the canvas persists across routes.
  // The wordmark lockup, however, belongs to the HOME hero only — without this gate
  // it renders fixed-position over every route.
  const isHome = usePathname() === "/";

  // Per-route phase offset — the same creature on the same path, caught at a
  // different moment. Deterministic from the pathname so a route always looks
  // like itself.
  const pathForPhase = usePathnameForPhase() ?? "/";
  // HOME IS PHASE ZERO, not a hashed offset. The hash gave "/" a phase of 0.47,
  // which parked the creature at the MIDDLE of its dig path — world x≈1.67,
  // directly on top of the hero copy. The path is deliberately weighted to the
  // right two-thirds precisely so the headline column stays a calm void, and the
  // phase offset was quietly cancelling that.
  //
  // Phase 0 is also the narratively correct start: the home hero is the opening
  // of the descent (he is up and to the right, idle, not yet moving), and every
  // inner route is a later moment of the same journey. Hashing still varies the
  // inner routes — it just no longer overrides the one page whose position is
  // load-bearing.
  const routePhase =
    pathForPhase === "/"
      ? 0
      : (Array.from(pathForPhase).reduce((a, c) => a + c.charCodeAt(0), 0) % 100) /
        100;
  const [scrollProgress, setScrollProgress] = useState(0);
  // Motion-kick intensity 0..1+. Spikes when scroll stops after motion,
  // then exponentially decays to 0 over ~2.5s. The Cosmos shader
  // multiplies its time-based rotation/pulse speeds by (1 + kick),
  // so the galaxy briefly speeds up when scroll halts — a visible
  // "wake up" cue instead of silently transitioning to slow drift.
  const [motionKick, setMotionKick] = useState(0);

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


  return (
    <>
      {/* The hero wordmark that used to live here was REMOVED 2026-08-21.
          It predated the page having a hero of its own: Stage WAS the hero, so
          it carried the SYNAPSE DYNAMICS SEGMENTED lockup. The 2026-08-21
          homepage rewrite gives the page a real <h1>, and the two then competed
          on the first screen — two display-scale headlines plus the Nav
          wordmark, all fighting for the same corner. Stage is background now:
          cosmos and creature, nothing else. The wordmark still ships in the Nav
          and in components/brand/Wordmark.tsx. */}

      {/* Cosmos canvas — fixed full-viewport at z-index 0, rendered
          BEFORE content in DOM order so page content (which uses
          natural z-stacking) paints on top. The cosmos shader self-
          dims the left half (smoothstep 0.35→0.55) so atmosphere
          flows under text without breaking readability. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -1 }}
      >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={isDesktop ? [1, 2] : 1}
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
            scrollProgress={animate ? scrollProgress : 0}
            motionKick={animate ? motionKick : 0}
          />
        </Suspense>

        {/* Helix, travelling. Each route starts him at a different point on the
            same dig path, so every page is a different moment of one journey
            rather than the same loop restarted. */}
        <Suspense fallback={null}>
          <Helix
            scrollProgress={animate ? scrollProgress : 0.18}
            motionKick={animate ? motionKick : 0}
            phase={routePhase}
          />
        </Suspense>
      </Canvas>

      {/* Left-third legibility gradient — but only where it is needed.
          The hero overlays copy on the left, so it needs the scrim. Past the
          hero the content lives in floating panels that carry their own glass,
          and holding this gradient at full strength just greys out the cosmos.
          So it FLOWS OUT with scroll: full at the top, gone by 18%. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(58,59,61,0.78) 0%, rgba(58,59,61,0.52) 20%, rgba(58,59,61,0.20) 42%, rgba(58,59,61,0.04) 64%, rgba(58,59,61,0) 100%)",
          opacity: reducedMotion ? 1 : Math.max(0, 1 - scrollProgress / 0.18),
          transition: "opacity 120ms linear",
        }}
      />

      {/* Inner-route calm scrim. DESIGN.md: "Calm before bold — quiet sections set
          up loud moments. Without quiet, loud doesn't land." The cosmos is the loud
          moment and it belongs to the home hero; on inner routes it drops to
          atmosphere so scanning copy stays the subject. One scrim, no shader change. */}
      <div
        className="absolute inset-0"
        style={{
          background: "var(--bv3-shell)",
          opacity: isHome ? 0 : 0.55,
          transition: "opacity 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        }}
      />
      </div>
    </>
  );
}
