import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/sections/PageHero";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three ways Synapse Dynamics works: Architect for custom apps, Automator for workflows, Strategist for AI consulting.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Three ways we work."
        description="Custom apps, business automation, and strategic consulting. Pick one, or stack them when the problem is bigger than one practice can solve."
      />

      <section className="section-y">
        <Container>
          <div className="space-y-24 md:space-y-32">
            {services.map((service, i) => {
              const Icon = service.icon;
              const reversed = i % 2 === 1;
              return (
                <article
                  key={service.slug}
                  className="grid gap-10 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16"
                >
                  {/* Visual block */}
                  <div
                    className={cn(
                      "relative flex aspect-[5/4] items-center justify-center overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-bg-surface p-10",
                      reversed && "md:order-2"
                    )}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(34,197,94,0.06) 0%, transparent 60%), radial-gradient(circle at 30% 30%, rgba(34,197,94,0.12) 0%, transparent 50%)",
                      }}
                    />
                    <div className="relative text-center">
                      <p className="font-mono text-[10rem] font-bold leading-none text-accent/20 md:text-[12rem]">
                        {service.numeral}
                      </p>
                      <div className="mt-6 inline-flex h-14 w-14 items-center justify-center rounded-xl border border-accent/30 bg-bg-primary text-accent">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>

                  {/* Content block */}
                  <div className={cn(reversed && "md:order-1")}>
                    <p className="meta-label">Series {service.numeral}</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink-primary md:text-5xl">
                      {service.name}
                    </h2>
                    <p className="mt-4 text-lg font-medium text-accent">
                      {service.tagline}
                    </p>
                    <p className="mt-6 text-base leading-relaxed text-ink-muted text-pretty">
                      {service.longDescription}
                    </p>

                    <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.offerings.map((offering) => (
                        <li
                          key={offering}
                          className="flex items-start gap-2 text-sm text-ink-muted"
                        >
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                          <span>{offering}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-10 inline-flex items-center gap-2 rounded-md border border-accent px-5 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-bg-primary"
                    >
                      Explore {service.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA
        heading="Not sure which one fits?"
        subheading="Tell us the problem. We'll tell you which practice to lean on — and whether it's worth engaging at all."
        primaryLabel="Start a conversation"
      />
    </>
  );
}
