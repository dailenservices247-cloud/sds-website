// components/brand-v3/LuxShowpiece.tsx
// The Lux stage (Dailen spec 2026-07-09): the sneaky-dig plays ONCE,
// Lux settles into his coil, the wordmark rises above him, and both
// persist for the rest of the visit.
//
// Desktop (lg+): fixed to the viewport's bottom-right — the "right
// panel" that stays put while the page content scrolls past it.
// Mobile (<lg): in-flow inside the hero — plays, settles, stays in
// the hero as you scroll on.
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
  const [still, setStill] = useState(false); // reduced-motion or autoplay-blocked
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduce) {
      setStill(true);
      setSettled(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;

    // Some browsers block autoplay even muted (e.g. Low Power Mode).
    // If play() rejects, skip straight to the settled still — Lux must
    // never be invisible.
    const p = v.play();
    if (p) {
      p.catch(() => {
        setStill(true);
        setSettled(true);
      });
    }

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
      className="pointer-events-none relative mx-auto w-full max-w-md pt-16 lg:fixed lg:bottom-[42px] lg:right-0 lg:z-20 lg:mx-0 lg:w-[min(44vw,780px)] lg:max-w-none lg:pt-0"
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

      {still ? (
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
