import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Hammer } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Products — What we build for ourselves",
  description:
    "The full Synapse Dynamics Segmented product universe — what's live, what's in active development, and where the long-term roadmap is heading.",
  openGraph: {
    title: "Products · Synapse Dynamics",
    description:
      "The full Synapse Dynamics Segmented product universe — what's live, what's in active development, and where the long-term roadmap is heading.",
  },
};

type LiveStatus = "live" | "building";

interface LiveCard {
  status: LiveStatus;
  statusLabel: string;
  name: string;
  oneLiner: string;
  body: string[];
  audience: string;
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string; external?: boolean };
  callout?: string;
}

const liveProducts: LiveCard[] = [
  {
    status: "live",
    statusLabel: "Live in production",
    name: "Scrlpets",
    oneLiner:
      "A full-stack pet platform with an AI tool suite, document vault, loyalty program, and real payments. Built end-to-end on React + TypeScript + Supabase + Stripe.",
    body: [
      "Scrlpets is the SDS flagship product. It's a live, working platform — AI Suite, Document Vault, Pack Leader loyalty program, Ecosystem Tree, and the whole production infrastructure.",
      "It's the proof that the same people who run the agency can also ship real products under their own name.",
    ],
    audience:
      "Pet owners who want real tools for taking care of their animals, plus anyone evaluating SDS who wants to see what our work actually looks like in the wild.",
    primary: { label: "See the full case study", href: "/lab/scrlpets" },
    secondary: {
      label: "Visit Scrlpets live",
      href: "https://scrlpets.lovable.app",
      external: true,
    },
  },
  {
    status: "live",
    statusLabel: "Built · Strategist Series",
    name: "SEO Tool",
    oneLiner:
      "An SEO analysis and recommendation tool we built for our own Strategist work, then realized was good enough to offer to clients.",
    body: [
      "This started as an internal tool for SDS Strategist engagements. We needed something that actually worked for small-business SEO audits — not another bloated enterprise platform. So we built one. It handles the parts of SEO analysis that take the longest by hand (keyword mapping, on-page audits, technical health checks) and gives back a plain-English report you can act on.",
      "It's not a standalone SaaS product right now. It's delivered as part of the Strategist Series audit — you get the tool's output baked into your audit deliverable. If you're a fit for a Strategist engagement, you get the tool automatically.",
    ],
    audience:
      "Small businesses getting an SDS Strategist audit. Built specifically for the $100K–$1M revenue range where \"hire an enterprise SEO platform\" isn't an option.",
    primary: {
      label: "See the Strategist Series",
      href: "/services/strategist",
    },
    secondary: { label: "Book a call about an audit", href: "/contact" },
  },
  {
    status: "building",
    statusLabel: "In development · first client forming",
    name: "Restaurant System",
    oneLiner:
      "A full operational platform for independent restaurants. Reservations, inventory, staff, customer data, the works — built on the SDS stack, tuned for the specific chaos of running a restaurant.",
    body: [
      "SDS has a blueprint for a full restaurant operations platform — the kind of system that independent restaurants usually try to assemble out of 7 different SaaS tools that don't talk to each other. Our version puts it all in one place with an AI layer that actually helps instead of adding noise.",
      "We haven't built it yet. What we have is the architecture, the feature spec, and a first client we're actively lining up. The build kicks off as soon as that first engagement is signed.",
    ],
    audience:
      "Independent restaurants (single location or small group) tired of paying for five different tools that all leave gaps. If you run a restaurant and this sounds like a problem you know, you're the person this is being built for.",
    primary: { label: "Be the first client", href: "/contact" },
    secondary: { label: "See the Architect Series", href: "/services/architect" },
    callout:
      "Being the first client on a new SDS platform means you get it built around your actual workflow, at a lower price than the second client will pay, with direct say on what ships first. It's the best deal we'll ever offer on this product.",
  },
];

interface HorizonItem {
  name: string;
  status: string;
  tagline?: string;
  body: string[];
}

