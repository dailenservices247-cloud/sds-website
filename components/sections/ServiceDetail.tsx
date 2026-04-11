import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "./PageHero";
import { CTA } from "./CTA";
import type { Service } from "@/lib/content/services";

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <>
      <PageHero
        eyebrow={`Series ${service.numeral} · ${service.name}`}
        title={service.tagline}
        description={service.longDescription}
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-bg-surface text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg-primary transition-all hover:bg-accent-bright"
          >
            Start a {service.name.toLowerCase()} project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHero>

      {/* === USE CASES === */}
      <section className="section-y border-b border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="meta-label">What this looks like</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Real problems, real shapes.
            </h2>
            <p className="mt-5 text-lg text-ink-muted text-pretty">
              A few scenarios that sit squarely in the {service.name} practice.
              Your problem probably rhymes with one of them.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {service.useCases.map((useCase, i) => (
              <div
                key={useCase.title}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-8 transition-colors hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted text-pretty">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* === ENGAGEMENT MODELS === */}
      <section className="section-y bg-bg-surface border-b border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="meta-label">How we engage</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Choose the shape that fits.
            </h2>
            <p className="mt-5 text-lg text-ink-muted text-pretty">
              Three engagement models per practice. Every one of them is
              outcome-focused and written into a one-page agreement before work
              starts.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {service.engagementModels.map((model, i) => (
              <div
                key={model.name}
                className="flex flex-col rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-8 transition-colors hover:border-accent"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")} · Model
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink-primary">
                  {model.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {model.description}
                </p>

                <div className="mt-6 border-t border-[color:var(--border-subtle)] pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                    Pricing
                  </p>
                  <p className="mt-1 text-xl font-semibold text-ink-primary">
                    {model.price}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                    Best for
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{model.bestFor}</p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-accent"
                >
                  Inquire
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* === RECENT WORK === */}
      <section className="section-y border-b border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="meta-label">Recent work</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Case studies coming soon.
            </h2>
            <p className="mt-5 text-lg text-ink-muted text-pretty">
              We&apos;re publishing detailed write-ups as each engagement wraps.
              Until then, Scrlpets is the flagship — built, launched, and
              actively iterated in-house.
            </p>
            <Link
              href="/"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              See the Scrlpets case study preview
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {["Scrlpets (Live)", "SEO Tool (In development)", "Restaurant System (Blueprint)", "Childcare System (Blueprint)"].map(
              (item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-bg-surface px-4 py-2 text-xs font-mono uppercase tracking-[0.15em] text-ink-muted"
                >
                  <Check className="h-3 w-3 text-accent" />
                  {item}
                </span>
              )
            )}
          </div>
        </Container>
      </section>

      <CTA
        heading={`Ready for ${service.name}?`}
        subheading="Tell us what you're trying to build. We'll tell you what it'll take — or point you somewhere better if we're not the fit."
      />
    </>
  );
}
