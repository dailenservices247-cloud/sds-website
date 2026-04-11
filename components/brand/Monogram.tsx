import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  size?: number;
  /** Background color behind segment rings — defaults to bg-primary */
  ringColor?: string;
}

/**
 * Mono-S Coil — the square-context version of the SDS mark.
 * Used for favicons, avatars, app icons, any 1:1 placement.
 * Features segment rings that the wordmark-S strips out.
 */
export function Monogram({
  className,
  size = 80,
  ringColor = "var(--bg-primary)",
}: MonogramProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Synapse Dynamics monogram"
      className={cn("inline-block flex-shrink-0", className)}
    >
      <path
        d="M 60 18 Q 60 10, 48 10 L 32 10 Q 20 10, 20 22 Q 20 34, 32 34 L 48 34 Q 60 34, 60 46 Q 60 58, 48 58 L 32 58 Q 20 58, 20 70"
        fill="none"
        stroke="var(--accent-primary)"
        strokeWidth={13}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Segment rings */}
      <line x1={32} y1={4} x2={32} y2={16} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={4} x2={44} y2={16} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={32} y1={28} x2={32} y2={40} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={28} x2={44} y2={40} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={32} y1={52} x2={32} y2={64} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
      <line x1={44} y1={52} x2={44} y2={64} stroke={ringColor} strokeWidth={1.75} strokeLinecap="round" />
    </svg>
  );
}
