"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Container } from "./Container";
import { cn } from "@/lib/utils";
import { SKOOL_SYNAPSE_STUDIO } from "@/lib/site-config";

const navLinks = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/ask", label: "Ask" },
  { href: "/foundation", label: "Foundation" },
  { href: "/services", label: "Services" },
  { href: SKOOL_SYNAPSE_STUDIO, label: "Community" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  // Opaque, not glass. DESIGN.md:234 bans decorative backdrop blur outright, and :222
  // puts all depth in background-color shifts plus 1px tinted borders. This header was
  // 80% alpha shell under a blur utility, dropping to 60% where the filter is
  // supported — the banned pattern, and the last one that reached the stylesheet.
  // Solid shell also reads better over the cosmos canvas than 60% alpha did.
  //
  // Do not spell the utility class name anywhere in this file, comments included:
  // Tailwind's JIT scans comments, so naming it re-emits its rule into the bundle
  // with nothing using it. Verified twice — the class survived both the removal and
  // a rewrite of this note, because each draft still contained the literal token.
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:var(--border-subtle)] bg-bg-primary">
      <Container>
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            className="group inline-flex items-center"
            aria-label="Synapse Dynamics home"
          >
            <Wordmark className="text-lg md:text-xl text-ink-primary transition-opacity group-hover:opacity-80" />
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink-primary whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 inline-flex items-center rounded-md border border-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent hover:text-accent-contrast whitespace-nowrap"
            >
              Start a project
            </Link>
          </nav>

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
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="rounded-md px-3 py-3 text-base font-medium text-ink-muted hover:bg-bg-surface hover:text-ink-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md border border-accent px-4 py-3 text-base font-semibold text-accent-ink hover:bg-accent hover:text-accent-contrast"
            >
              Start a project
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}
