import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Four-step process: Discover, Design, Build, Deploy. No guesswork, no surprise invoices, no 60-slide decks.",
};

const steps = [
  {
    num: "01",
    name: "Discover",
    promise: "We decide whether to work together.",
    what: "A 45-minute conversation about the problem you're trying to solve. What's broken, what's working, what success looks like, what's blocking progress. We ask specific questions and take notes.",
    client: "Show up honestly. Bring constraints, budgets, and anything we shouldn't touch. Tell us what you've already tried.",
    delivers: "A written one-page summary of the problem, our first instinct on what to do about it, and an honest answer: we're a fit, we're not, or we're close but need more context.",
    timeline: "45 min meeting · same-day summary",
  },
  {
    num: "02",
    name: "Design",
    promise: "We write down what we're building before we build it.",
    what: "Architecture decisions, flow diagrams, data contracts, scope boundaries, acceptance criteria. If it's software: the component tree. If it's automation: the trigger and nodes. If it's strategy: the decision framework.",
    client: "Review the design doc. Push back on anything that doesn't match your mental model. This is where feedback is cheapest.",
    delivers: "A shared design document you can hand to a future engineer without translation. Plus a fixed scope, fixed timeline, and a prioritized build sequence.",
    timeline: "3-10 days depending on complexity",
  },
  {
    num: "03",
    name: "Build",
    promise: "You see working software every week — not a 6-week silence.",
    what: "We ship in increments. Production-quality code from day one: typed, tested where it matters, documented, and deployed to a staging environment you can click around in. Weekly async updates with what was built and what's next.",
    client: "Check the weekly build. Flag things that feel wrong early. Answer questions within 48 hours so we don't block.",
    delivers: "A working system, iterated week by week, with a clear changelog and demo-ready states at every milestone. No 'it's 80% done, trust us.'",
    timeline: "2-12 weeks depending on scope",
  },
  {
    num: "04",
    name: "Deploy",
    promise: "You get a runbook, not a handshake.",
    what: "Production deployment. Monitoring, error alerting, database backups, documented rollback procedures. We test it under load if load matters. We walk your team through the system or keep running it ourselves on retainer.",
    client: "Choose: take it in-house or keep us on. Review the runbook. Sign off on handoff.",
    delivers: "A live system. A runbook written for a human who's never seen it. Documentation in your repo. Optional ongoing support or retainer.",
    timeline: "1-3 days for deploy and handoff",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Four steps. No guesswork."
        description="A repeatable process built to catch misalignment early, ship working software weekly, and leave you with something you can actually maintain after we're gone."
      />

      <section className="section-y">
        <Container>
          <div className="space-y-20 md:space-y-28">
            {steps.map((step) => (
              <article
                key={step.num}
                className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-16"
              >
                <div className="md:sticky md:top-28 md:self-start">
                  <p className="font-mono text-6xl font-bold leading-none text-accent/30 md:text-8xl">
                    {step.num}
                  </p>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl">
                    {step.name}
                  </h2>
                  <p className="mt-3 max-w-xs text-sm font-medium text-accent">
                    {step.promise}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      What happens
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-ink-primary">
                      {step.what}
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        What you do
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {step.client}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-bg-surface p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        What we deliver
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                        {step.delivers}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
                      Timeline
                    </p>
                    <span className="h-px flex-1 bg-[color:var(--border-subtle)]" />
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink-primary">
                      {step.timeline}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA
        heading="Think we're a fit?"
        subheading="Step one is the 45-minute conversation. You'll know by the end whether we should keep going."
        primaryLabel="Book the first call"
      />
    </>
  );
}
