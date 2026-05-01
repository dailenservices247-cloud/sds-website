import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  style?: React.CSSProperties;
  /** "Synapse Dynamics" (default) or just "Synapse" */
  variant?: "full" | "short";
  /**
   * SEGMENTED tag placement:
   *   false  — wordmark only
   *   "inline" — beside the wordmark, separated by a thin rule
   *   "below"  — below the wordmark, smaller
   *   "stacked" — wordmark + Segmented stacked on two lines, both at full prominence
   */
  withTag?: false | "inline" | "below" | "stacked";
}

/**
 * Reusable S-shaped worm letterform (Mono-S Coil) — used inline for the
 * leading "S" in both "Synapse" AND "Segmented" per BRAND.md v2.2 override.
 *
 * Source: same path as components/brand/Monogram.tsx, viewBox cropped tighter
 * for typographic context. Segment rings render at all sizes; at small sizes
 * (<24px) they fade visually but the S shape remains readable.
 */
function CoilS({
  ringColor = "currentColor",
}: {
  ringColor?: string;
}) {
  return (
    <svg
      viewBox="10 0 60 80"
      className="inline-block w-auto flex-shrink-0"
      style={{ height: "0.78em", transform: "translateY(0.05em)" }}
      role="img"
      aria-label="S"
    >
      {/* Coiled S body — same path as the Mono-S Coil monogram */}
      <path
        d="M 60 18 Q 60 10, 48 10 L 32 10 Q 20 10, 20 22 Q 20 34, 32 34 L 48 34 Q 60 34, 60 46 Q 60 58, 48 58 L 32 58 Q 20 58, 20 70"
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Six segment rings cutting perpendicular across the three horizontal bars.
          ringColor matches the parent text color so the segments "punch through"
          the green stroke and read as discrete body segments. */}
      <line x1={32} y1={4}  x2={32} y2={16} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={4}  x2={44} y2={16} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={32} y1={28} x2={32} y2={40} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={28} x2={44} y2={40} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={32} y1={52} x2={32} y2={64} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={52} x2={44} y2={64} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}

/**
 * Primary SDS wordmark. The "S" in BOTH "Synapse" and "Segmented" is the
 * Mono-S Coil (segment-ring worm S) per BRAND.md v2.2 override 2026-04-30.
 *
 * Use `withTag="inline"` for nav/footer (compact) or `withTag="stacked"` for
 * hero placements where Segmented carries equal visual weight.
 */
export function Wordmark({
  className,
  style,
  variant = "full",
  withTag = false,
}: WordmarkProps) {
  const text = variant === "full" ? "ynapse Dynamics" : "ynapse";

  // Stacked = two-line lockup with both wordmark + SEGMENTED at hero scale.
  if (withTag === "stacked") {
    return (
      <span
        className={cn(
          "inline-flex flex-col items-start font-sans font-bold tracking-tight leading-none gap-2",
          className
        )}
        style={style}
      >
        <span className="inline-flex items-baseline">
          <CoilS />
          <span style={{ marginLeft: "0.02em" }}>{text}</span>
        </span>
        <span className="inline-flex items-baseline" style={{ fontSize: "0.42em" }}>
          <CoilS />
          <span style={{ marginLeft: "0.02em", letterSpacing: "0.06em" }}>egmented</span>
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-sans font-bold tracking-tight leading-none",
        withTag === "inline" && "gap-3",
        className
      )}
      style={style}
    >
      <span className="inline-flex items-baseline">
        <CoilS />
        <span style={{ marginLeft: "0.02em" }}>{text}</span>
      </span>

      {withTag === "inline" && (
        <span className="hidden sm:inline-flex items-baseline">
          <span
            aria-hidden
            className="self-center mr-3 h-[0.6em] w-px bg-[color:var(--border-subtle)]"
          />
          <span
            className="inline-flex items-baseline"
            style={{ fontSize: "0.5em", letterSpacing: "0.06em" }}
          >
            <CoilS />
            <span style={{ marginLeft: "0.02em" }}>egmented</span>
          </span>
        </span>
      )}

      {withTag === "below" && (
        <span
          className="ml-2 self-end inline-flex items-baseline"
          style={{ fontSize: "0.42em", letterSpacing: "0.06em" }}
        >
          <CoilS />
          <span style={{ marginLeft: "0.02em" }}>egmented</span>
        </span>
      )}
    </span>
  );
}
