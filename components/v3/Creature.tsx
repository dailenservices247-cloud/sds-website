// components/v3/Creature.tsx
// Renders one of the 5 brand-creature line-art illustrations at low opacity
// in section backgrounds. Per BRAND.md §6 ("The Creature Constellation"):
//   - Opacity: 8–15% maximum
//   - Stroke: 1–2px thin line, no fill
//   - Color: #22C55E or #94A3A0
//   - Size: max 20% of viewport width
//   - One creature per section, max
//   - Static; very slow parallax allowed (0.3x); no walking/wiggling
//
// Source images: /public/brand/creatures/<slug>.svg (TBD — generated via
// Nano Banana prompts captured in the session log 2026-04-30).
//
// Until the SVGs exist, this component renders NOTHING (returns null) so
// layout works without missing-image errors. Drop in the SVG and uncomment
// the <Image /> below once assets land.

import Image from "next/image";

export type CreatureSlug = "axolotl" | "centipede" | "gecko" | "planaria";

interface CreatureProps {
  slug: CreatureSlug;
  /** Position relative to its section. Default top-right. */
  position?: "top-right" | "top-left" | "mid-right" | "mid-left" | "bottom-right";
  /** Opacity 0.08–0.15 only per brand spec. */
  opacity?: number;
  /** Width as % of viewport. Max 20. */
  widthVw?: number;
  /** Color tint — only "accent" (#22C55E) or "muted" (#94A3A0). */
  tint?: "accent" | "muted";
}

const positionClasses: Record<NonNullable<CreatureProps["position"]>, string> = {
  "top-right":    "top-12 right-6 md:top-16 md:right-12",
  "top-left":     "top-12 left-6 md:top-16 md:left-12",
  "mid-right":    "top-1/3 right-6 md:right-12",
  "mid-left":     "top-1/3 left-6 md:left-12",
  "bottom-right": "bottom-12 right-6 md:bottom-16 md:right-12",
};

export function Creature({
  slug,
  position = "top-right",
  opacity = 0.12,
  widthVw = 18,
  tint = "muted",
}: CreatureProps) {
  // Until SVG sources are generated via Nano Banana, render nothing.
  // To activate: drop /public/brand/creatures/<slug>.svg files and uncomment.
  const ASSETS_READY = false;

  if (!ASSETS_READY) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 ${positionClasses[position]}`}
      style={{
        opacity: Math.min(0.15, Math.max(0.08, opacity)),
        width: `${Math.min(20, widthVw)}vw`,
        maxWidth: "320px",
      }}
    >
      <Image
        src={`/brand/creatures/${slug}.svg`}
        alt=""
        width={320}
        height={320}
        className={tint === "accent" ? "creature-accent" : "creature-muted"}
        unoptimized
      />
    </div>
  );
}