const horizon: HorizonItem[] = [
  {
    name: "See Through",
    status: "Horizon — full product vision, ready to build",
    tagline:
      "Nothing touches the cloud. Reflect with clarity. Understand yourself. Gently.",
    body: [
      "A privacy-first, on-device AI self-reflection companion. Think of it as a compassionate digital mirror — a private Thoughts Vault where you can type, speak, or dump what's in your head, and an AI layer that helps you see your own patterns, recurring themes, and contradictions back to yourself. Nothing uploads. Nothing syncs. Everything runs on your device by design.",
      "It is not therapy. It is not a social network. It is not an interpersonal truth engine. It is a quiet, empowering mirror for self-understanding, with built-in safety rails (mood check-ins, session limits, auto-pause and crisis resources if distress shows up) that are non-negotiable by design. Of everything on the Horizon, this is the closest to being buildable today.",
    ],
  },
  {
    name: "Canine Cleansing System",
    status: "Horizon — blueprint with deep formulation complete",
    tagline:
      "Advanced formulation and engineering biomechanics for canine cleaning products.",
    body: [
      "A scientifically rigorous canine grooming product line, built on actual veterinary dermatology instead of \"natural\" marketing fluff. Every ingredient decision traces back to the real physiological differences between canine and human skin — different pH, different epidermal thickness, different ingredient sensitivity — and the entire formulation is designed around those differences rather than just re-labeling human shampoo for dogs.",
      "The system includes a dual-chamber dispensing architecture that keeps the cleansing and conditioning chemistries from interfering with each other, a deodorization system based on molecular chelation and enzymatic breakdown (not fragrance masking), and an all-Toledo, Ohio supply chain that makes formulation iteration and manufacturing practical at small-batch scale. Physical product line. Real ingredient list. Real supply chain. Waiting on the go-to-market trigger, not the science.",
    ],
  },
  {
    name: "Lucid Companion",
    status: "Horizon — research paper / unified architecture concept",
    tagline: "A Glass Box of Emotion. Warm, transparent, and honest about why.",
    body: [
      "A next-generation AI companion architecture built on the thesis that transparency is not the enemy of intimacy — it is the prerequisite for it. Today's AI companions are usually either cold calculators or sycophantic black boxes that encourage delusional dependence. Lucid Companion is the third option: an emotionally grounded AI that is fully transparent about why it responds the way it does.",
      "The architecture has three pillars. The See Through framework handles structural transparency and on-device privacy (and yes, See Through the product above is the standalone expression of that same framework). Heart and Hard Facts grounds the AI's emotional responses in verifiable user-provided data, so \"I'm happy for you\" gets replaced with something like \"based on the goals you set, this is a meaningful positive result.\" And Technosubjunctivity — an imported psychology concept — frames the whole user relationship as a lucid \"as if\" contract, not a delusional one. Research-paper stage. MVP likely starts as a Lucid Therapist or Transparent Tutor.",
    ],
  },
  {
    name: "Sovereign Ledger",
    status: "Horizon — concept / strategy phase",
    body: [
      "A cross-platform universal gaming currency and ledger system. The short version: the place where value earned in one game is actually worth something in another, without locking players into a single walled garden or exposing them to the regulatory mess that most crypto gaming currency hits head-on.",
      "This one is the most nascent on the page. What exists right now is a strategy document and an architectural direction, not a formulation or a prototype. It shows up on the Horizon because it connects directly to the larger SDS ecosystem vision and because we'd rather name the thing publicly than pretend it isn't on the list.",
    ],
  },
  {
    name: "NeoHood",
    status: "Horizon — unified master plan v8.0, needs build-out",
    tagline: "Code name: The Programmable Society",
    body: [
      "The biggest thing on the SDS Horizon. NeoHood is not an app. It's a programmable digital jurisdiction — a sovereign ecosystem that merges a browser-native \"Intent Engine\" (where natural language gets compiled directly into functional logic, game rules, or parametric CAD files) with a Wyoming DUNA legal wrapper, so the outputs actually hold up in the real world.",
      "The master plan has five pillars. A natural-language Cortex that replaces menus with a Neural Bar. A Foundry that turns user intent into CAD files for CNC mills and 3D printers, with the IP minted as sovereign assets. A ForgeRealms open-world game that doubles as the visual runtime and testing ground for the whole engine. A Business District with marketplaces and a creator economy. And a Civics layer with zero-knowledge-proof voting, an uncensorable forum, and user-run infrastructure nodes. The unified stack is Godot 4.3, a custom Sovereign Engine expression parser, n8n + LLM API for the intelligence layer, and an IPFS-backed JSON ledger for persistence.",
      "This is the longest-arc product on the page. It exists as a fully written blueprint (v8.0), and the next real move is choosing which pillar to prototype first. It is on this page because the SDS product family genuinely points in this direction — not because any part of it is shippable this year.",
    ],
  },
];

