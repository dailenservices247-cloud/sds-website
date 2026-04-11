import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NodalWorm } from "@/components/brand/NodalWorm";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/lib/content/services";

const processSteps = [
  {
    num: "01",
    title: "Discover",
    body: "We map the problem, the constraints, and the success metric. You leave the first call knowing whether we're a fit.",
  },
  {
    num: "02",
    title: "Design",
    body: "Architecture, flows, contracts. We write what we're building down before we build it — so nothing ships by accident.",
  },
  {
    num: "03",
    title: "Build",
    body: "We ship in increments. You see working software every week, not a 6-week silence and a reveal.",
  },
  {
    num: "04",
    title: "Deploy",
    body: "Production. Monitoring. A runbook. Handoff to your team or a retainer if you want us to keep running it.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36">
        {/* Background Nodal Worm decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-end"
        >
          <div className="translate-x-[15%] opacity-[0.08] md:translate-x-[8%] md:opacity-[0.12]">
            <NodalWorm width={1100} decorative />
          </div>
        </div>
        {/* Subtle top glow */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 -z-10 h-96"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.10) 0%, transparent 70%)",
          }}
        />

        <Container className="relative">
          <div className="max-w-4xl">
            <p className="meta-label">AI agency · Est. 2026</p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-ink-primary md:text-7xl lg:text-8xl text-balance">
              Ship AI that
              <br />
              <span className="text-accent">actually works.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-ink-muted md:text-xl text-pretty">
              Synapse Dynamics is an AI agency building custom apps, automations,
              and strategy for founders who need results, not decks.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-7 py-4 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_5px_rgba(34,197,94,0.15)]"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-subtle)] px-7 py-4 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
              >
                See how we work
              </Link>
            </div>

            <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 border-t border-[color:var(--border-subtle)] pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                  Shipping since
                </p>
                <p className="mt-1 text-xl font-semibold text-ink-primary">2026</p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                  Products live
                </p>
                <p className="mt-1 text-xl font-semibold text-ink-primary">
                  Scrlpets
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                  Service lines
                </p>
                <p className="mt-1 text-xl font-semibold text-ink-primary">Three</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* === THREE SERIES === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="meta-label">Three ways we work</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Architect, Automator, Strategist.
            </h2>
            <p className="mt-5 text-lg text-ink-muted text-pretty">
              Three complementary practices. Pick the one that matches the
              problem — or combine them when the problem is big enough.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-8 transition-all hover:border-accent hover:bg-bg-elevated"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-[color:var(--border-subtle)] bg-bg-primary text-accent transition-colors group-hover:border-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                      {service.numeral}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold text-ink-primary">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-accent">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-base text-ink-muted text-pretty">
                    {service.shortDescription}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-ink-primary transition-colors group-hover:text-accent">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* === HOW WE WORK (PREVIEW) === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="meta-label">How we work</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
                Four steps. No guesswork.
              </h2>
            </div>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              See the full process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li
                key={step.num}
                className="rounded-xl border border-[color:var(--border-subtle)] bg-bg-primary p-6"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {step.num}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-ink-primary">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* === FEATURED WORK === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="meta-label">Featured work</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Product, built in-house, shipped to production.
            </h2>
          </div>

          <Link
            href="/lab/scrlpets"
            className="group mt-16 block overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-bg-surface transition-colors hover:border-accent"
          >
            <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
              {/* Visual slot */}
              <div className="relative order-2 min-h-[280px] overflow-hidden bg-bg-elevated md:order-1 md:min-h-[440px]">
                <Image
                  src="/lab/scrlpets-hero.png"
                  alt="Scrlpets — a full-stack social marketplace for animal breeders."
                  fill
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent"
                />
              </div>

              {/* Content slot */}
              <div className="order-1 flex flex-col justify-center p-8 md:order-2 md:p-12">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono font-medium uppercase tracking-[0.15em] text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    Live in pre-beta
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                    Architect · Automator
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-bold text-ink-primary md:text-4xl">
                  Scrlpets
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted text-pretty">
                  A full-stack social marketplace for animal breeders. 605
                  source files. 131 Postgres tables. 21 integrated AI tools.
                  Built in-house at SDS, live in pre-beta, and the answer to
                  &ldquo;can these people actually ship?&rdquo;
                </p>

                <span className="mt-8 inline-flex items-center gap-2 self-start rounded-md border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-bg-primary">
                  Read the case study
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>
        </Container>
      </section>

      {/* === CTA BAND === */}
      <CTA />
    </>
  );
}
