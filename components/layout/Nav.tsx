"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

// Nav order = user journey: Browse → Engage → Buy.
//   Browse:  Portfolio (catalog), Lab (what's shipping)
//   Engage:  Matchmaker (interactive funnel), Foundation ($19/mo)
//   Buy:     Services (consulting tiers)
//   CTA:     "Start a project" → /contact (right-aligned, accent button)
//
// Removed from primary nav (still reachable via footer or direct URL):
//   /about    — in footer Company column
//   /contact  — covered by the right-aligned CTA button + footer
//   /preview  — temp design-iteration entry, by direct URL
const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/lab", label: "Lab" },
  { href: "/matchmaker", label: "Matchmaker" },
  { href: "/foundation", label: "Foundation" },
  { href: "/services", label: "Services" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border-subtle)] bg-bg-primary/80 backdrop-blur supports-[backdrop-filter]:bg-bg-primary/60">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="group inline-flex items-center"
            aria-label="Synapse Dynamics home"
          >
            <Wordmark className="text-lg md:text-xl text-ink-primary transition-opacity group-hover:opacity-80" />
          </Link>

          {/* Desktop nav (lg+): full row. Tablets (md) collapse to mobile menu. */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink-primary whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center rounded-md border border-accent px-3.5 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-bg-primary whitespace-nowrap"
            >
              Start a project
            </Link>
          </nav>

          {/* Mobile/tablet toggle (shown below lg breakpoint) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden rounded-md p-2 text-ink-primary hover:bg-bg-surface"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile/tablet nav — fits 8+ items + CTA without clipping */}
        <nav
          className={cn(
            "lg:hidden overflow-hidden transition-[max-height] duration-300 ease-out",
            open ? "max-h-[42rem] pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-muted hover:bg-bg-surface hover:text-ink-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-accent px-4 py-3 text-base font-semibold text-accent hover:bg-accent hover:text-bg-primary"
            >
              Start a project
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
