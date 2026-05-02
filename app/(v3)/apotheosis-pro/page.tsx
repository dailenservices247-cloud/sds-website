// app/(v3)/apotheosis-pro/page.tsx
// Apotheosis Pro pricing page — DRAFT.
// Route exists but is gated pre-launch (target August 2026).
// Foundation Subscription page promises auto-conversion here at the same $19/mo —
// this page is the destination that promise points to.
//
// Deploy timing: see report at end of dispatch. Default: leave PRE_LAUNCH=true,
// do NOT add to sitemap.ts, until ~30 days before Apotheosis launch (~July 2026).

import type { Metadata } from "next";
import Link from "next/link";
import { Creature } from "@/components/v3/Creature";
import { Wordmark } from "@/components/brand/Wordmark";
import { SITE_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Apotheosis Pro · Synapse Dynamics",
  description:
    "The platform Foundation Subscription becomes. Launching August 2026.",
  alternates: { canonical: `${SITE_URL}/apotheosis-pro` },
  openGraph: {
    title: "Apotheosis Pro · Synapse Dynamics",
    description:
      "The platform Foundation Subscription becomes. Launching August 2026.",
    url: `${SITE_URL}/apotheosis-pro`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apotheosis Pro · Synapse Dynamics",
    description:
      "The platform Foundation Subscription becomes. Launching August 2026.",
  },
  // Pre-launch: do not index. Strip these two lines (or flip to index) when going public.
  robots: { index: false, follow: false },
};

// Pre-launch gate. Flip to false ~30 days before Apotheosis ships.
// While true, the page renders the "Launching August 2026" framing instead of a buy flow.
const PRE_LAUNCH = true;

// Anchor price for new (post-launch) Apotheosis Pro subscribers.
// Foundation members ride $19/mo forever; this is what everyone else pays after launch.
// Number is provisional — locks closer to launch. Carrying as TBD label is the honest move.
const POST_LAUNCH_PRICE_LABEL = "$49–$79/mo (TBD)";

