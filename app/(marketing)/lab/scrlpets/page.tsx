import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Scrlpets — Lab Project",
  description:
    "A full-stack social marketplace for animal breeders. Built in-house at Synapse Dynamics. Live in pre-beta.",
  openGraph: {
    title: "Scrlpets — Lab Project · Synapse Dynamics",
    description:
      "A full-stack social marketplace for animal breeders. Built in-house at Synapse Dynamics. Live in pre-beta.",
  },
};

const scopeStats: Array<{ label: string; value: string }> = [
  { label: "Source files", value: "605" },
  { label: "Routes", value: "60+" },
  { label: "Custom React hooks", value: "85+" },
  { label: "Postgres tables", value: "131" },
  { label: "SQL migrations", value: "108" },
  { label: "Supabase edge functions", value: "34" },
  { label: "Integrated AI tools", value: "21" },
  { label: "Species supported", value: "9" },
  { label: "Subscription tiers", value: "5" },
  { label: "Build phases shipped", value: "5" },
  { label: "Team size", value: "1" },
];

const stackGroups: Array<{ label: string; items: string }> = [
  {
    label: "Frontend",
    items:
      "React 18 · TypeScript · Vite 5 · Tailwind CSS · shadcn/ui · TanStack Query · TanStack Virtual",
  },
  {
    label: "Backend",
    items:
      "Supabase · Postgres · Row-Level Security · Edge functions in Deno/TypeScript",
  },
  {
    label: "Payments",
    items: "Stripe Connect — escrow, subscriptions, marketplace payouts",
  },
  {
    label: "AI",
    items:
      "Lovable AI Gateway (Gemini 2.5 Flash) across 21 tools · OpenAI Whisper for voice-to-listing",
  },
  { label: "Maps", items: "Mapbox GL JS v3" },
  {
    label: "Delivery",
    items: "PWA with service worker, offline support, and push notifications",
  },
];

const interestingBuilds: Array<{ title: string; body: string }> = [
  {
    title: "Virtualized feed from launch, not as an optimization.",
    body: "A TikTok-style feed that scrolls through thousands of listings can't be built the naive way and patched later. TanStack Virtual was in the architecture from commit one, so the feed only renders what's on screen regardless of how many rows the database has. The perf budget is stable as the product grows.",
  },
  {
    title: "Manual vendor chunking to stop React dispatch corruption.",
    body: "Most Vite projects ship one big vendor chunk and move on. Scrlpets splits vendor code into eight deliberate chunks, because an earlier auto-chunking pass produced a subtle React dispatcher mismatch when two chunks loaded out of order. Fixing it required understanding why the default bundler behavior can break modern React — not just turning knobs until it worked.",
  },
  {
    title: "Checkpoint system with git tags and a checkpoint.sh script.",
    body: "Rolling back an AI-assisted build where a single bad session can touch thirty files isn't something you handle with git reset. Every stable state gets tagged and documented. The cost is two minutes per checkpoint. The savings are measured in days.",
  },
  {
    title: "RLS-first data model.",
    body: "131 tables, all governed by Row-Level Security policies from the start. No 'we'll lock it down before launch.' Security that's retrofitted at the end of a build is security that doesn't exist; security that's designed in from the schema up is the only kind that holds.",
  },
];

