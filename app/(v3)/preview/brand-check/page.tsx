// app/(v3)/preview/brand-check/page.tsx
// Visual confirmation page for the three brand assets that already exist
// in the codebase. Helps verify which asset Dailen is picturing when he
// says "the S-shaped worm" vs "the worm" in conversation.

import Link from "next/link";
import type { Metadata } from "next";
import { Wordmark } from "@/components/brand/Wordmark";
import { Monogram } from "@/components/brand/Monogram";

export const metadata: Metadata = {
  title: "Brand asset check",
  description: "Visual confirmation of the three SDS brand marks.",
};

export default function BrandCheckPage() {
  return (
    <article className="container-x py-16 md:py-24">
      <header className="mb-16 max-w-3xl">
        <p className="mono-label mb-4">Internal · Asset verification</p>
        <h1
          className="display text-ink-primary text-balance mb-6"
          style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)" }}
        >
          The three brand marks.
        </h1>
        <p className="text-lg md:text-xl text-ink-muted leading-relaxed text-pretty">
          All three assets already exist in the codebase. They&rsquo;re rendered below at full size
          so you can confirm which one you&rsquo;re picturing when you say &ldquo;the S-shaped
          worm&rdquo; or &ldquo;the worm.&rdquo; All three are locked per BRAND.md v2.1.
        </p>
        <p className="mt-4 text-sm text-ink-dim">
          Source files: <code className="font-mono">components/brand/</code> + <code className="font-mono">public/brand/</code>
        </p>
      </header>

      {/* Asset 1 — Mono-S Coil (the S-shaped worm; only worm-asset kept) */}
      <section className="mb-20 border-t border-border-subtle pt-12">
        <div className="mb-10">
          <p className="mono-label mb-2">Asset 01 · Mono-S Coil</p>
          <h2
            className="font-bricolage font-bold text-ink-primary mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            The S-shaped worm — monogram
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-3xl">
            The letter S drawn as a single thick green stroke (rounded ends), with six thin dark
            segment rings cutting perpendicularly across the bars — giving it the segmented body of a
            caterpillar or earthworm while staying readable as &ldquo;S.&rdquo;{" "}
            <strong className="text-ink-primary">This is the &ldquo;S-shaped worm&rdquo; from your original session.</strong>{" "}
            Square (1:1). Used for favicons, app icons, social avatars.
          </p>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-12 md:p-16 flex items-center justify-center gap-12 md:gap-20 flex-wrap">
          <Monogram size={280} />
          <Monogram size={120} />
          <Monogram size={48} />
          <Monogram size={24} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mono-label mb-2">Currently used at</p>
            <ul className="text-ink-muted space-y-1">
              <li>• Favicons (16/32/48/180/192/512 px sizes)</li>
              <li>• Apple touch icon</li>
              <li>• PWA icons</li>
            </ul>
          </div>
          <div>
            <p className="mono-label mb-2">NOT yet used at</p>
            <ul className="text-ink-muted space-y-1">
              <li>• Anywhere visible on the rendered website</li>
              <li>• Hero of any page</li>
              <li>• As a "loading" placeholder</li>
              <li>• Mid-page accent</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asset 2 — Wordmark with worm-S */}
      <section className="mb-20 border-t border-border-subtle pt-12">
        <div className="mb-10">
          <p className="mono-label mb-2">Asset 02 · Wordmark with worm-S</p>
          <h2
            className="font-bricolage font-bold text-ink-primary mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            Wordmark with embedded green S
          </h2>
          <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-3xl">
            The leading &ldquo;S&rdquo; in &ldquo;Synapse&rdquo; replaced by a clean three-curve worm-S
            (segment rings dropped at typographic scale because they&rsquo;d look like noise). The
            green S anchors the eye first; the rest of the wordmark reads as text.{" "}
            <strong className="text-ink-primary">This is the defining brand move</strong> — Stripe&rsquo;s S, Shopify&rsquo;s bag, Dropbox&rsquo;s box.
          </p>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-bg-surface p-12 md:p-16 flex flex-col items-center gap-10">
          <Wordmark className="text-6xl md:text-8xl text-ink-primary" />
          <Wordmark className="text-3xl md:text-5xl text-ink-primary" withTag="inline" />
          <Wordmark variant="short" className="text-4xl md:text-6xl text-ink-primary" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="mono-label mb-2">Currently used at</p>
            <ul className="text-ink-muted space-y-1">
              <li>• Top nav (left logo, every page) — small size</li>
              <li>• <code className="font-mono">/preview</code> hero (large, stacked with Segmented)</li>
            </ul>
          </div>
          <div>
            <p className="mono-label mb-2">NOT yet used at</p>
            <ul className="text-ink-muted space-y-1">
              <li>• Hero of <code className="font-mono">/portfolio /foundation /matchmaker /lab</code> at large size</li>
              <li>• &ldquo;SEGMENTED&rdquo; tag (current spec uses plain mono S — you want the worm-S there too)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Three open decisions */}
      <section className="border-t border-border-subtle pt-12 max-w-3xl">
        <h2
          className="font-bricolage font-bold text-ink-primary mb-8"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.02em" }}
        >
          Three things to confirm
        </h2>

        <ol className="space-y-8 text-base md:text-lg text-ink-primary">
          <li className="flex gap-4">
            <span className="mono-label flex-shrink-0 mt-1 text-accent">01</span>
            <div>
              <p className="font-semibold mb-1">Which asset is the &ldquo;S-shaped worm&rdquo; you mean?</p>
              <p className="text-ink-muted leading-relaxed">
                Most likely <strong className="text-ink-primary">Asset 02 (Mono-S Coil)</strong> — that&rsquo;s the literal S-shaped worm with segment rings. Confirm and I&rsquo;ll surface it
                on visible pages, not just favicons.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="mono-label flex-shrink-0 mt-1 text-accent">02</span>
            <div>
              <p className="font-semibold mb-1">
                Worm-S in BOTH &ldquo;Synapse&rdquo; AND &ldquo;Segmented&rdquo;?
              </p>
              <p className="text-ink-muted leading-relaxed">
                BRAND.md v2.1 currently locks &ldquo;SEGMENTED&rdquo; as plain mono uppercase. You want the
                S there to also be the worm-S. That&rsquo;s a brand-spec override → bump to v2.2.
                <strong className="text-ink-primary"> I&rsquo;ll do it once you confirm.</strong>
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="mono-label flex-shrink-0 mt-1 text-accent">03</span>
            <div>
              <p className="font-semibold mb-1">
                3D worm animation — which scope?
              </p>
              <p className="text-ink-muted leading-relaxed mb-3">
                The right path for &ldquo;a worm scurrying through atmosphere to each green spot&rdquo; depends on how heavy you want the effect:
              </p>
              <ul className="text-ink-muted space-y-2 text-base">
                <li>
                  <strong className="text-ink-primary">A. SVG worm + path animation + perspective</strong> — Framer Motion (already installed). 2D worm follows a curved path, scales/blurs as it travels for fake-3D depth. Lighter, faster.
                </li>
                <li>
                  <strong className="text-ink-primary">B. Three.js worm in real 3D space</strong> — actual WebGL worm, real depth, real rotation. Heavier (~80KB+), needs a Three.js dep added.
                </li>
                <li>
                  <strong className="text-ink-primary">C. CSS 3D transforms (perspective + rotateX/Y)</strong> — pseudo-3D worm, no new deps, fastest to ship.
                </li>
              </ul>
              <p className="mt-3 text-ink-dim italic">
                A is my recommendation — captures the &ldquo;scurrying through atmosphere&rdquo; feel without WebGL weight, fits the existing stack rules.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-12">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-6 py-3 text-sm font-medium hover:border-accent hover:text-accent transition-colors"
          >
            <span aria-hidden="true">←</span> Back to /preview
          </Link>
        </div>
      </section>
    </article>
  );
}