export default function ApotheosisProPage() {
  return (
    <article>
      {/* Hero — same emerald gradient pattern as /foundation, but framed as the destination */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-blaze" aria-hidden="true" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="container-x pt-28 md:pt-40 pb-20 md:pb-28 relative z-10 max-w-4xl">
          <Wordmark
            withTag="stacked"
            className="mb-8 md:mb-10 text-white"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          />
          <p className="mono-label mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>
            Pre-launch · Target August 2026
          </p>
          <h1
            className="display text-white text-balance"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", maxWidth: "16ch" }}
          >
            Apotheosis Pro.
          </h1>
          <p
            className="mt-8 text-xl md:text-2xl leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            The platform Foundation Subscription becomes.
          </p>
          <p
            className="mt-3 text-base md:text-lg leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            The internal tooling that runs the Black Sheep 247 portfolio — Denise persona,
            Keychain, Skills, multi-agent infrastructure, custom CLAUDE.md framework — packaged
            for solo operators who want the same leverage. Same shape. Same discipline. Yours.
          </p>
        </div>
      </section>

      {/* Pre-launch gate */}
      {PRE_LAUNCH && (
        <section className="container-x py-12 max-w-3xl">
          <div className="rounded-xl border-2 border-accent bg-bg-surface p-6 md:p-8">
            <p className="mono-label mb-2">Launching August 2026</p>
            <p className="text-base text-ink-primary leading-relaxed">
              Apotheosis Pro is the productized version of the SDS internal stack. It ships when
              the platform is stable enough that one operator can run it without hand-holding —
              target month is August 2026, target quality is &ldquo;Dailen&rsquo;s daily driver.&rdquo;
            </p>
            <p className="mt-4 text-base text-ink-muted leading-relaxed">
              <strong className="text-ink-primary">If you&rsquo;re a Foundation Subscriber:</strong>{" "}
              you&rsquo;re already in. Your $19/mo converts to Apotheosis Pro automatically at
              launch — same bill, same card, same cadence. We&rsquo;ll email when it&rsquo;s live.
            </p>
            <p className="mt-3 text-base text-ink-muted leading-relaxed">
              <strong className="text-ink-primary">If you&rsquo;re not:</strong> the only path to
              Apotheosis Pro at $19/mo is to join Foundation Subscription before launch. After
              launch, new subscribers pay the public price ({POST_LAUNCH_PRICE_LABEL}). See
              pricing section below.
            </p>
          </div>
        </section>
      )}

      {/* What's coming — concrete feature list */}
      <section className="relative overflow-hidden">
        <Creature slug="planaria" position="top-right" opacity={0.10} tint="muted" />
        <div className="container-x py-20 md:py-28 max-w-3xl relative z-10">
          <p className="mono-label mb-4">What&rsquo;s coming</p>
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-10 text-balance">
            What Apotheosis Pro actually is.
          </h2>
          <ul role="list" className="space-y-6">
            {[
              {
                label: "Denise persona system",
                body: "The default Claude persona Dailen runs daily — 3-file persona stack (SOUL / USER / MEMORY), session-bootstrap discipline, dream-protocol consolidation, banked-correction memory. Yours, configured to your work, not Dailen&rsquo;s.",
              },
              {
                label: "Keychain — secret-handling wrappers",
                body: "Local-first credential rotation, one-line wrappers for ~/.secret_keys, session-scoped exposure. Stops the &ldquo;paste API key into a prompt&rdquo; failure mode without standing up a vault server.",
              },
              {
                label: "Skills marketplace + curated installs",
                body: "The Skills layer that turns one-off prompts into reusable, parameterized capabilities. Curated install bundles per workstream (build, content, ops, research) plus the publishing tools to ship your own.",
              },
              {
                label: "Multi-agent infrastructure",
                body: "Paperclip-style company-of-agents with role-typed instructions, governance boundaries, and observability. The same 5-agent setup running internally at Synapse Dynamics, generalized.",
              },
              {
                label: "Custom CLAUDE.md framework",
                body: "Project-instruction templates, per-repo discipline, the global-CLAUDE.md patterns proven across the BS247 portfolio. Drop into any repo, get the safety net for free.",
              },
              {
                label: "Session relay + handoff system",
                body: "The cross-project memory layer that makes session-N smarter than session-(N-1). Handoff mirroring, relay log, dream consolidation. Cures amnesia without burning context.",
              },
              {
                label: "The build journal access stays",
                body: "Everything Foundation gave you — behind-the-build content, direction-shaping Discord, weekly Friday Q&amp;A — stays in Apotheosis Pro. The product doesn&rsquo;t replace the journal; it adds the tooling under it.",
              },
            ].map((item) => (
              <li key={item.label} className="flex gap-5 border-l-2 border-accent pl-6">
                <div>
                  <p className="display-section text-xl md:text-2xl text-ink-primary mb-2">
                    {item.label}
                  </p>
                  <p
                    className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty"
                    dangerouslySetInnerHTML={{ __html: item.body }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing — the anchor section */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <div className="rounded-2xl bg-bg-dark p-8 md:p-12 border border-border-subtle">
          <p className="mono-label mb-4 text-accent-bright">Pricing — locked for Foundation Members</p>
          <h2
            className="display text-white text-balance mb-6"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
          >
            Two prices. One product.
          </h2>
          <p className="text-lg leading-relaxed text-pretty mb-10 text-ink-muted">
            Foundation members get Apotheosis Pro for what they were already paying. Everyone
            else pays the launch price. The gap is permanent — that&rsquo;s the entire point of
            joining Foundation now.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border-2 border-accent-bright bg-bg-surface p-6 md:p-7">
              <p className="mono-label mb-3 text-accent-bright">Foundation members</p>
              <p
                className="display text-ink-primary mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
              >
                $19/mo
              </p>
              <p className="text-sm text-ink-muted leading-relaxed text-pretty">
                Locked forever. Auto-converts at launch — no action required, no
                re-subscription, no price change. Stripe handles it server-side.
              </p>
            </div>
            <div className="rounded-xl border border-border-subtle bg-bg-surface p-6 md:p-7">
              <p className="mono-label mb-3">Post-launch subscribers</p>
              <p
                className="display text-ink-primary mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
              >
                {POST_LAUNCH_PRICE_LABEL}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed text-pretty">
                Public price for everyone joining after Apotheosis Pro is live. Locks closer to
                launch based on real cost-to-serve and what the platform actually does.
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-ink-dim italic leading-relaxed text-pretty">
            The lock is mechanical: existing Stripe subscriptions retain their original price ID
            when we swap the product label. New checkout sessions after launch use the new price
            ID. Your card never sees the difference. Their card does.
          </p>
        </div>
      </section>

      {/* Auto-conversion explained */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <p className="mono-label mb-4">Auto-conversion</p>
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-6">
          How $19 Apotheosis Pro actually happens.
        </h2>
        <div className="space-y-5 text-ink-muted leading-relaxed text-pretty text-base md:text-lg">
          <p>
            There&rsquo;s exactly one path to Apotheosis Pro at $19/mo: be a Foundation
            Subscriber on the day it launches. Foundation Subscription is{" "}
            <Link href="/foundation" className="text-accent hover:text-accent-bright underline underline-offset-4 decoration-1">
              $19/mo, open now
            </Link>
            , and every active subscription on launch day rolls into Apotheosis Pro
            automatically.
          </p>
          <p>
            <strong className="text-ink-primary">No discount codes after launch.</strong> No
            grandfathering window. No &ldquo;email us if you used to be a member.&rdquo; The mechanism is
            the existing-subscription continuity itself — which is why we&rsquo;re writing it down
            now, in public, before it matters.
          </p>
          <p>
            If you cancel Foundation before launch and rejoin after, you join at the post-launch
            price. The lock travels with the subscription, not the person.
          </p>
        </div>
      </section>

      {/* What this isn't — anti-list */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-8">
          What Apotheosis Pro isn&rsquo;t.
        </h2>
        <ul role="list" className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed">
          <li>
            <strong className="text-ink-primary">Not an agency.</strong> No one is doing the work
            for you. Apotheosis Pro is a tooling layer; you bring the projects.
          </li>
          <li>
            <strong className="text-ink-primary">Not a service subscription.</strong> No SLAs, no
            ticketing, no &ldquo;your dedicated success manager.&rdquo; Async-first, founder-supported, scoped.
          </li>
          <li>
            <strong className="text-ink-primary">Not a course.</strong> No modules, no
            certifications, no completion bar. The build journal teaches by exposure; the platform
            does the work.
          </li>
          <li>
            <strong className="text-ink-primary">Not a hosted runtime.</strong> Skills, personas,
            and CLAUDE.md frameworks run on your Claude Code, your machine, your keys. We don&rsquo;t
            stand between you and Anthropic.
          </li>
          <li>
            <strong className="text-ink-primary">Not a replacement for Foundation.</strong>{" "}
            Foundation Subscription becomes Apotheosis Pro. The journal, Discord, and Q&amp;A all
            stay. We&rsquo;re adding tools, not swapping audiences.
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="container-x pb-32 max-w-3xl">
        <div className="rounded-2xl bg-bg-surface border border-border-subtle p-8 md:p-12">
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4 text-balance">
            {PRE_LAUNCH
              ? "Lock $19/mo before Apotheosis Pro launches."
              : "Subscribe to Apotheosis Pro."}
          </h2>
          <p className="text-base md:text-lg text-ink-muted mb-8 leading-relaxed">
            {PRE_LAUNCH
              ? "Foundation Subscription is the only on-ramp. Join now — your subscription auto-converts to Apotheosis Pro at launch with no price change. Subscribers after launch pay the public price."
              : "If you&rsquo;re already a Foundation Subscriber, you&rsquo;re in — check your email for the conversion notice. Otherwise, this is the public Apotheosis Pro price."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/foundation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-4 font-semibold hover:bg-accent-bright transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {PRE_LAUNCH ? "Join Foundation — $19/mo, locks forever" : "See Foundation Subscription"}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle text-ink-primary px-7 py-4 font-medium hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              About SDS
            </Link>
          </div>

          {PRE_LAUNCH && (
            <p className="mt-6 text-sm text-ink-dim italic leading-relaxed">
              Already a Foundation Subscriber? You&rsquo;re already in. We&rsquo;ll email when
              Apotheosis Pro is live — no action needed on your end.
            </p>
          )}
        </div>
      </section>

      {/* Trust strip */}
      <section className="container-x pb-20 max-w-3xl">
        <p className="text-sm text-ink-dim text-center">
          Cancel anytime · 7-day money-back · No retention call · No upsells
        </p>
      </section>
    </article>
  );
}
