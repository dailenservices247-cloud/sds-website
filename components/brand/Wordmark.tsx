import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** "Synapse Dynamics" (default) or just "Synapse" */
  variant?: "full" | "short";
  /** Optional SEGMENTED tag below or to the right */
  withTag?: false | "below" | "inline";
}

/**
 * Primary SDS wordmark. The "S" in "Synapse" is the worm-S letterform
 * rendered inline in accent green. In most contexts, this is the entire
 * logo — no Nodal Worm companion required.
 *
 * Usage: nav, footer, business cards, email sig, hero title.
 */
export function Wordmark({
  className,
  variant = "full",
  withTag = false,
}: WordmarkProps) {
  const text = variant === "full" ? "ynapse Dynamics" : "ynapse";

  return (
    <span
      className={cn(
        "inline-flex items-baseline font-sans font-bold tracking-tight leading-none",
        withTag === "inline" && "gap-3",
        className
      )}
    >
      <span className="inline-flex items-baseline">
        <svg
          viewBox="0 0 60 100"
          className="inline-block w-auto flex-shrink-0"
          style={{ height: "0.78em", transform: "translateY(0.05em)" }}
          role="img"
          aria-label="S"
        >
          <path
            d="M 52 20 C 52 4, 8 4, 8 30 C 8 50, 52 50, 52 70 C 52 96, 8 96, 8 80"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth={14}
            strokeLinecap="round"
          />
        </svg>
        <span style={{ marginLeft: "0.02em" }}>{text}</span>
      </span>
      {withTag === "inline" && (
        <span className="hidden sm:inline-flex items-center">
          <span
            aria-hidden
            className="mr-3 h-[0.6em] w-px bg-[color:var(--border-subtle)]"
          />
          <span className="font-mono text-[0.5em] font-medium uppercase tracking-[0.18em] text-accent">
            Segmented
          </span>
        </span>
      )}
      {withTag === "below" && (
        <span className="ml-2 self-end font-mono text-[0.42em] font-medium uppercase tracking-[0.18em] text-accent">
          Segmented
        </span>
      )}
    </span>
  );
}
