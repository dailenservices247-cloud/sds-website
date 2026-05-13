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
  const lastBoundaryLogRef = useRef(0);

  // Read document scroll progress every frame via rAF. We can't read
  // Lenis directly here without exposing its ref; falling back to raw
  // window.scrollY keeps this component decoupled. Lenis still smooths
  // the scroll under the hood — we just sample the resulting position.
  useEffect(() => {
    if (reducedMotion) return;
    if (typeof window === "undefined") return;
    let raf = 0;
    const tick = () => {
      const docHeight = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const p = Math.min(1, Math.max(0, window.scrollY / docHeight));
      setScrollProgress(p);
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 hidden h-screen w-1/2 md:block"
      style={{ zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        style={{ background: "#3a3b3d" /* brand shell — visible during canvas init */ }}
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
          <Cosmos scrollProgress={reducedMotion ? 0 : scrollProgress} />
        </Suspense>

        <WormPlaceholder
          scrollProgress={reducedMotion ? 0 : scrollProgress}
          onBoundaryHit={handleBoundaryHit}
        />
      </Canvas>
    </div>
  );
}