export default function ScrlpetsCaseStudyPage() {
  return (
    <>
      {/* === HERO === */}
      <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] pt-24 pb-16 md:pt-32 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(34,197,94,0.08) 0%, transparent 55%)",
          }}
        />
        <Container>
          <div className="max-w-4xl">
            <p className="meta-label">Lab Project</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-ink-primary md:text-7xl text-balance">
              Scrlpets
            </h1>
            <p className="mt-6 text-lg text-ink-muted md:text-2xl text-pretty">
              A full-stack social marketplace for animal breeders. Built
              in-house at SDS. Live in pre-beta.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono font-medium uppercase tracking-[0.15em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Live in pre-beta
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                Architect · Automator
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 1 — WHAT IT IS === */}
      <section className="section-y">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="meta-label">01 — What it is</p>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-ink-muted text-pretty md:text-xl">
              <p>
                Scrlpets is what you&apos;d get if Instagram, Shopify, and a
                professional breeder management tool were built as a single
                product instead of duct-taped together from five different
                subscriptions.
              </p>
              <p>
                It&apos;s a social feed where breeders post their animals, a
                marketplace where verified buyers can inquire and purchase, a
                DM system with real-time chat, a trust layer that surfaces
                credibility signals, a dashboard where breeders run the
                operational side of their business — lineage, health records,
                contracts, payouts — and a set of AI tools that do the work
                that used to eat their evenings.
              </p>
              <p>
                The target user is a hobbyist or professional breeder managing
                1–50 animals, across nine species — dogs, cats, rabbits,
                reptiles, birds, insects, fish, exotics, and the long tail. The
                industry today runs on Facebook groups, spreadsheets, Venmo,
                email, and whatever app someone&apos;s cousin recommended.
                Scrlpets is one login.
              </p>
              <p className="text-ink-primary">
                It&apos;s live at{" "}
                <a
                  href="https://scrlpets.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline"
                >
                  scrlpets.lovable.app
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 2 — THE SCOPE, IN NUMBERS === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">02 — The scope, in numbers</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Most portfolio pieces skip the receipts. We don&apos;t.
            </h2>
          </div>

          {/* Hero screenshot */}
          <figure className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-bg-elevated">
            <Image
              src="/lab/scrlpets-hero.png"
              alt="Scrlpets home feed — a full-stack social marketplace for animal breeders, built in-house at Synapse Dynamics."
              width={2400}
              height={1500}
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-[color:var(--border-subtle)] bg-bg-primary/50 px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
              scrlpets.lovable.app · live pre-beta
            </figcaption>
          </figure>

          {/* Stat grid */}
          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
            {scopeStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-between gap-4 bg-bg-primary p-6"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim">
                  {stat.label}
                </dt>
                <dd className="font-mono text-4xl font-bold tabular-nums text-ink-primary md:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
            These are the numbers because the question a consultancy&apos;s
            portfolio page should answer isn&apos;t{" "}
            <em className="text-ink-primary">&ldquo;is this pretty?&rdquo;</em>{" "}
            — it&apos;s{" "}
            <em className="text-ink-primary">
              &ldquo;can these people actually ship something at production
              scale?&rdquo;
            </em>{" "}
            This is our answer.
          </p>
        </Container>
      </section>

      {/* === SECTION 3 — THE STACK === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">03 — The stack</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Production-grade from day one.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] md:grid-cols-2">
            {stackGroups.map((group) => (
              <div
                key={group.label}
                className="flex flex-col gap-3 bg-bg-surface p-6 md:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {group.label}
                </p>
                <p className="text-base leading-relaxed text-ink-primary md:text-lg">
                  {group.items}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            No client-side database. No ORM the database didn&apos;t ask for.
            No &ldquo;we&apos;ll figure out auth later.&rdquo; RLS is on from
            day one.
          </p>
        </Container>
      </section>

      {/* === SECTION 4 — WHAT WAS INTERESTING === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">04 — What was interesting about building it</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Decisions that mattered.
            </h2>
          </div>

          <div className="mt-16 space-y-10 md:space-y-12">
            {interestingBuilds.map((item, i) => (
              <article
                key={item.title}
                className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <p className="font-mono text-5xl font-bold leading-none text-accent/30 md:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-ink-primary md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* === SECTION 5 — STATUS === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="meta-label">05 — Status</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono font-medium uppercase tracking-[0.15em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                Pre-beta
              </div>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-ink-muted text-pretty md:text-xl">
              <p>
                Scrlpets is in pre-beta. The platform is live, the build is
                passing, and the current work is onboarding email
                infrastructure, analytics instrumentation, and beta cohort
                recruitment for the exotic-breeder segment.
              </p>
              <p>
                There are no paid users yet. There is no MRR to report. When
                those numbers exist, this page will be updated with them — not
                before.
              </p>
              <p className="text-ink-primary">
                We&apos;d rather show you what we built than make up what it
                did.
              </p>

              <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                <a
                  href="https://scrlpets.lovable.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(34,197,94,0.15)]"
                >
                  See it live
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Start a project with SDS
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CTA
        heading="Want something like this for your own problem?"
        subheading="Tell us what you're trying to ship. We'll tell you what it takes."
      />
    </>
  );
}
