import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "./Container";

const footerGroups = [
  {
    title: "Services",
    links: [
      { href: "/services/architect", label: "Architect" },
      { href: "/services/automator", label: "Automator" },
      { href: "/services/strategist", label: "Strategist" },
      { href: "/services", label: "All services" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/products", label: "Products" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border-subtle)] bg-bg-primary">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.25fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center" aria-label="Synapse Dynamics home">
              <Wordmark className="text-xl text-ink-primary" />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-muted">
              An AI agency building custom apps, automations, and strategy for
              founders who need results, not decks.
            </p>
            <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-dim">
              Segmented · Regenerative · Built to ship
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-muted transition-colors hover:text-ink-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[color:var(--border-subtle)] pt-8 text-xs text-ink-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Synapse Dynamics Segmented · A Black Sheep
            247 LLC brand
          </p>
          <p className="font-mono uppercase tracking-[0.15em]">
            Built in-house · Next.js 14 · Vercel
          </p>
        </div>
      </Container>
    </footer>
  );
}
