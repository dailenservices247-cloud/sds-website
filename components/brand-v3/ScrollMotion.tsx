// components/brand-v3/ScrollMotion.tsx
//
// Immersive-Garden-style scroll-orchestrated motion primitives, GSAP-driven.
//
// Three reusable building blocks:
//   1. <ScrubReveal>     — clip-path inset mask grows from scroll progress
//   2. <ScrubWords>      — display headline split into words, each fades in
//                           with y-shift as scroll position scrubs through it
//   3. <ParallaxLayer>   — child translates/scales tied to scroll progress
//
// Plus <PinnedScene> for hero-style pinned sections where content unfolds in
// place across multiple scroll positions before page advances.
//
// All primitives:
//   - Honor prefers-reduced-motion (render static end-state when set)
//   - Use Lenis-friendly GSAP ScrollTrigger via @gsap/react useGSAP hook
//   - Clean up GSAP instances on unmount to prevent memory leaks
//
// Refs:
//   shape brief: docs/shape/v1-immersive-garden-shape.md
//   awa-v3-immersive-garden-spec.md (cinematic motion mandate)

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef, type ReactNode, type CSSProperties } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ---------------------------------------------------------------------------
// <ScrubReveal>
// Clip-path inset mask that grows from `clipFrom` to `clipTo` as the section
// scrubs through the viewport. Default = grow from a tight center inset to
// full reveal. Use for portfolio cards, image plates, panel reveals.
// ---------------------------------------------------------------------------

interface ScrubRevealProps {
  children: ReactNode;
  className?: string;
  /** Start clip-path inset state. Default: 30% inset all sides + 16px radius. */
  clipFrom?: string;
  /** End clip-path inset state. Default: 0% inset, no radius. */
  clipTo?: string;
  /** Y-shift in px from start to end. Default: 60. */
  yFrom?: number;
  /** Scroll trigger range — defaults scrub through section enter to center. */
  start?: string;
  end?: string;
  /** Optional scale tween from start scale to 1. Default: 0.96. */
  scaleFrom?: number;
  style?: CSSProperties;
}

export function ScrubReveal({
  children,
  className,
  clipFrom = "inset(20% 12% 20% 12% round 16px)",
  clipTo = "inset(0% 0% 0% 0% round 0px)",
  yFrom = 60,
  scaleFrom = 0.96,
  start = "top 85%",
  end = "top 35%",
  style,
}: ScrubRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(ref.current, {
          clipPath: clipTo,
          y: 0,
          scale: 1,
          opacity: 1,
        });
        return;
      }

      gsap.fromTo(
        ref.current,
        {
          clipPath: clipFrom,
          y: yFrom,
          scale: scaleFrom,
          opacity: 0.4,
        },
        {
          clipPath: clipTo,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={{ willChange: "transform, opacity, clip-path", ...style }}>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// <ScrubWords>
// Splits the given text into words (each wrapped in <span>) and reveals them
// one-by-one with stagger as the section scrubs through.
// ---------------------------------------------------------------------------

interface ScrubWordsProps {
  text: string;
  className?: string;
  /** ScrollTrigger start/end — defaults scrub through section enter to center. */
  start?: string;
  end?: string;
  /** Y-shift in px per word from start to end. Default: 24. */
  yFrom?: number;
  style?: CSSProperties;
  /** Custom rendering of each word. Returns a JSX element. */
  emphasis?: (word: string, index: number) => ReactNode;
  /** Element type to render. Default: "div". Use "h1" / "h2" / "h3" / "p". */
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Optional ARIA label override (defaults to the full text). */
  ariaLabel?: string;
}

export function ScrubWords({
  text,
  className,
  start = "top 85%",
  end = "top 40%",
  yFrom = 24,
  style,
  emphasis,
  as = "div",
  ariaLabel,
}: ScrubWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/(\s+)/); // preserve spaces

  useGSAP(
    () => {
      if (!ref.current) return;

      const wordEls = ref.current.querySelectorAll("[data-word]");
      if (wordEls.length === 0) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(wordEls, { y: 0, opacity: 1 });
        return;
      }

      gsap.fromTo(
        wordEls,
        { y: yFrom, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: 0.6,
          },
        },
      );
    },
    { scope: ref },
  );

  // Word spans rendered as children
  const wordSpans = words.map((w, i) => {
    if (/^\s+$/.test(w)) {
      return <span key={`s-${i}`}>{w}</span>;
    }
    const inner = emphasis ? emphasis(w, i) : w;
    return (
      <span
        key={`w-${i}`}
        data-word
        style={{
          display: "inline-block",
          willChange: "transform, opacity",
        }}
      >
        {inner}
      </span>
    );
  });

  // Render as the requested element. Polymorphic component patterns with
  // refs in TS are gnarly; we cast to a permissive type to keep the ergonomics
  // simple. Caller-supplied `as` is constrained to known tags so this is safe.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      className={className}
      style={style}
      aria-label={ariaLabel ?? text}
    >
      {wordSpans}
    </Tag>
  );
}

// ---------------------------------------------------------------------------
// <ParallaxLayer>
// Child translates and optionally scales tied to scroll progress through
// section. Use for background elements, supporting media, accent shapes.
// ---------------------------------------------------------------------------

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Total Y travel in viewport % across the entire scroll range. Default: 20. */
  yPercent?: number;
  /** Scale tween from start scale to 1 + scaleAmount. Default: 0 (no scale). */
  scaleAmount?: number;
  /** Scroll trigger range. Default: full section travel. */
  start?: string;
  end?: string;
}

export function ParallaxLayer({
  children,
  className,
  style,
  yPercent = 20,
  scaleAmount = 0,
  start = "top bottom",
  end = "bottom top",
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(ref.current, { y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        ref.current,
        { yPercent: -yPercent / 2, scale: 1 - scaleAmount / 2 },
        {
          yPercent: yPercent / 2,
          scale: 1 + scaleAmount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start,
            end,
            scrub: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// <PinnedScene>
// Pins a section in place while inner scroll progresses. Use to hold the
// hero on screen while text/images animate through their states.
//
// Note: GSAP pinning takes the section out of normal document flow during
// the pinned range. Wrap content carefully; the parent must not have
// overflow:hidden.
// ---------------------------------------------------------------------------

interface PinnedSceneProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** How far past the section's natural end the pin holds. Default: "+=100%" = 1 viewport extra. */
  pinDistance?: string;
}

export function PinnedScene({
  children,
  className,
  style,
  pinDistance = "+=80%",
}: PinnedSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const trigger = ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: pinDistance,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
