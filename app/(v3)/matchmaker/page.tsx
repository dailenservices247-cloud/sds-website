// app/(v3)/matchmaker/page.tsx
// AI Business Matchmaker — placeholder route until Phase 1 interactive build.
// Universal SDS funnel front door.

import type { Metadata } from "next";
import { Creature } from "@/components/v3/Creature";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Matchmaker · Synapse Dynamics",
  description:
    "Interactive interview that recommends the AI business that fits you. Building it. Be first to try.",
  alternates: { canonical: `${SITE_URL}/matchmaker` },
  openGraph: {
    title: "Matchmaker · Synapse Dynamics",
    description:
      "Interactive interview that recommends the AI business that fits you. Building it. Be first to try.",
    url: `${SITE_URL}/matchmaker`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matchmaker · Synapse Dynamics",
    description:
      "Interactive interview that recommends the AI business that fits you. Building it. Be first to try.",
  },
};

export default function MatchmakerPage() {
  return (
    <article>
      {/* Loud hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-blaze" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="container-x pt-28 md:pt-40 pb-20 md:pb-28 relative z-10 max-w-4xl">
          <Wordmark
            withTag="stacked"
            className="mb-8 md:mb-10 text-white"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          />
          <p className="mono-label mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            Coming soon · Interactive
          </p>
          <h1
            className="display text-white text-balance"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", maxWidth: "16ch" }}
          >
            AI Business Matchmaker.
          </h1>
          <p
            className="mt-8 text-xl md:text-2xl leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            Answer 10–12 questions. Get a personalized AI-business recommendation that actually
            matches your skills, time, and constraints — not the side-hustle slop the algorithm
            keeps recommending.
          </p>
          <p
            className="mt-3 text-base md:text-lg leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            A 5-minute taste of the interviewer pattern that powers Apotheosis. Recommendation
            biases toward AI-augmented services using your existing expertise.
          </p>
        </div>
      </section>

      {/* What it does */}
      <section className="relative overflow-hidden">
        <Creature slug="gecko" position="top-right" opacity={0.10} tint="muted" />
        <div className="container-x py-20 md:py-28 max-w-3xl relative z-10">
          <ul role="list" className="space-y-5">
            {[
              "Asks who you are, what you know, what gives you energy, and what constrains you.",
              "Maps your inputs against 17 archetypes — including an honest anti-pattern call-out when the inputs suggest you should NOT pursue an AI side hustle.",
              "Gives you a 1–2 sentence recommendation inline, free, no email required.",
              "Email-gates the full plan: first 30 days, tool stack, pricing, first-customer strategy, common pitfalls, and where to go next.",
            ].map((line, i) => (
              <li key={i} className="flex gap-5 border-l-2 border-accent pl-6">
                <span className="mono-label text-xs flex-shrink-0 mt-1.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base md:text-lg text-ink-primary leading-relaxed">{line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Build status */}
      <section className="container-x py-16 md:py-20 max-w-3xl border-t border-border-subtle">
        <p className="mono-label mb-3">Build status</p>
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-6">
          Phase 1 incoming.
        </h2>
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty mb-4">
          The interview UI + rule-based archetype matcher land in the next 3–5 day build window.
          Phase 2 (full LLM-driven recommendations, Apotheosis-aligned interviewer pattern) lands
          3–5 days after that.
        </p>
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
          Drop your email below to be one of the first 100 to try it.
        </p>
      </section>

      {/* CTA */}
      <section className="container-x pb-32 max-w-3xl">
        <div className="rounded-2xl bg-bg-surface border border-border-subtle p-8 md:p-10">
          <h2 className="display-section text-2xl md:text-3xl text-ink-primary mb-4 text-balance">
            Be first to try it.
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-6">
            One launch email. No drip sequence.
          </p>
          <p className="text-sm text-ink-dim italic">
            Email capture wires up post-domain + Resend. Footer newsletter form works in the
            meantime.
          </p>
        </div>
      </section>
    </article>
  );
}
