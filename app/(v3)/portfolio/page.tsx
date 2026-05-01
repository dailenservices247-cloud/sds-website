// app/(v3)/portfolio/page.tsx
// /portfolio index — all 12 products with status badges, sorted LIVE first.

import Link from "next/link";
import type { Metadata } from "next";
import { sortedPortfolio } from "@/lib/content/portfolio";
import { RevealGroup, RevealItem } from "@/components/v3/RevealOnScroll";
import { Creature } from "@/components/v3/Creature";
import { Wordmark } from "@/components/brand/Wordmark";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Everything Synapse Dynamics is building, in honest order. Status badges reflect reality.",
};

export default function PortfolioIndex() {
  const projects = sortedPortfolio();

  return (
    <>
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        <Creature slug="centipede" position="top-right" opacity={0.10} tint="muted" />
        <div className="container-x pt-24 md:pt-36 pb-16 md:pb-20 relative z-10 max-w-4xl">
          <Wordmark
            withTag="stacked"
            className="mb-8 md:mb-10 text-ink-primary"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          />
          <p className="mono-label mb-6">The Portfolio</p>
          <h1
            className="display text-ink-primary text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)", maxWidth: "18ch" }}
          >
            Twelve products. One mesh.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-muted leading-relaxed text-pretty max-w-3xl">
            Everything in honest order. Status badges reflect reality — live,
            pre-launch, concept, parked, or internal. No vapor; if it&rsquo;s
            here, it has a name and a state.
          </p>
        </div>
      </section>

      {/* Project grid */}
      <section className="container-x py-20 md:py-28">
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project) => {
            const isLive = project.status === "LIVE";
            const isParked = project.status === "PARKED";
            return (
              <RevealItem key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block h-full rounded-xl border border-border-subtle bg-bg-surface p-7 transition-all hover:border-accent hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mono-label text-[10px]"
                      style={{
                        backgroundColor: isLive
                          ? "rgba(34, 197, 94, 0.15)"
                          : isParked
                          ? "rgba(148, 163, 160, 0.12)"
                          : "rgba(45, 143, 80, 0.12)",
                        color: isLive
                          ? "#34d880"
                          : isParked
                          ? "#94a3a0"
                          : "#5fcc8a",
                      }}
                    >
                      <span
                        className={`inline-block h-1.5 w-1.5 rounded-full ${
                          isLive ? "live-pulse" : ""
                        }`}
                        style={{
                          backgroundColor: isLive
                            ? "#22c55e"
                            : isParked
                            ? "#5f6b66"
                            : "#2d8f50",
                        }}
                        aria-hidden="true"
                      />
                      <span>{project.status}</span>
                    </span>
                    <span className="mono-label text-[10px]">
                      Layer {project.layer}
                    </span>
                  </div>

                  <h2
                    className="font-bricolage font-bold text-ink-primary mb-2 text-balance leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 2.4vw, 1.75rem)", letterSpacing: "-0.02em" }}
                  >
                    {project.name}
                  </h2>
                  <p className="text-base text-ink-muted leading-relaxed text-pretty">
                    {project.tagline}
                  </p>

                  {project.parkedUntil && (
                    <p className="mt-5 pt-4 border-t border-border-soft text-sm text-ink-dim leading-relaxed">
                      <span className="mono-label text-[10px] block mb-1">Unblocks when</span>
                      {project.parkedUntil}
                    </p>
                  )}

                  {project.openQuestions.length > 0 && (
                    <p className="mt-5 text-sm text-ink-dim">
                      <span className="mono-label text-[10px]">
                        Open questions: {project.openQuestions.length}
                      </span>
                    </p>
                  )}

                  <p className="mt-6 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <span aria-hidden="true">→</span>
                  </p>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>
    </>
  );
}
