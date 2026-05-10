// components/brand-v3/ScrollProgressBridge.tsx
// Bridges document scroll progress (0..1) to a CSS custom property
// `--bv3-scroll-progress` on document.documentElement.
//
// SceneEnvironment.tsx reads this CSS var inside R3F's useFrame loop to drive
// the camera dolly without React state churn (avoids re-renders on every
// scroll tick).
//
// Uses GSAP ScrollTrigger so it composes cleanly with Lenis (Lenis updates
// scroll position; ScrollTrigger ticks fire from gsap.ticker which Lenis
// integrates with via a single requestAnimationFrame loop).

"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProgressBridge() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Set static neutral progress so SceneEnvironment renders mid-state
      document.documentElement.style.setProperty("--bv3-scroll-progress", "0.5");
      return;
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        document.documentElement.style.setProperty(
          "--bv3-scroll-progress",
          self.progress.toFixed(4),
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return null;
}
