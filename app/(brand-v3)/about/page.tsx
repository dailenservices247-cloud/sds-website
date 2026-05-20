// app/(v3)/about/page.tsx
// /about — founder + company narrative per redesign PRD lock.
// Voice: honest, restrained, anti-positioning explicit ("not VC-backed,
// not enterprise-ready, not for everyone — yet").

import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import type { Metadata } from "next";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: { absolute: "About — Solo founder, real portfolio · Synapse Dynamics" },
  description:
    "Synapse Dynamics is the operating company under Black Sheep 247 LLC. One founder building a portfolio of AI products that connect.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About — Solo founder, real portfolio · Synapse Dynamics",
    description:
      "Synapse Dynamics is the operating company under Black Sheep 247 LLC. One founder building a portfolio of AI products that connect.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Solo founder, real portfolio · Synapse Dynamics",
    description:
      "Synapse Dynamics is the operating company under Black Sheep 247 LLC. One founder building a portfolio of AI products that connect.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#dailen-huntley-person`,
  name: "Dailen Huntley",
  url: `${SITE_URL}/about`,
  jobTitle: "Founder",
  worksFor: { "@id": `${SITE_URL}#synapse-dynamics-org` },
  sameAs: [
    "https://www.linkedin.com/in/dailenhuntley",
    "https://x.com/synapse_dynamic",
  ],
};

export default function AboutPage() {
  return (
    <article>
      <Script
        id="dailen-huntley-person"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="container-x pt-24 md:pt-36 pb-16 md:pb-20 max-w-4xl">
          <Wordmark
            withTag="stacked"
            className="mb-8 md:mb-10 text-ink-primary"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          />
          <p className="mono-label mb-6">About</p>
          <h1
            className="display text-ink-primary text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)", maxWidth: "20ch" }}
          >
            One founder, twelve products, one mesh.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-muted leading-relaxed text-pretty max-w-3xl">
            Synapse Dynamics Segmented (SDS) is the operating company under
            Black Sheep 247 LLC. We&rsquo;re building a connected portfolio of
            AI products — websites, apps, automations, and tooling — designed
            to plug into one experiential super-platform over time.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="container-x py-20 md:py-28 max-w-3xl">
        <p className="mono-label mb-3">The founder</p>
        <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-8 text-balance">
          Dailen Huntley.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start">
          <div className="rounded-2xl overflow-hidden border border-border-subtle bg-bg-surface w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
            <Image
              src="/about/dailen-hero.webp"
              alt="Dailen Huntley"
              width={224}
              height={224}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
            <p>
              Solo founder. Toledo, Ohio. Building Synapse Dynamics from the
              ground up — no VC, no team, no decks. The portfolio is the
              business; the business is the portfolio.
            </p>
            <p>
              Tried every no-code AI tool on the market, got stuck the same
              way most newcomers do, and started building what was missing
              instead. That answer is becoming Apotheosis. Twelve other
              products are connected to it through the mesh.
            </p>
            <p>
              The website you&rsquo;re reading is one of those products. It
              runs the consulting business that funds the rest of the
              portfolio while we ship.
            </p>
          </div>
        </div>
      </section>

      {/* The company */}
      <section className="container-x py-20 md:py-28 max-w-3xl border-t border-border-subtle">
        <p className="mono-label mb-3">The company</p>
        <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-8 text-balance">
          Black Sheep 247 LLC.
        </h2>
        <div className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
          <p>
            Black Sheep 247 LLC is the legal umbrella. Filed with the Ohio
            Secretary of State on April 30, 2026; awaiting Articles approval
            (3-7 business days). Synapse Dynamics Segmented is the operating
            company that lives under it — the brand customers see and
            transact with.
          </p>
          <p>
            Subsidiary brands plug into the same umbrella as they ship —
            Scrlpets, Apotheosis, BookStack, Autonomous Web Agency, NeoHood,
            and the Super App Platform that the others eventually connect
            into. Each brand is visually distinct (the Alphabet model — not
            color-aligned, not tied together aesthetically). Shared holding
            company; independent identities.
          </p>
        </div>
      </section>

      {/* Why this exists */}
      <section className="container-x py-20 md:py-28 max-w-3xl border-t border-border-subtle">
        <p className="mono-label mb-3">Why this exists</p>
        <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-8 text-balance">
          AI tooling assumes you already know.
        </h2>
        <div className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
          <p>
            Most AI products are built for people who already understand AI —
            developers, ML engineers, prompt-engineering pros. The whole
            category quietly assumes a baseline of knowledge that most
            people don&rsquo;t have.
          </p>
          <p>
            We&rsquo;re building for the inverse: people brand new to AI.
            People who tried Lovable, Replit, or Base44 and got stuck. People
            who haven&rsquo;t tried any AI tool yet but want to do real work
            with one. The portfolio is a series of doors into AI for that
            audience — Apotheosis is the harness, the Matchmaker is the
            front door, Foundation Subscription is the ride-along, and the
            Super App Platform is where it all eventually plugs in.
          </p>
          <p>
            The mesh is the strategy. Apotheosis is one vertical of it.
            NeoHood is another. Scrlpets is another. They&rsquo;re siblings,
            not rivals. The endgame is a connected platform — not any one
            product.
          </p>
        </div>
      </section>

      {/* Operating principles */}
      <section className="container-x py-20 md:py-28 max-w-3xl border-t border-border-subtle">
        <p className="mono-label mb-3">Operating principles</p>
        <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-10 text-balance">
          Anti-positioning, said out loud.
        </h2>
        <ul role="list" className="space-y-6">
          {[
            ["No VC.", "Solo-funded. No board, no growth-at-all-costs pressure, no preference stack to dilute. The customer is the only stakeholder."],
            ["No ads.", "No tracking pixels, no remarketing, no programmatic ad spend. Honest distribution: content, search, and customers who tell other customers."],
            ["No data monetization.", "We sell software and services. We don't sell signal about the people who use them."],
            ["No lock-in.", "Every product ships with export. If you leave, you leave with your data and your work intact."],
            ["No enterprise yet.", "Not built for procurement gauntlets, SOC-2 audits, or 18-month sales cycles. Maybe later. Honest about the now."],
            ["No deck-driven growth.", "We ship things. We don't pitch them before they exist. The portfolio surface is the deck."],
          ].map(([head, body]) => (
            <li key={head} className="flex gap-5 border-l-2 border-accent pl-6">
              <div>
                <p className="display-section text-xl md:text-2xl text-ink-primary mb-2">
                  {head}
                </p>
                <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="container-x pb-32 max-w-3xl">
        <div className="rounded-2xl bg-bg-surface border border-border-subtle p-8 md:p-12">
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4 text-balance">
            Want in?
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed mb-8">
            The Foundation Subscription is the easiest door — $19/mo for
            access to the entire portfolio mesh while it&rsquo;s being
            built. SDS Consulting is the higher-commitment door for B2B
            engagements.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/foundation"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-bg-primary px-6 py-3 font-medium hover:bg-accent-bright transition-colors"
            >
              Foundation Subscription
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 font-medium hover:border-accent hover:text-accent transition-colors"
            >
              SDS Consulting
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
