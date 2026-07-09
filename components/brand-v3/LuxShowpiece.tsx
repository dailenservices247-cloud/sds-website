// components/brand-v3/LuxShowpiece.tsx
// Persistent right-side Lux stage (Dailen spec 2026-07-09):
// the sneaky-dig plays ONCE on page load, holds its final resting-coil
// frame, then the wordmark rises above the coil — and both stay for the
// remainder of the visit. Fixed to the viewport's bottom-right; content
// scrolls past underneath (pointer-events disabled).
//
// Video file: public/brand-v3/lux-sneaky-dig.mp4 is the WATERMARKED
// placeholder render. Swap the file for the clean regen — no code change.
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Nox } from "./Nox";

export function LuxShowpiece() {
  const reduce = useReducedMotion();
  const [settled, setSettled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reveal the wordmark once playback ends (or immediately under
  // reduced motion). The <video> has no loop attr, so the browser
  // holds the final frame on its own.
  useEffect(() => {
    if (reduce) {
      setSettled(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (v.ended) {
      setSettled(true);
      return;
    }
    const onEnded = () => setSettled(true);
    v.addEventListener("ended", onEnded);
    return () => v.removeEventListener("ended", onEnded);
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 z-20 hidden lg:block"
      style={{ width: "min(44vw, 780px)", bottom: "42px" }}
    >
      {/* Wordmark — rises above the settled coil */}
      <div
        className="bv3-display absolute left-1/2 top-[6%] z-10 w-full text-center transition-all duration-700 ease-out"
        style={{
          opacity: settled ? 1 : 0,
          transform: settled
            ? "translate(-50%, 0)"
            : "translate(-50%, 14px)",
          fontSize: "clamp(1.3rem, 2.3vw, 2.1rem)",
          lineHeight: 1.05,
          color: "var(--bv3-cream)",
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        SYNAPSE
        <br />
        DYNAMICS
        <br />
        <span style={{ color: "var(--bv3-wine-text)" }}>SEGMENTED</span>
      </div>

      {reduce ? (
        <Nox
          variant="resting"
          width={1000}
          height={671}
          className="block h-auto w-full"
          alt=""
        />
      ) : (
        <video
          ref={videoRef}
          className="block h-auto w-full"
          autoPlay
          muted
          playsInline
          preload="auto"
          src="/brand-v3/lux-sneaky-dig.mp4"
          style={{
            WebkitMaskImage:
              "radial-gradient(115% 115% at 62% 60%, black 50%, transparent 76%)",
            maskImage:
              "radial-gradient(115% 115% at 62% 60%, black 50%, transparent 76%)",
          }}
        />
      )}
    </div>
  );
}