const threeWaysIn: Array<{ title: string; body: string }> = [
  {
    title: "Use a product.",
    body: "If one of the live products fits a real problem you have — go use it. Scrlpets is free to look at. The SEO Tool comes with a Strategist audit. That's the fastest, cheapest, lowest-friction way to see what SDS work actually feels like.",
  },
  {
    title: "Be an early client on something we're building.",
    body: "The Restaurant System is the current example in active development. If any of the Horizon products hit a problem you personally have and you want to be the first client on that line when it opens — tell us. Early clients on SDS platforms get the product built around their actual workflow, at a price that will never be that low again.",
  },
  {
    title: "Hire us to build something of your own.",
    body: "This is the Architect Series path. You have an idea, a problem, or a market gap that needs a real platform built around it — we build it for you under your brand, using the same stack, the same methodology, and the same discipline that went into the products on this page.",
  },
];

function StatusBadge({
  status,
  label,
}: {
  status: LiveStatus;
  label: string;
}) {
  const isLive = status === "live";
  const Icon = isLive ? CheckCircle2 : Hammer;
  return (
    <span
      className={
        isLive
          ? "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-accent"
          : "inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.15em] text-amber-300"
      }
    >
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

export default function ProductsPage() {
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
            <p className="meta-label">Products</p>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight text-ink-primary md:text-7xl text-balance">
              The stuff we build when we&apos;re building for ourselves.
            </h1>
            <p className="mt-6 text-lg text-ink-muted md:text-2xl text-pretty">
              Synapse Dynamics Segmented isn&apos;t just a consulting shop. We
              build and run our own products too — partly because we think the
              ideas deserve to exist, partly because building for ourselves is
              how we stay sharp for the people who hire us. Here&apos;s
              what&apos;s live, what&apos;s in active development, and where
              the rest of the vision is heading.
            </p>
          </div>
        </Container>
      </section>

      {/* === SECTION 2 — HOW THIS PAGE WORKS === */}
      <section className="section-y border-b border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="meta-label">How this page works</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-primary md:text-3xl text-balance">
                Read this first so the rest of the page makes sense.
              </h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-ink-muted text-pretty md:text-lg">
              <p>
                Every SDS product on this page lives in one of two
                clearly-marked states, and we keep the line between them honest.
              </p>
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6">
                <p className="font-semibold text-ink-primary">
                  Live or In Development.
                </p>
                <p className="mt-2">
                  These get full product cards. They are either running in
                  production right now or actively being built under a real,
                  forming client engagement. If it has a card, you can use it,
                  buy it, or get involved with it today.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6">
                <p className="font-semibold text-ink-primary">The Horizon.</p>
                <p className="mt-2">
                  These are the products SDS is publicly building toward. They
                  are real on paper and real in the long-term roadmap, but they
                  are not shippable yet, not buyable yet, and not being
                  positioned as inventory. They&apos;re on this page because
                  transparency about where we&apos;re heading is part of the
                  brand. They are not here to be sold.
                </p>
              </div>
              <p>
                We don&apos;t list vaporware in the card grid. We don&apos;t
                hide the bigger vision. Those are two different promises, and
                this page keeps both of them.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 3 — LIVE AND IN DEVELOPMENT === */}
      <section className="section-y">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">Live & in development</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              What you can actually touch right now.
            </h2>
          </div>

          <div className="mt-16 space-y-10">
            {liveProducts.map((product) => (
              <article
                key={product.name}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-10"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge
                    status={product.status}
                    label={product.statusLabel}
                  />
                </div>
                <h3 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-4xl">
                  {product.name}
                </h3>
                <p className="mt-3 text-lg text-ink-muted md:text-xl text-pretty">
                  {product.oneLiner}
                </p>

                <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
                  <div className="space-y-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      What it is
                    </p>
                    <div className="space-y-4 text-base leading-relaxed text-ink-muted md:text-lg">
                      {product.body.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      Who it&apos;s for
                    </p>
                    <p className="text-base leading-relaxed text-ink-muted md:text-lg">
                      {product.audience}
                    </p>
                  </div>
                </div>

                {product.callout && (
                  <div className="mt-8 rounded-xl border-l-4 border-accent bg-accent/5 p-5 text-sm leading-relaxed text-ink-muted md:text-base">
                    {product.callout}
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {product.primary.external ? (
                    <a
                      href={product.primary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(34,197,94,0.15)]"
                    >
                      {product.primary.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link
                      href={product.primary.href}
                      className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(34,197,94,0.15)]"
                    >
                      {product.primary.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                  {product.secondary.external ? (
                    <a
                      href={product.secondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
                    >
                      {product.secondary.label}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <Link
                      href={product.secondary.href}
                      className="group inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
                    >
                      {product.secondary.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* === SECTION 4 — THE HORIZON === */}
      <section className="relative section-y border-y border-[color:var(--border-subtle)] bg-bg-surface">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 20%, var(--accent-primary) 0%, transparent 55%), radial-gradient(circle at 70% 80%, var(--accent-primary) 0%, transparent 50%)",
          }}
        />
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">The horizon</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Where the product family is heading.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              <p>
                Everything in this section is on the SDS long-term roadmap.
                They are not cards because they are not ready to be positioned
                as cards. They are on this page because the bigger vision is
                the whole reason SDS exists, and hiding it would be dishonest.
              </p>
              <p>
                Each of these products is designed around the same philosophy
                that runs through everything else we build:{" "}
                <span className="text-ink-primary font-semibold">
                  technology should serve the human, not the other way around.
                </span>{" "}
                Tech-Naturalism. Tools that are invisible when they work and
                sovereign when they don&apos;t. That&apos;s the through-line.
              </p>
              <p>
                None of what follows is available yet. None of what follows has
                a pre-order. If you&apos;re interested in helping build any of
                them as an early client, or you want to follow along as they
                come online, a call is still the best way to start that
                conversation.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
                Listed below from most build-ready to most early.
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-12">
            {horizon.map((item, i) => (
              <article
                key={item.name}
                className="grid gap-6 border-t border-[color:var(--border-subtle)] pt-12 md:grid-cols-[auto_1fr] md:gap-12"
              >
                <p className="font-mono text-5xl font-bold leading-none text-accent/30 md:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-ink-primary md:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {item.status}
                  </p>
                  {item.tagline && (
                    <p className="mt-4 text-lg italic text-ink-primary text-pretty md:text-xl">
                      {item.tagline}
                    </p>
                  )}
                  <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted md:text-lg">
                    {item.body.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 max-w-3xl border-t border-[color:var(--border-subtle)] pt-10">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
              Plus
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">
              SDS has additional tools, workflows, and systems in various
              states of planning and scoping across multiple verticals —
              finance, productivity, creative work, personal sovereignty,
              gaming infrastructure, and a few others. The list above is the
              public-facing horizon as of today. It will grow, and when it
              does, it shows up here.
            </p>
          </div>
        </Container>
      </section>

      {/* === SECTION 5 — WHY WE BUILD OUR OWN PRODUCTS === */}
      <section className="section-y">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="meta-label">Why we build our own</p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink-primary md:text-3xl text-balance">
                The reason this page exists.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-relaxed text-ink-muted md:text-lg">
              <p>
                There&apos;s a specific thing that happens when an agency only
                builds for other people. You get good at explaining what
                clients should do. You get worse at actually doing it yourself.
                The muscles atrophy. Every client engagement starts feeling
                like a consulting memo instead of a build.
              </p>
              <p>
                SDS builds its own products to keep those muscles from
                atrophying. Every product on this page has to survive a real
                user, a real stack, a real failure mode, and a real deadline we
                can&apos;t extend because the client is us. That&apos;s
                different from building a deck and calling it a case study.
              </p>
              <p>
                The other reason is simpler. We build these products because we
                think they should exist. Scrlpets exists because pet owners
                deserve better than what they have. The Restaurant System will
                exist because independent restaurants deserve better than what
                they have. The SEO Tool exists because small businesses deserve
                better than the enterprise SaaS slop they&apos;re usually
                pushed into. Every product in the Horizon section is on that
                same list — things we believe should exist, that we intend to
                build, on a timeline that respects how hard it actually is to
                ship real software.
              </p>
              <p className="text-ink-primary">
                If any of that sounds like something you want to be around,
                there are three ways to do it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 6 — THREE WAYS IN === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">Three ways in</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Pick the path that fits.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {threeWaysIn.map((way, i) => (
              <article
                key={way.title}
                className="flex flex-col rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6 md:p-8"
              >
                <p className="font-mono text-3xl font-bold leading-none text-accent/30">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-xl font-semibold text-ink-primary md:text-2xl">
                  {way.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {way.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        heading="The two paths that matter."
        subheading="Book a call about your project, or go see Scrlpets in the wild."
        primaryLabel="Book a call about your project"
        primaryHref="/contact"
        secondaryLabel="See Scrlpets live"
        secondaryHref="/lab/scrlpets"
      />
    </>
  );
}
