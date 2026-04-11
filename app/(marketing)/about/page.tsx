import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "About — Dailen Huntley & SDS",
  description:
    "I'm building the AI agency I wish existed when I was trying to figure out what was real. Honest backstory, honest beliefs, honest capabilities.",
  openGraph: {
    title: "About — Synapse Dynamics Segmented",
    description:
      "I'm building the AI agency I wish existed when I was trying to figure out what was real.",
    images: [
      {
        url: "/about/dailen-og.jpg",
        width: 1200,
        height: 630,
        alt: "Dailen Huntley, founder of Synapse Dynamics Segmented.",
      },
    ],
  },
};

const beliefs: Array<{ n: string; title: string; body: string }> = [
  {
    n: "01",
    title: "AI is not magic. It's leverage.",
    body: "It takes a clear problem and makes the solution cheaper, faster, or more consistent. It does not invent strategy. It does not replace judgment. It does not care about your business. You have to bring the thinking. We help translate the thinking into systems.",
  },
  {
    n: "02",
    title: "The tools got good faster than the playbooks.",
    body: "Right now there's a 12-to-18-month gap between what's technically possible and what most agencies know how to ship. That gap is where we operate. Not because we're smarter — because we're paying attention and shipping weekly on our own stuff.",
  },
  {
    n: "03",
    title: "Most small businesses don't need \u201CAI.\u201D",
    body: "They need their quoting process to stop taking four hours. They need their follow-ups to not fall through the cracks. They need a system that doesn't break every time someone goes on vacation. AI is how we solve those things faster than we used to — but the job is solving the problem, not using the tool.",
  },
  {
    n: "04",
    title: "Honesty scales better than hype.",
    body: "The agencies that survive the next five years are the ones clients trust to tell them when not to build something. That's a positioning choice we made early and we're not walking it back.",
  },
  {
    n: "05",
    title: "You should own what you pay for.",
    body: "Code, data, docs, accounts, systems — all of it. No hostage code. No \u201Cproprietary layer\u201D that gates you out of your own business. If we did our job right, you should be able to fire us and keep everything we built for you working.",
  },
  {
    n: "06",
    title: "Technology should serve the human, not the other way around.",
    body: "I call this Tech-Naturalism — the belief that the best technology is the kind that disappears into your life instead of demanding more of it. Every system we build for a client is supposed to give the client's team time back, not more tabs to manage. If a tool creates more friction than it removes, we rebuild it until it doesn't.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* === SECTION 1 — HERO === */}
      <section className="relative overflow-hidden border-b border-[color:var(--border-subtle)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(34,197,94,0.08) 0%, transparent 55%)",
          }}
        />
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
            {/* Text */}
            <div>
              <p className="meta-label">About</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-ink-primary md:text-6xl text-balance">
                I&apos;m building the AI agency I wish existed when I was
                trying to figure out what was real.
              </h1>
              <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
                Synapse Dynamics Segmented is the place I&apos;d send a friend
                who runs a small business and is tired of being sold AI by
                people who can&apos;t explain it in plain English. Built on
                one rule: tell the truth, charge fairly, build things that
                actually work.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(34,197,94,0.15)]"
                >
                  Book a call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-2 rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
                >
                  See what we do
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Photo */}
            <div className="relative mx-auto w-full max-w-sm md:max-w-none">
              <div className="relative overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-bg-elevated shadow-2xl">
                <Image
                  src="/about/dailen-hero.jpg"
                  alt="Dailen Huntley, founder of Synapse Dynamics Segmented, mid-conversation at a business networking event, holding an iPad and an orange iPhone, Beats headphones around his neck and a book bag on his shoulder, smiling warmly."
                  width={880}
                  height={1205}
                  priority
                  sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 480px"
                  className="h-auto w-full object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 2 — WHO I AM === */}
      <section className="section-y">
        <Container>
          <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-16">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="meta-label">02 — Who I am</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-4xl text-balance">
                I&apos;m Dailen. I run this.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-ink-muted text-pretty md:text-xl">
              <p>
                Before Synapse Dynamics Segmented, I was working a lot of jobs
                at once. I still am.
              </p>
              <p>
                I worked at <strong className="text-ink-primary">Asurion</strong>{" "}
                doing assurance work — helping people get their phones and
                devices repaired or replaced when life broke them. I worked at{" "}
                <strong className="text-ink-primary">uBreakiFix</strong> fixing
                the actual hardware, which is the same company, because Asurion
                owns uBreakiFix. Phones, tablets, game consoles, computers,
                anything with a screen and a broken screen. I was the guy who
                put it back together.
              </p>
              <p>
                I worked at{" "}
                <strong className="text-ink-primary">The Rook Center</strong>{" "}
                taking care of mentally challenged adults — people who needed
                someone to show up, be patient, and treat them with dignity.
                That job taught me more about real problem-solving than any
                tech job I&apos;ve ever had.
              </p>
              <p>
                I was on{" "}
                <strong className="text-ink-primary">Angie&apos;s List</strong>{" "}
                as a handyman, doing side work whenever I had a free hour.
                Drywall, fixtures, installs, repairs. I&apos;m still doing that
                work today. I don&apos;t plan to stop until I don&apos;t have
                to.
              </p>
              <p>
                Right now, while I&apos;m building this agency, I&apos;m also
                delivering packages for Amazon to pay the bills. I&apos;m
                telling you that on the About page because it&apos;s the truth,
                and because small business owners should know that the person
                they&apos;re hiring is someone who still has to work for every
                dollar — not a venture-funded founder playing agency on
                somebody else&apos;s money. I&apos;m building this the same way
                I&apos;d expect you to build yours: with skin in the game.
              </p>

              <h3 className="!mt-12 text-2xl font-bold text-ink-primary">
                The moment AI clicked for me.
              </h3>
              <p>
                I&apos;d always wanted to build an app. I&apos;d always wanted
                to do something in the pet world — I&apos;ve had pets my whole
                life, and I care about them the way some people care about
                their kids. But I didn&apos;t know how to turn either of those
                things into something real.
              </p>
              <p>
                Then I heard about{" "}
                <strong className="text-ink-primary">Replit</strong>.
              </p>
              <p>
                The moment I realized I could sit down and actually build
                software without spending four years getting a computer
                science degree first, something clicked. The two things
                I&apos;d always wanted to do — tech and animals — suddenly had
                a bridge between them. That&apos;s how Scrlpets started.
                That&apos;s how everything on this site started.
              </p>
              <p>
                I&apos;m not a PhD. I&apos;m not a former Google engineer.
                I&apos;m a builder who&apos;s been taking things apart and
                putting them back together since I was a kid — first computers
                and phones, then drywall and fixtures, now software and AI
                systems. That&apos;s the perspective I bring to every client
                engagement: I actually know what it feels like to be the
                person doing the work, because I&apos;m still that person.
              </p>

              <h3 className="!mt-12 text-2xl font-bold text-ink-primary">
                Why I built this.
              </h3>
              <p className="text-2xl text-ink-primary md:text-3xl">
                Nothing made me mad. I just want to help.
              </p>
              <p>
                That&apos;s the whole reason. I watched what AI could do and I
                realized most small business owners were either going to get
                priced out of it or sold something that didn&apos;t work — not
                because anybody was evil, but because the people selling AI
                didn&apos;t know the businesses they were selling to, and the
                businesses buying it didn&apos;t know what they were buying.
              </p>
              <p>
                I knew I could sit in the middle of that and actually help. So
                I did.
              </p>

              <h3 className="!mt-12 text-2xl font-bold text-ink-primary">
                Outside of work.
              </h3>
              <p>
                I&apos;m a father. My daughter is the reason I show up every
                day. Her mom is still in the picture, and we&apos;re raising
                her together. I&apos;m a son, a brother, a friend. I&apos;m
                the guy you call when you need somebody to show up.
              </p>
              <p className="text-ink-primary">
                That&apos;s who I am when the laptop is closed.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 3 — THE NAME === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">03 — Why &ldquo;Synapse Dynamics Segmented&rdquo;</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              The name is a thesis, not a flex.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--border-subtle)] md:grid-cols-3">
            {[
              {
                word: "Synapse",
                body: "because the whole point of this work is connection. Connecting a business to the tool. Connecting a workflow to an outcome. Connecting data to decisions. Not building in isolation. Building the wiring between things that already exist.",
              },
              {
                word: "Dynamics",
                body: "because nothing in a real business is static. The workflows that made sense last year break this year. The tools that worked at $100K revenue break at $1M. We build for movement, not snapshots.",
              },
              {
                word: "Segmented",
                body: "because there is no such thing as \u201CAI for your business.\u201D There are specific, segmented problems that specific, segmented tools can solve. Treating them as one big blob is how you get $30K shelfware. We break things down. We work one segment at a time.",
              },
            ].map((part) => (
              <div key={part.word} className="bg-bg-primary p-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {part.word}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                  {part.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            The name is long on purpose. It&apos;s the philosophy written into
            the URL.
          </p>
        </Container>
      </section>

      {/* === SECTION 4 — BELIEFS === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">04 — What I believe about AI right now</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Here&apos;s what I actually think.
            </h2>
            <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
              Most of what&apos;s sold as &ldquo;AI transformation&rdquo; is
              either overpriced or under-scoped. Both come from the same
              place: people trying to sell something without understanding the
              business they&apos;re selling it to. I want to be the person who
              fixes that gap, not the person who profits from it.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {beliefs.map((b) => (
              <article
                key={b.n}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  Belief {b.n}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink-primary md:text-2xl">
                  {b.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* === SECTION 5 — HOW I WORK === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">05 — How I work with clients</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              Three things you should know before we talk.
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "I'm direct.",
                body: "If I think your idea won't work, I'll tell you that in the first call. If I think you should hire a different kind of help, I'll tell you that too. You're paying me for judgment, not for validation.",
              },
              {
                title: "I pick up the phone.",
                body: "Small business owners are used to agencies that go dark for three weeks and resurface with a vague update. That's not me. If you text me on a Tuesday, you hear back that day. If you book a call, I show up prepared. If something breaks, you're not waiting in a ticket queue behind fifty other clients.",
              },
              {
                title: "I underpromise and overdeliver.",
                body: "I'd rather quote you a 10-hour-a-week savings and deliver 18 than quote 25 and deliver 15. That's why the ROI numbers on the rest of the site are conservative. It's also why the clients who stay, stay.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6 md:p-8"
              >
                <h3 className="text-xl font-bold text-ink-primary md:text-2xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* === SECTION 6 — WHAT I'VE BUILT === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">06 — What I&apos;ve built</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              The receipts.
            </h2>
            <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
              I&apos;m going to be honest about where I&apos;m at, because the
              whole brand is built on honesty. Here&apos;s what exists today:
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <Link
              href="/lab/scrlpets"
              className="group block rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 transition-colors hover:border-accent md:p-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-bold text-ink-primary md:text-2xl">
                  Scrlpets
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-mono font-medium uppercase tracking-[0.15em] text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Live in production
                </span>
              </div>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                A social marketplace and utility hub for pet breeders and pet
                owners. Built end-to-end: React, TypeScript, Vite, Tailwind,
                Supabase, Stripe Connect. Currently in{" "}
                <strong className="text-ink-primary">Phase 5</strong> — the
                phase where revenue, engagement, and quality all get tightened
                at once. Features shipped so far include the Pack Leader
                loyalty model, the AI Suite (21 tools for breeders), the
                Document Vault, the Ecosystem Tree for lineage tracking,
                feature flags, contact-seller flows, shop MVP, and
                subscription billing. This is the most comprehensive
                &ldquo;proof of work&rdquo; I can show you — because I had to
                design every part of it, ship it, break it, and rebuild it
                against real user feedback. If you want to know how I approach
                your build, look at how I approach this one.
              </p>
              <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline">
                Read the case study
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>

            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-8">
              <h3 className="text-xl font-bold text-ink-primary md:text-2xl">
                The SEO Tool.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                Built for the Strategist side of the business. It&apos;s the
                kind of thing I&apos;d charge an agency to build for me,
                except I didn&apos;t want to wait. So I built it myself and
                now it&apos;s a productized offering under SDS.
              </p>
            </div>

            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-8">
              <h3 className="text-xl font-bold text-ink-primary md:text-2xl">
                Paperclip — Internal agent orchestration.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                The behind-the-scenes system I built to run SDS itself. Five
                AI agents (Strategist, Architect, Automator, Analyst,
                Researcher) that handle internal work on the agency side. We
                don&apos;t use fancy enterprise tools we&apos;d never recommend
                to a client. We eat our own cooking, and Paperclip is how we
                cook.
              </p>
            </div>

            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-8">
              <h3 className="text-xl font-bold text-ink-primary md:text-2xl">
                The Architect / Automator / Strategist series work.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
                Every custom build we take on turns into a case study when the
                client gives us permission to publish it. We don&apos;t
                publish case studies without their explicit yes, so the
                gallery builds slowly and honestly. If the gallery is thin
                right now, that&apos;s why — not because the work isn&apos;t
                there.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* === SECTION 7 — WHO THIS IS FOR === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">07 — Who this is for</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              I want to be upfront about who this actually works for.
            </h2>
            <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
              Not because I&apos;m picky — because I don&apos;t want either of
              us to waste each other&apos;s time. Here&apos;s who SDS is built
              for.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                Good fit
              </p>
              <p className="mt-3 text-base font-semibold text-ink-primary">
                You&apos;ll get the most out of working with me if:
              </p>
              <ul className="mt-4 space-y-3 text-base text-ink-muted">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    You run a business somewhere in the{" "}
                    <strong className="text-ink-primary">
                      $100K to $1M revenue range
                    </strong>{" "}
                    (and up)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    You have a specific, expensive operational problem
                    you&apos;re tired of
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    You know your numbers, even if the numbers are messy
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    You want a direct conversation more than you want a
                    polished pitch
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  <span>
                    You&apos;re willing to hear &ldquo;don&apos;t build that
                    yet&rdquo; if that&apos;s the honest answer
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-primary p-6 md:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
                Probably not a fit
              </p>
              <p className="mt-3 text-base font-semibold text-ink-primary">
                SDS is probably not the right fit if:
              </p>
              <ul className="mt-4 space-y-3 text-base text-ink-muted">
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ink-dim" />
                  <span>
                    You&apos;re looking for a co-builder to &ldquo;figure it
                    out together&rdquo; (you&apos;re paying me for answers,
                    not my learning curve)
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ink-dim" />
                  <span>
                    You have no budget ceiling and no clarity on what success
                    looks like
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ink-dim" />
                  <span>
                    You want a shiny AI thing to put on a pitch deck with no
                    real operational problem underneath it
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ink-dim" />
                  <span>
                    You&apos;re looking for &ldquo;AI magic.&rdquo; There
                    isn&apos;t any. There&apos;s just good engineering and
                    honest thinking.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
            If you&apos;re in the first group, we&apos;re going to have a
            productive conversation. If you&apos;re in the second, I&apos;ll
            tell you that and point you somewhere else. I&apos;ve done it
            before. I&apos;d rather send you to a better fit than take your
            money for the wrong reason.
          </p>
        </Container>
      </section>

      {/* === SECTION 8 — STRUCTURE === */}
      <section className="section-y border-t border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">08 — The LLC + the brands</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              How this is structured.
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {[
              {
                tag: "Parent",
                title: "Black Sheep 247 LLC",
                body: "is the legal entity that owns everything. It's fully operational and it's the vendor name that goes on invoices, contracts, and W-9s. I formed it to consolidate the work I was already doing and give clients a legitimate company they could actually do business with.",
              },
              {
                tag: "Agency brand",
                title: "Synapse Dynamics Segmented",
                body: "is the AI agency and consultancy brand — what you're on right now. It's the client-facing side of Black Sheep 247. This is where the Architect, Automator, and Strategist work lives.",
              },
              {
                tag: "Product brand",
                title: "Scrlpets",
                body: "is a product brand that lives under SDS. It's a live SaaS product I built and operate. It's not a client project — it's mine. But it's the clearest proof of what we can build for you.",
              },
              {
                tag: "Other products",
                title: "SEO tool · Restaurant System · Childcare System",
                body: "either live or in active blueprint phase and ship under SDS as they mature.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6 md:p-8"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {item.tag}
                </p>
                <h3 className="mt-3 text-xl font-bold text-ink-primary md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-muted md:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-muted md:text-lg">
            I&apos;m telling you this because I&apos;d rather you know the
            structure up front than wonder why the invoice says &ldquo;Black
            Sheep 247&rdquo; and the website says &ldquo;Synapse Dynamics
            Segmented.&rdquo; It&apos;s the same operation. It&apos;s me.
          </p>
        </Container>
      </section>

      {/* === SECTION 9 — ROADMAP === */}
      <section className="section-y border-t border-[color:var(--border-subtle)] bg-bg-surface">
        <Container>
          <div className="max-w-3xl">
            <p className="meta-label">09 — What&apos;s next for SDS</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl text-balance">
              I&apos;ll tell you where we&apos;re going.
            </h2>
            <p className="mt-6 text-lg text-ink-muted md:text-xl text-pretty">
              Most agency sites are too cagey about their roadmap. If
              you&apos;re going to trust us with your business, you should
              know where we&apos;re headed so you can decide if you want to
              come along.
            </p>
            <p className="mt-4 text-lg text-ink-muted md:text-xl">
              Here&apos;s what&apos;s on the roadmap right now:
            </p>
          </div>

          <ul className="mt-10 max-w-3xl space-y-4 text-base text-ink-muted md:text-lg">
            {[
              "More client engagements in the Architect and Automator series. That's the main work.",
              "Case studies published with client permission as the work accumulates.",
              "Scrlpets moving from Phase 5 Beta toward general availability.",
              "Productized versions of the Restaurant and Childcare systems for operators who want to buy the system rather than commission a custom build.",
              "The full SDS ecosystem vision — eventually this consultancy is one piece of a larger thesis about how small businesses use technology. I'll talk more about that publicly when the foundation is strong enough to support it.",
              "Content and teaching. Writing, publishing, showing the work. The goal is that even if you never hire us, the stuff we put out helps you make better decisions about AI for your business.",
            ].map((item) => (
              <li key={item} className="flex gap-4 leading-relaxed">
                <ArrowRight className="mt-1.5 h-4 w-4 flex-none text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            The roadmap moves. When it changes, we&apos;ll update this page.
            You can check back.
          </p>
        </Container>
      </section>

      {/* === SECTION 10 — FINAL CTA === */}
      <CTA
        heading="You can do this. Let's figure out how."
        subheading="The thing you didn't think you could do — you probably can. Worst case, you get 30 minutes of real answers and walk away clearer than when you started."
        primaryLabel="Book a call"
        secondaryLabel="See the services"
        secondaryHref="/services"
      />
    </>
  );
}
