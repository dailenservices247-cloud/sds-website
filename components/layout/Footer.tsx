// components/layout/Footer.tsx
// Terminal-register global footer (Brand House v1, approved mock 2026-07-08).
// Replaces the legacy link-column footer: prompt line, directory-listing link
// groups, compact wordmark row, status-bar legal. Wine = accent per the
// 2026-06-10 wine/gold role swap.

import Link from "next/link";
import { Nox } from "@/components/brand-v3/Nox";
import { Container } from "./Container";
import { SKOOL_SYNAPSE_STUDIO } from "@/lib/site-config";

const footerGroups = [
  {
    title: "SERVICES/",
    links: [
      { href: "/services/architect", label: "architect" },
      { href: "/services/automator", label: "automator" },
      { href: "/services/strategist", label: "strategist" },
      { href: "/services", label: "all-services" },
    ],
  },
  {
    title: "BUILD-WITH-US/",
    links: [
      { href: "/portfolio", label: "portfolio" },
      { href: "/foundation", label: "foundation" },
      { href: "/matchmaker", label: "matchmaker" },
      { href: "/lab", label: "the-lab" },
      { href: SKOOL_SYNAPSE_STUDIO, label: "community ↗" },
    ],
  },
  {
    title: "COMPANY/",
    links: [
      { href: "/about", label: "about" },
      { href: "/contact", label: "contact" },
      { href: "/legal/privacy", label: "privacy" },
      { href: "/legal/terms", label: "terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-bg-primary">
      <Container>
        {/* Prompt line */}
        <div className="pt-10 font-mono text-xs text-ink-dim">
          <span style={{ color: "var(--accent-deep)" }}>dailen@synapse</span>
          <span>:~$</span>{" "}
          <span className="text-accent-ink">ls --everything</span>
        </div>

        {/* Directory columns */}
        <div className="grid grid-cols-2 gap-8 pb-10 pt-6 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
                style={{ color: "var(--bv3-wine-text)" }}>
                {group.title}
              </p>
              <ul className="space-y-2 font-mono text-sm">
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith("http");
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="footer-link text-ink-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Wordmark + CTA row */}
        <div className="flex flex-wrap items-center gap-4 border-t border-[color:var(--border-subtle)] py-6">
          <Nox
            variant="monogram"
            width={64}
            height={64}
            className="h-8 w-8 rounded-md object-contain"
            alt="Lux — Synapse Dynamics monogram"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-ink-primary">
              Synapse Dynamics <span className="text-ink-muted">Segmented</span>
            </p>
            <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-ink-dim">
              Segmented · Regenerative · Built to ship
            </p>
          </div>
          <Link
            href="/contact"
            className="ml-auto inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-mono text-sm text-accent-contrast transition-colors hover:bg-accent-bright"
          >
            start --project →
          </Link>
        </div>
      </Container>

      {/* Status bar */}
      <div className="bg-bg-surface">
        <Container>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-ink-muted">
            <span style={{ color: "var(--accent-bright)" }}>●</span>
            <span>Live</span>
            <span className="text-ink-dim">·</span>
            <span>© MMXXVI Synapse Dynamics Segmented</span>
            <span className="text-ink-dim">·</span>
            <span>A Black Sheep 247 LLC brand</span>
            <span className="ml-auto hidden sm:inline text-ink-dim">
              Built in-house · Next.js 14 · Vercel
            </span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
