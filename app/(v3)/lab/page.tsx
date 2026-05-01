// app/(v3)/lab/page.tsx
// /lab index — live products + active builds + internal infrastructure.
// Existing /lab/scrlpets stays at the brand v2 dark route — links out to it.

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { RevealGroup, RevealItem } from "@/components/v3/RevealOnScroll";
import { Wordmark } from "@/components/brand/Wordmark";

export const metadata: Metadata = {
  title: "The Lab",
  description: "What's live, what's in motion. Active products and builds.",
};

const liveProducts = [
  {
    name: "Scrlpets",
    tagline: "Social platform for animal breeders. Live and shipping.",
    href: "/lab/scrlpets",
    image: "/lab/scrlpets-hero.webp",
    audience: "Breeders + pet owners",
  },
];

const activeBuilds = [
  {
    name: "Apotheosis",
    tagline: "Working AI assistant for newcomers. v9.3 spec locked. Ships before Aug 2.",
    href: "/portfolio/apotheosis",
    status: "PRE-LAUNCH",
  },
  {
    name: "BookStack",
    tagline: "Programmatic-SEO affiliate site for bookkeepers. Phase 1 in motion.",
    href: "/portfolio/bookstack",
    status: "PRE-LAUNCH",
  },
  {
    name: "Autonomous Web Agency",
    tagline: "$250 micro-SaaS site builder. Multi-agent council. Phase 0 manual proof-of-concept.",
    href: "/portfolio/autonomous-web-agency",
    status: "PRE-LAUNCH",
  },
];

const internal = [
  {
    name: "Paperclip",
    tagline: "Agent orchestration substrate. Five named agents on localhost:3100.",
    href: "/portfolio/paperclip",
  },
];

export default function LabIndex() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border-subtle">
        <div className="container-x pt-24 md:pt-36 pb-16 md:pb-20 max-w-4xl">
          <Wordmark
            withTag="stacked"
            className="mb-8 md:mb-10 text-ink-primary"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          />
          <p className="mono-label mb-6">The Lab</p>
          <h1
            className="display text-ink-primary text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)", maxWidth: "16ch" }}
          >
            What&rsquo;s live. What&rsquo;s in motion.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-ink-muted leading-relaxed text-pretty max-w-3xl">
            Live products, active builds, and internal infrastructure — surfaced honestly.
            Transparency without performance.
          </p>
        </div>
      </section>

      {/* Live products */}
      <section className="container-x py-20 md:py-28">
        <div className="mb-12">
          <p className="mono-label mb-3">Live products</p>
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary text-balance max-w-2xl">
            Shipping today.
          </h2>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveProducts.map((p) => (
            <RevealItem key={p.name}>
              <Link
                href={p.href}
                className="group block h-full rounded-xl border border-border-subtle bg-bg-surface overflow-hidden transition-all hover:border-accent hover:-translate-y-0.5"
              >
                <div className="aspect-video bg-bg-elevated overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={1280}
                    height={720}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mono-label text-[10px]"
                      style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#34d880" }}
                    >
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent live-pulse" aria-hidden="true" />
                      LIVE
                    </span>
                    <span className="mono-label text-[10px]">{p.audience}</span>
                  </div>
                  <h3 className="font-bricolage font-bold text-2xl md:text-3xl text-ink-primary mb-2" style={{ letterSpacing: "-0.02em" }}>
                    {p.name}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed">{p.tagline}</p>
                  <p className="mt-5 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Visit Lab
                    <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Active builds */}
      <section className="container-x py-20 md:py-28 border-t border-border-subtle">
        <div className="mb-12">
          <p className="mono-label mb-3">Active builds</p>
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary text-balance max-w-2xl">
            In motion.
          </h2>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeBuilds.map((p) => (
            <RevealItem key={p.name}>
              <Link
                href={p.href}
                className="group block h-full rounded-xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent hover:-translate-y-0.5"
              >
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mono-label text-[10px] mb-5"
                  style={{ backgroundColor: "rgba(45, 143, 80, 0.12)", color: "#5fcc8a" }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#2d8f50" }} aria-hidden="true" />
                  {p.status}
                </span>
                <h3 className="font-bricolage font-bold text-xl md:text-2xl text-ink-primary mb-2" style={{ letterSpacing: "-0.02em" }}>
                  {p.name}
                </h3>
                <p className="text-base text-ink-muted leading-relaxed">{p.tagline}</p>
                <p className="mt-5 text-sm font-medium text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more
                  <span aria-hidden="true">→</span>
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Internal */}
      <section className="container-x py-20 md:py-28 border-t border-border-subtle pb-32">
        <div className="mb-12">
          <p className="mono-label mb-3">Internal infrastructure</p>
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary text-balance max-w-2xl">
            What runs underneath.
          </h2>
          <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed text-pretty max-w-2xl">
            Not products. Surfaced for transparency about the engine that runs the rest.
          </p>
        </div>
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internal.map((p) => (
            <RevealItem key={p.name}>
              <Link
                href={p.href}
                className="group block h-full rounded-xl border border-border-subtle bg-bg-surface p-6 transition-all hover:border-accent hover:-translate-y-0.5"
              >
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 mono-label text-[10px] mb-5"
                  style={{ backgroundColor: "rgba(148, 163, 160, 0.12)", color: "#94a3a0" }}
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#94a3a0" }} aria-hidden="true" />
                  INTERNAL
                </span>
                <h3 className="font-bricolage font-bold text-xl md:text-2xl text-ink-primary mb-2" style={{ letterSpacing: "-0.02em" }}>
                  {p.name}
                </h3>
                <p className="text-base text-ink-muted leading-relaxed">{p.tagline}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
    </>
  );
}
