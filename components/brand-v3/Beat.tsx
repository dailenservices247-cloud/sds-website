"use client";

// components/brand-v3/Beat.tsx
//
// The core mechanic of the redesign.
//
// The problem it solves: the previous homepage was eight dense sections
// stacked edge to edge. Content faded IN on scroll and then stayed forever,
// so the page was a continuous wall and the cosmos behind it was never
// visible. Mounting a persistent WebGL canvas behind an opaque page buys
// nothing.
//
// Immersive Garden's actual trick is not the 3D — it is that content is
// EPISODIC. A beat arrives, holds, and leaves. Between beats you see the
// world. That is what "elements flow in and out so you mainly see the
// background" means structurally.
//
// So a Beat maps its own scroll progress to opacity and lift: it rises in as
// it enters the viewport, holds while centred, and sinks out as it leaves.
// Scroll back up and it returns — this is scroll-linked, not a one-shot
// `whileInView` trigger.
//
// Reduced motion: content is fully opaque and static. The page still reads
// top to bottom as ordinary sections; nobody loses content to a preference.

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

interface BeatProps {
  children: ReactNode;
  /** Anchor id for in-page links. */
  id?: string;
  /** Accessible section label. */
  label?: string;
  /**
   * Vertical rhythm. "full" gives the beat a whole viewport of room so the
   * cosmos is genuinely alone between beats; "tight" packs related content.
   */
  space?: "full" | "tight";
  /**
   * Horizontal weight.
   *
   * "narrow" (default) caps the content column and pins it LEFT, leaving the
   * right of the frame clear. That is not a style preference — Helix's dig path
   * (components/brand-v3/nox/Helix.tsx) is deliberately weighted to the right
   * two-thirds so the copy column stays a calm void. A centred full-width beat
   * cancels that and the creature ends up crossing body text.
   *
   * "wide" opts out for multi-column content that genuinely needs the room.
   */
  width?: "narrow" | "wide";
  className?: string;
}

export function Beat({
  children,
  id,
  label,
  space = "full",
  width = "narrow",
  className = "",
}: BeatProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  // "start end" = beat's top hits viewport bottom; "end start" = beat's bottom
  // hits viewport top. So progress runs 0..1 across the beat's entire pass.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Hold the plateau wide (0.3 → 0.7) so content is readable for most of its
  // pass. Only the entry and exit quarters animate.
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [56, 0, 0, -56]);

  // 24vh of breathing room per beat is what lets the cosmos stand alone between
  // them on desktop. On a phone that is ~195px top AND bottom per beat — roughly
  // 2,300px of empty gradient across the page — for a payoff that is much weaker
  // there, since the creature is static below md. Full rhythm from md up only.
  const padding = space === "full" ? "py-20 md:py-[24vh]" : "py-16 md:py-24";
  // lg:max-w-3xl keeps the right of the frame clear for the creature on wide
  // screens; below lg there is no room to spare, so content takes the width.
  const column = width === "narrow" ? "lg:max-w-3xl" : "";

  return (
    <section
      ref={ref}
      id={id}
      aria-label={label}
      className={`relative ${padding} ${className}`}
    >
      <motion.div
        style={reduced ? undefined : { opacity, y }}
        className="mx-auto w-full max-w-6xl px-6"
      >
        <div className={column}>{children}</div>
      </motion.div>
    </section>
  );
}
