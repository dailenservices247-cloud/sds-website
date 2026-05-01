// app/(v3)/portfolio/[slug]/page.tsx
// Per-product portfolio page. One template, 12 routes, driven by lib/content/portfolio.ts.

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  portfolioProjects,
  type PortfolioSlug,
} from "@/lib/content/portfolio";
import { Creature } from "@/components/v3/Creature";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return portfolioProjects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const project = getProjectBySlug(params.slug as PortfolioSlug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.name,
    description: project.tagline,
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug as PortfolioSlug);
  if (!project) notFound();

  const isLive = project.status === "LIVE";
  const isParked = project.status === "PARKED";
  const isScrlpets = project.slug === "scrlpets";

  return (
    <article>
      {/* Breadcrumb */}
      <div className="container-x pt-12 pb-2">
        <Link
          href="/portfolio"
          className="mono-label hover:text-accent transition-colors inline-flex items-center gap-1"
        >
          <span aria-hidden="true">←</span> Portfolio
        </Link>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border-subtle">
        {project.slug === "apotheosis" && (
          <Creature slug="centipede" position="top-right" opacity={0.10} tint="accent" />
        )}
        {project.slug === "scrlpets" && (
          <Creature slug="axolotl" position="top-right" opacity={0.10} tint="muted" />
        )}
        <div className="container-x pt-8 md:pt-12 pb-16 md:pb-20 relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mono-label text-xs"
              style={{
                backgroundColor: isLive
                  ? "rgba(34, 197, 94, 0.15)"
                  : isParked
                  ? "rgba(148, 163, 160, 0.12)"
                  : "rgba(45, 143, 80, 0.12)",
                color: isLive ? "#34d880" : isParked ? "#94a3a0" : "#5fcc8a",
              }}
            >
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  isLive ? "live-pulse" : ""
                }`}
                style={{
                  backgroundColor: isLive ? "#22c55e" : isParked ? "#5f6b66" : "#2d8f50",
                }}
                aria-hidden="true"
              />
              <span>{project.status}</span>
            </span>
            <span className="mono-label text-xs">
              Layer {project.layer} · {project.parent}
            </span>
          </div>

          <h1
            className="display text-ink-primary text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)", maxWidth: "18ch" }}
          >
            {project.name}
          </h1>

          <p
            className="mt-8 text-xl md:text-2xl text-ink-muted leading-relaxed text-pretty max-w-3xl font-bricolage italic"
            style={{ letterSpacing: "-0.01em", fontWeight: 400 }}
          >
            {project.tagline}
          </p>
        </div>

        {/* Hero image for Scrlpets */}
        {isScrlpets && (
          <div className="container-x relative z-10 pb-16">
            <div className="rounded-xl overflow-hidden border border-border-subtle">
              <Image
                src="/lab/scrlpets-hero.webp"
                alt="Scrlpets — social platform for animal breeders"
                width={1280}
                height={720}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        )}
      </section>

      {/* What it is */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <p className="mono-label mb-4">What it is</p>
        <p className="text-lg md:text-xl text-ink-muted leading-relaxed text-pretty">
          {project.blurb}
        </p>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-3.5 font-medium hover:bg-accent-bright transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Visit {project.name}
            <span aria-hidden="true">↗</span>
          </a>
        )}

        {project.parkedUntil && (
          <div className="mt-10 rounded-xl border border-border-subtle bg-bg-surface p-6">
            <p className="mono-label mb-2">Unblocks when</p>
            <p className="text-base text-ink-primary leading-relaxed">
              {project.parkedUntil}
            </p>
          </div>
        )}
      </section>

      {/* Mesh connections */}
      {(project.consumesFromMesh.length > 0 || project.contributesToMesh.length > 0) && (
        <section className="container-x py-16 md:py-20 max-w-4xl border-t border-border-subtle">
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-10">
            Mesh connections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.consumesFromMesh.length > 0 && (
              <div>
                <p className="mono-label mb-4">Consumes from the mesh</p>
                <ul role="list" className="space-y-4">
                  {project.consumesFromMesh.map((conn) => (
                    <li key={conn.target} className="border-l-2 border-accent pl-4">
                      <p className="font-mono text-sm text-ink-primary mb-1">{conn.target}</p>
                      <p className="text-sm text-ink-muted leading-relaxed">{conn.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.contributesToMesh.length > 0 && (
              <div>
                <p className="mono-label mb-4">Contributes to the mesh</p>
                <ul role="list" className="space-y-4">
                  {project.contributesToMesh.map((conn) => (
                    <li key={conn.target} className="border-l-2 border-accent pl-4">
                      <p className="font-mono text-sm text-ink-primary mb-1">{conn.target}</p>
                      <p className="text-sm text-ink-muted leading-relaxed">{conn.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Open questions */}
      {project.openQuestions.length > 0 && (
        <section className="container-x py-16 md:py-20 max-w-3xl border-t border-border-subtle">
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4">
            Open questions
          </h2>
          <p className="text-base text-ink-muted mb-8 leading-relaxed">
            What we don&rsquo;t know yet. Honest disclosure beats vapor framing.
          </p>
          <ol role="list" className="space-y-4">
            {project.openQuestions.map((q, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl bg-bg-surface border border-border-subtle p-5"
              >
                <span className="mono-label text-xs flex-shrink-0 mt-1">
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-ink-primary leading-relaxed">{q}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CTA */}
      {project.notifyMeEnabled && (
        <section className="container-x pb-32 max-w-3xl border-t border-border-subtle pt-16">
          <div className="rounded-xl bg-bg-surface border border-border-subtle p-8 md:p-10">
            <p className="mono-label mb-4">Stay close</p>
            <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4 text-balance">
              {project.status === "PARKED"
                ? "Get notified when it unblocks."
                : `Get early access to ${project.name}.`}
            </h2>
            <p className="text-base text-ink-muted mb-6 leading-relaxed">
              One tagged email when there&rsquo;s real news. No drip sequences.
            </p>
            <p className="text-sm text-ink-dim italic">
              Email capture wires up post-domain-purchase + Resend activation.
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
