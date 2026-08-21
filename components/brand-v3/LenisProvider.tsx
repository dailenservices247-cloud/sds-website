// components/brand-v3/LenisProvider.tsx
// Lenis hijacked smooth-scroll wrapper for brand-v3 routes.
// Tuned per shape brief Q4: lerp 0.08, smoothWheel true, smoothTouch false.
// Honors prefers-reduced-motion: when set, Lenis is disabled (native scroll passes through).
//
// Mount at the root of the (brand-v3) layout so every variant page inherits it.
//
// Refs:
// - https://github.com/darkroomengineering/lenis
// - shape brief: docs/shape/v1-immersive-garden-shape.md

"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

const lenisOptions = {
  // lerp lower = heavier / more cinematic. Default 0.1; brief locks at 0.08.
  lerp: 0.08,
  smoothWheel: true,
  // Hijacking touch scroll feels broken on mobile — let native handle it.
  smoothTouch: false,
  // Custom exponential ease-out — no bounce, no overshoot.
  // Matches DESIGN.md motion register (cubic-bezier ease-out family).
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  duration: 1.2,
};

/**
 * Same-page anchor links, routed through Lenis.
 *
 * Lenis hijacks the scroll container, so a plain <a href="#portfolio"> does
 * nothing at all: the browser's native "jump to fragment" is swallowed and the
 * page stays put. Measured 2026-08-21 — clicking the homepage hero's "See what
 * we've built" left location.hash empty and scrollY unchanged while the target
 * sat 1945px down the page. Every in-page anchor on every brand-v3 route was
 * silently dead.
 *
 * This delegates one click listener at the document, and hands any in-page
 * fragment to lenis.scrollTo() instead. The offset clears the fixed nav.
 *
 * Only mounted INSIDE <ReactLenis>. Under prefers-reduced-motion the provider
 * bypasses Lenis entirely, so native anchor behaviour already works and this
 * never runs.
 */
function AnchorScroll() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const NAV_OFFSET = -80;

    const onClick = (event: MouseEvent) => {
      // Let the browser handle modified clicks (new tab, download, etc.).
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET });
      // Keep the URL honest so the link is copyable and Back still works.
      window.history.pushState(null, "", `#${id}`);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  // Deep links (someone arrives at /#portfolio) have the same problem: Lenis is
  // running by the time the browser would have jumped.
  useEffect(() => {
    if (!lenis) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const timer = window.setTimeout(
      () => lenis.scrollTo(target, { offset: -80, immediate: true }),
      100,
    );
    return () => window.clearTimeout(timer);
  }, [lenis]);

  return null;
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // When reduced-motion is set, bypass Lenis entirely — native scroll passes through.
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <AnchorScroll />
      {children}
    </ReactLenis>
  );
}
