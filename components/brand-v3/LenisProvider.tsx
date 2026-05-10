// components/brand-v3/LenisProvider.tsx
// Lenis hijacked smooth-scroll wrapper for brand-v3 routes.
// Tuned per shape brief Q4: lerp 0.08, smoothWheel true, smoothTouch false.
// Honors prefers-reduced-motion: when set, Lenis is disabled (native scroll passes through).
//
// Mount at the root of the (brand-v3) layout so every variant page inherits it.
//
// Refs:
// - https://github.com/darkroomengineering/lenis
// - shape brief: docs/shape/v1-immersive-garden-shape.md

"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

const lenisOptions = {
  // lerp lower = heavier / more cinematic. Default 0.1; brief locks at 0.08.
  lerp: 0.08,
  smoothWheel: true,
  // Hijacking touch scroll feels broken on mobile — let native handle it.
  smoothTouch: false,
  // Custom exponential ease-out — no bounce, no overshoot.
  // Matches DESIGN.md motion register (cubic-bezier ease-out family).
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  duration: 1.2,
};

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // When reduced-motion is set, bypass Lenis entirely — native scroll passes through.
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
