// components/brand-v3/Nox.tsx
// Renders the Lux mascot (name locked 2026-07-06; working name was Nox —
// file/component names kept for surgical-diff reasons) in one of 7 locked poses.
// Source artifacts: AI Hub/Brand/sds-brand-v3-LOCKED/, mirrored to public/brand-v3/.
// Brief: AI Hub/Brand/sds-brand-v3-mascot-brief.md (status v1 LOCKED 2026-05-08).

import Image from "next/image";
import { brandV3Mascot, type BrandV3Pose } from "@/lib/design/brand-v3-tokens";

export type NoxVariant =
  | "primary"
  | "monogram"
  | "wordmark"
  | BrandV3Pose;

interface NoxProps {
  variant: NoxVariant;
  /** Explicit pixel width — controls intrinsic size. Height computed from aspect ratio. */
  width: number;
  /** Explicit pixel height. */
  height: number;
  /** Optional className for layout. */
  className?: string;
  /** Optional priority hint for above-the-fold. */
  priority?: boolean;
  /** Alt text override; default is auto-generated. */
  alt?: string;
}

const variantSrc: Record<NoxVariant, string> = {
  primary: brandV3Mascot.primary,
  monogram: brandV3Mascot.monogram,
  wordmark: brandV3Mascot.wordmark,
  working: brandV3Mascot.poses.working,
  listening: brandV3Mascot.poses.listening,
  presenting: brandV3Mascot.poses.presenting,
  resting: brandV3Mascot.poses.resting,
};

const variantAlt: Record<NoxVariant, string> = {
  primary: "Lux — Synapse Dynamics mascot, primary glyph posture",
  monogram: "Synapse Dynamics monogram",
  wordmark: "Synapse Dynamics wordmark with Nox mascot",
  working: "Lux — working pose",
  listening: "Lux — listening pose",
  presenting: "Lux — presenting pose",
  resting: "Lux — resting pose",
};

export function Nox({
  variant,
  width,
  height,
  className,
  priority = false,
  alt,
}: NoxProps) {
  return (
    <Image
      src={variantSrc[variant]}
      alt={alt ?? variantAlt[variant]}
      width={width}
      height={height}
      priority={priority}
      className={className}
      // Mascot PNGs are large source files; let Next/Image serve responsive WebP.
      sizes={`${width}px`}
    />
  );
}
