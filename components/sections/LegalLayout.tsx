import { Container } from "@/components/layout/Container";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}

export function LegalLayout({
  eyebrow,
  title,
  effectiveDate,
  children,
}: LegalLayoutProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] pt-24 pb-16 md:pt-32 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(34,197,94,0.06) 0%, transparent 55%)",
          }}
        />
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink-primary md:text-6xl text-balance">
              {title}
            </h1>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
              Effective {effectiveDate}
            </p>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <div className="prose-legal max-w-3xl">{children}</div>
        </Container>
      </section>
    </>
  );
}
