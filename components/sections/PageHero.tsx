import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "left",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] pt-24 pb-20 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(34,197,94,0.08) 0%, transparent 55%)",
        }}
      />
      <Container>
        <div
          className={cn(
            "max-w-3xl",
            align === "center" && "mx-auto text-center"
          )}
        >
          {eyebrow && <p className="meta-label">{eyebrow}</p>}
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-primary md:text-6xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
              {description}
            </p>
          )}
          {children && <div className="mt-10">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
