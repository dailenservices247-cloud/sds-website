import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Nox } from "@/components/brand-v3/Nox";
// NodalWorm removed 2026-04-30 — asset deprecated by Dailen.
// Lux resting pose added 2026-07-06 (coherence migration).

export const metadata = {
  title: "404 — Not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(200,162,62,0.08) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 overflow-hidden rounded-3xl opacity-90 lg:block xl:right-24"
        style={{ boxShadow: "var(--bv3-shadow-mid, 0 8px 20px rgba(0,0,0,0.32))" }}
      >
        <Nox variant="resting" width={340} height={228} alt="" />
      </div>

      <Container>
        <div className="max-w-2xl">
          <p className="meta-label">Error 404</p>
          <h1 className="mt-4 font-mono text-7xl font-bold tabular-nums text-ink-primary md:text-9xl">
            404
          </h1>
          <h2 className="mt-6 text-2xl font-bold text-ink-primary md:text-4xl text-balance">
            That segment doesn&apos;t exist.
          </h2>
          <p className="mt-4 text-lg text-ink-muted md:text-xl text-pretty">
            The page you&apos;re looking for either moved, never existed, or
            was a typo. Either way, here&apos;s the way back.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 text-base font-semibold text-bg-primary transition-all hover:bg-accent-bright hover:shadow-[0_0_0_4px_rgba(200,162,62,0.15)]"
            >
              Back to home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-[color:var(--border-subtle)] px-6 py-3 text-base font-semibold text-ink-primary transition-colors hover:border-accent hover:text-accent"
            >
              Start a project
            </Link>
          </div>

          <div className="mt-16 border-t border-[color:var(--border-subtle)] pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-dim">
              Try one of these instead
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              {[
                { href: "/about", label: "About" },
                { href: "/services", label: "Services" },
                { href: "/how-it-works", label: "How it works" },
                { href: "/lab/scrlpets", label: "Lab — Scrlpets" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
