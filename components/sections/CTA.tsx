import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";

interface CTAProps {
  heading?: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CTA({
  heading = "Ready to build something?",
  subheading = "Tell us what you're trying to ship. We'll tell you what it takes.",
  primaryLabel = "Start a project",
  primaryHref = "/contact",
  secondaryLabel = "See how we work",
  secondaryHref = "/services",
}: CTAProps) {
  return (
    <section className="relative overflow-hidden border-y border-[color:var(--border-subtle)] bg-bg-surface section-y">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, var(--accent-primary) 0%, transparent 60%), radial-gradient(circle at 80% 50%, var(--accent-primary) 0%, transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="bv3-mono">Start a project</p>
          <h2
            className="bv3-display-section text-ink-primary mt-4 text-balance"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)" }}
          >
            {heading}
          </h2>
          <p className="mt-5 text-lg text-ink-muted md:text-xl">{subheading}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-contrast transition-colors hover:bg-accent-bright"
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent-ink"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
