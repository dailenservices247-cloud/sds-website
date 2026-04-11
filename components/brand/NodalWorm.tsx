import { cn } from "@/lib/utils";

interface NodalWormProps {
  className?: string;
  /** Width in pixels. Min 120. */
  width?: number;
  /** Use for background decoration with reduced opacity */
  decorative?: boolean;
}

/**
 * The Nodal Worm — primary mark. Nine tapering green circles along a
 * subtle S-curve spine. Reads as: worm, data pipeline, lineage tree,
 * segmented architecture. All four are valid — that's the point.
 *
 * Reserved for hero sections, pitch title slides, large-format contexts.
 * In most places the Wordmark alone is sufficient.
 */
export function NodalWorm({
  className,
  width = 320,
  decorative = false,
}: NodalWormProps) {
  return (
    <svg
      viewBox="0 0 320 80"
      width={width}
      height={width / 4}
      xmlns="http://www.w3.org/2000/svg"
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : "Synapse Dynamics — Nodal Worm primary mark"}
      aria-hidden={decorative || undefined}
      className={cn("inline-block flex-shrink-0", className)}
    >
      <path
        d="M 16 40 Q 34 20, 52 28 T 92 22 T 136 28 T 180 44 T 220 56 T 255 52 T 283 44 T 305 40"
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeOpacity={0.55}
      />
      <circle cx={16} cy={40} r={14} fill="var(--accent-primary)" />
      <circle cx={52} cy={28} r={12} fill="var(--accent-primary)" />
      <circle cx={92} cy={22} r={11} fill="var(--accent-primary)" />
      <circle cx={136} cy={28} r={10} fill="var(--accent-primary)" />
      <circle cx={180} cy={44} r={9} fill="var(--accent-primary)" />
      <circle cx={220} cy={56} r={8} fill="var(--accent-primary)" />
      <circle cx={255} cy={52} r={6.5} fill="var(--accent-primary)" />
      <circle cx={283} cy={44} r={4.75} fill="var(--accent-primary)" />
      <circle cx={305} cy={40} r={3} fill="var(--accent-primary)" />
    </svg>
  );
}
