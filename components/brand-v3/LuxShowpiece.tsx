// components/brand-v3/LuxShowpiece.tsx
// The Lux stage, two presentations (Dailen 2026-07-09, option 2 —
// Ferdy-style hero):
//
//   variant="heroBg"  (lg+)  — full-bleed video BACKGROUND of the hero
//     section. Lux's action lives in the right two-thirds of the frame;
//     a left-heavy scrim keeps the overlaid headline readable. Plays
//     once, holds the final coil, wordmark rises above the coil and
//     persists.
//   variant="inline"  (<lg)  — in-flow block inside the hero: plays,
//     settles, wordmark rises, stays.
//
// Video: public/brand-v3/lux-hero.mp4 (watermarked placeholder — swap
// the file for the clean regen; no code change).
"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Nox } from "./Nox";

const SRC = "/brand-v3/lux-hero.mp4";

function useSettled(reduce: boolean | null) {
  const [settled, setSettled] = useState(false);
  const [still, setStill] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (reduce) {
      setStill(true);
      setSettled(true);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
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

  return { settled, still, videoRef };
}

function Wordmark({ settled }: { settled: boolean }) {
  return (
    <div
      className="bv3-display z-10 text-center transition-all duration-700 ease-out"
      style={{
        opacity: settled ? 1 : 0,
        transform: settled ? "translateY(0)" : "translateY(14px)",
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
  );
}

export function LuxShowpiece({
  variant = "inline",
}: {
  variant?: "heroBg" | "inline";
}) {
  const reduce = useReducedMotion();
  const { settled, still, videoRef } = useSettled(reduce);

  if (variant === "heroBg") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      >
        {still ? (
          <div
            className="absolute inset-0"
            style={{
              background: `var(--bv3-shell) url(/brand-v3/nox-pose-RESTING-LOCKED.png) right 12% bottom 8% / 42% no-repeat`,
            }}
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "72% center" }}
            muted
            playsInline
            preload="auto"
            src={SRC}
          />
        )}
        {/* Left-heavy scrim so the headline reads over the footage
            (the Ferdy lesson), plus a soft floor fade into the page. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(58,59,61,0.96) 0%, rgba(58,59,61,0.86) 30%, rgba(58,59,61,0.5) 52%, rgba(58,59,61,0.12) 74%, rgba(58,59,61,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            background:
              "linear-gradient(to top, var(--bv3-shell), transparent)",
          }}
        />
        {/* Wordmark above the lower-right coil */}
        <div className="absolute bottom-[38%] right-[6%] w-[30%]">
          <div style={{ fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)" }}>
            <Wordmark settled={settled} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-auto w-full max-w-md pt-16 lg:hidden"
    >
      <div
        className="absolute left-1/2 top-[6%] z-10 w-full -translate-x-1/2"
        style={{ fontSize: "clamp(1.3rem, 5vw, 1.8rem)" }}
      >
        <Wordmark settled={settled} />
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
          muted
          playsInline
          preload="auto"
          src={SRC}
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
