import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "./PageHero";
import { CTA } from "./CTA";
import type { Service } from "@/lib/content/services";
import { SITE_URL } from "@/lib/site-config";

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;

  // Service schema with the real engagement ladder. Answer engines quote what
  // they can parse; without priced structured data they approximate, or skip
  // you for a competitor whose data they can read. Prices that are deliberately
  // open-ended (remediation, which cannot be scoped before the audit) ship as
  // a PriceSpecification with a minPrice rather than a fabricated exact figure.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}#synapse-dynamics-org`,
      name: "Synapse Dynamics Segmented",
    },
    areaServed: { "@type": "Country", name: "United States" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} engagements`,
      itemListElement: service.engagementModels.map((m) => {
        const digits = m.price.replace(/[^0-9]/g, "");
        const amount = digits ? Number(digits) : undefined;
        const isFrom = /from|starting/i.test(m.price);
        const isMonthly = /\/mo/i.test(m.price);
        return {
          "@type": "Offer",
          name: m.name,
          description: m.description,
          ...(amount
            ? {
                priceSpecification: {
                  "@type": "PriceSpecification",
                  priceCurrency: "USD",
                  ...(isFrom ? { minPrice: amount } : { price: amount }),
                  ...(isMonthly
                    ? { billingIncrement: 1, unitCode: "MON" }
                    : {}),
                },
              }
            : {}),
        };
      }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow={`Series ${service.numeral} · ${service.name}`}
        title={service.tagline}
        description={service.longDescription}
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-bg-surface text-accent-ink">
            <Icon className="h-6 w-6" />
          </span>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-all hover:bg-accent-bright"
          >
            {/* Do not interpolate the service name here — lowercasing it
                mangles "AI Security" and breaks the a/an article. */}
            Start a project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageHero>

      {/* === USE CASES === */}
      <section className="section-y border-b border-[color:var(--border-subtle)]">
        <Container>
          <div className="max-w-2xl">
            <p className="bv3-mono">What this looks like</p>
            <h2 className="bv3-display-section text-ink-primary mt-4 text-balance">
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
                className="rounded-xl border border-[color:var(--border-subtle)] bg-bg-surface p-8 transition-colors hover:border-accent"
              >
                <p className="bv3-mono">
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
            <p className="bv3-mono">How we engage</p>
            <h2 className="bv3-display-section text-ink-primary mt-4 text-balance">
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
                className="flex flex-col rounded-xl border border-[color:var(--border-subtle)] bg-bg-primary p-8 transition-colors hover:border-accent"
              >
                <p className="bv3-mono">
                  {String(i + 1).padStart(2, "0")} · Model
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink-primary">
                  {model.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {model.description}
                </p>

                <div className="mt-6 border-t border-[color:var(--border-subtle)] pt-6">
                  <p className="bv3-mono">
                    Pricing
                  </p>
                  <p className="mt-1 text-xl font-semibold text-ink-primary">
                    {model.price}
                  </p>
                </div>

                <div className="mt-4">
                  <p className="bv3-mono">
                    Best for
                  </p>
                  <p className="mt-1 text-sm text-ink-muted">{model.bestFor}</p>
                </div>

                <Link
                  href="/contact"
                  className="group mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-accent-ink"
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
            <p className="bv3-mono">Recent work</p>
            <h2 className="bv3-display-section text-ink-primary mt-4 text-balance">
              Scrlpets is the worked example.
            </h2>
            <p className="mt-5 text-lg text-ink-muted text-pretty">
              A marketplace built, launched, and still being iterated in-house —
              which means the pipeline underneath it has been run against real
              users rather than described in a deck. The portfolio carries
              everything else, each entry with its actual state.
            </p>
            <Link
              href="/portfolio"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink"
            >
              See the portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Only shipped, self-owned work appears here. The previous strip listed
              two client engagements as "Blueprint" that had not closed — an
              overclaim, and adjacent to the client-identity boundary in the
              concierge spec. Removed 2026-08-20. */}
          <div className="mt-12 flex flex-wrap gap-3">
            {["Scrlpets — live", "n8n SEO Tool — live"].map((item) => (
              <span
                key={item}
                className="bv3-mono border-[color:var(--border-subtle)] bg-bg-surface text-ink-muted inline-flex items-center gap-2 rounded-full border px-4 py-2"
              >
                <Check className="h-3 w-3 text-accent-ink" />
                {item}
              </span>
            ))}
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
