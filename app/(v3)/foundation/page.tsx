// app/(v3)/foundation/page.tsx
// Foundation Subscription page. All 9 Q3 lock decisions baked in.
// Pre-Form-610 gated state visible now; Stripe wires up post-Articles cascade.

import Link from "next/link";
import type { Metadata } from "next";
import { Creature } from "@/components/v3/Creature";
import { Wordmark } from "@/components/brand/Wordmark";
import {
  startFoundationCheckout,
  startSetupCheckout,
} from "./actions";

export const metadata: Metadata = {
  title: "Foundation Subscription",
  description:
    "Access the entire portfolio mesh — $19/mo. Auto-converts to Apotheosis Pro at launch.",
};

// Stripe is now live — Foundation Subscription is open for billing.
// Toggle back to false ONLY if Stripe access needs to be paused.
const FOUNDATION_LIVE = true;

export default function FoundationPage() {
  return (
    <article>
      {/* Loud hero — emerald gradient */}
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
            Bridge offer · Pre-launch
          </p>
          <h1
            className="display text-white text-balance"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", maxWidth: "16ch" }}
          >
            Foundation Subscription.
          </h1>
          <p
            className="mt-8 text-xl md:text-2xl leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            $19/mo for access to the entire portfolio mesh — while it&rsquo;s being built.
          </p>
          <p
            className="mt-3 text-base md:text-lg leading-relaxed text-pretty max-w-3xl"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            You&rsquo;re not paying for a finished product. You&rsquo;re paying for participation
            in the build. The build matures into Apotheosis. Your subscription rides through the
            transition without a price change.
          </p>
        </div>
      </section>

      {/* Pre-launch banner */}
      {!FOUNDATION_LIVE && (
        <section className="container-x py-12 max-w-3xl">
          <div className="rounded-xl border-2 border-accent bg-bg-surface p-6 md:p-8">
            <p className="mono-label mb-2">Launching Week of May 5, 2026</p>
            <p className="text-base text-ink-primary leading-relaxed">
              Black Sheep 247 LLC formation is in queue with Ohio SOS (filed April 30, 3-7 business
              day approval). Foundation Subscription opens for Stripe billing once the cascade
              clears: Articles → EIN → Relay banking → Stripe live.
            </p>
            <p className="mt-4 text-sm text-ink-dim italic">
              Drop your email in the footer newsletter form to get the launch ping.
            </p>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="relative overflow-hidden">
        <Creature slug="planaria" position="top-right" opacity={0.10} tint="muted" />
        <div className="container-x py-20 md:py-28 max-w-3xl relative z-10">
          <h2 className="display-section text-3xl md:text-5xl text-ink-primary mb-10 text-balance">
            What you get for $19/mo.
          </h2>
          <ul role="list" className="space-y-6">
            {[
              { label: "Behind-the-build content", body: "Subscriber-only depth across the whole portfolio: Apotheosis dev journey, Scrlpets shipping notes, BookStack metrics, NeoHood Sovereign Engine progress, AWA Phase 0 results. Documented as work happens — not curated marketing." },
              { label: "Direction-shaping Discord", body: "A subscriber-only channel where you vote on what gets built next, what tools get reviewed, what episodes get prioritized. Your input visibly shapes the public output." },
              { label: "Weekly Friday Q&A recap", body: "Submit questions in Discord all week. Friday: a 20-minute recap video answers the top 5–7 voted questions, with Higgsfield-generated carousel summaries. Recorded and async-watchable." },
              { label: "Auto-conversion to Apotheosis Pro at launch", body: "When Apotheosis ships (target August 2026), your Foundation Subscription becomes Apotheosis Pro at the same $19/mo. Same bill. Same cadence. The product label shifts; the price doesn't." },
              { label: "Early access — every product", body: "First-pick on Apotheosis beta seats, BookStack vertical previews, AWA Phase 1 pilots, and per-product notify-me lists across the portfolio." },
            ].map((item) => (
              <li key={item.label} className="flex gap-5 border-l-2 border-accent pl-6">
                <div>
                  <p className="display-section text-xl md:text-2xl text-ink-primary mb-2">
                    {item.label}
                  </p>
                  <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founding Member tier */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <div className="rounded-2xl bg-bg-dark p-8 md:p-12 border border-border-subtle">
          <p className="mono-label mb-4 text-accent-bright">First 100 subscribers · Limited</p>
          <h2 className="display text-white text-balance mb-6" style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
            Founding&nbsp;Member tier.
          </h2>
          <p className="text-lg leading-relaxed text-pretty mb-10 text-ink-muted">
            The first 100 Foundation subscribers get treated like the founders they are. This is
            permanent. The benefits don&rsquo;t expire when you cancel and resubscribe.
          </p>
          <ul role="list" className="space-y-5">
            {[
              ["01", "$19/mo locked forever.", "Future price increases (and they're coming) won't touch you."],
              ["02", "Founding Member badge", "in Discord and on the subscriber portal."],
              ["03", "First-pick", "on every early-access window — Apotheosis beta seats, BookStack verticals, AWA pilots — before the rest of the subscriber base."],
              ["04", "A retroactive Founding Member NFT", "on NeoHood's Genesis Block when the chain ships (years out — see below). Non-equity. Non-financial. A provable timestamp that says you were here at the start."],
            ].map(([num, bold, rest]) => (
              <li key={num} className="flex gap-4">
                <span className="mono-label text-xs flex-shrink-0 mt-1 text-accent-bright">{num}</span>
                <p className="text-base leading-relaxed text-ink-primary">
                  <strong className="font-semibold">{bold}</strong> {rest}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Retroactive NFT explanation */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-6">
          About the Founding Member NFT.
        </h2>
        <div className="space-y-5 text-ink-muted leading-relaxed text-pretty text-base md:text-lg">
          <p>
            Foundation Subscription v1.0 ships with no NFT. The retroactive issuance happens when
            NeoHood&rsquo;s Genesis Block infrastructure goes live, which is years out — likely
            after Apotheosis launches and NeoHood&rsquo;s v0 build kicks off (Q4 2026 earliest).
          </p>
          <p>
            <strong className="text-ink-primary">It&rsquo;s a credential, not equity.</strong> No
            ownership in BS247 LLC. No revenue share. No voting. No financial right of any kind.
            What it confers: a non-fungible badge that proves you were a Foundation Member, with a
            tamper-evident timestamp on the NeoHood chain. That&rsquo;s the entire thing.
          </p>
          <p>
            Why we&rsquo;re mentioning it before it exists: because the commitment to issue it is
            part of what you&rsquo;re paying for. We&rsquo;re putting it in writing now so it&rsquo;s
            a real promise, not a vibe.
          </p>
        </div>
      </section>

      {/* What's NOT in it */}
      <section className="container-x py-16 md:py-20 max-w-3xl">
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-8">
          What&rsquo;s deliberately NOT in it.
        </h2>
        <ul role="list" className="space-y-5 text-base md:text-lg text-ink-muted leading-relaxed">
          <li><strong className="text-ink-primary">No 1-on-1 sessions in the main bundle.</strong> Doesn&rsquo;t scale; positions the founder as service provider; weakens the portfolio framing.</li>
          <li><strong className="text-ink-primary">No done-for-you builds.</strong> Same problem.</li>
          <li><strong className="text-ink-primary">No cohort programs.</strong> Cohort overhead is high; doesn&rsquo;t fit solo-with-agent-leverage.</li>
          <li><strong className="text-ink-primary">No standalone consultation product.</strong> Anyone who needs more than a Setup Session needs an actual SDS consulting engagement — different shape (scoped project), not a glorified consultation.</li>
        </ul>
      </section>

      {/* Setup Session */}
      <section className="container-x py-16 md:py-20 max-w-3xl border-t border-border-subtle">
        <p className="mono-label mb-4">Side-gate · Optional</p>
        <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4">
          Setup Session — $297 one-time.
        </h2>
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty mb-6">
          Want hands-on help getting your stack rotated, your Keychain wrappers in place, your
          Denise persona configured, three starter skills installed, and a custom CLAUDE.md tuned
          to your work? <strong className="text-ink-primary">$297 one-time.</strong>
        </p>
        <p className="text-base md:text-lg text-ink-muted leading-relaxed text-pretty mb-2">
          Async-first via Loom recordings + voice messages with Dailen.
        </p>
        <p className="text-base text-ink-dim leading-relaxed text-pretty">
          Capped at 4 per month. Side gate, not main door.
        </p>
      </section>

      {/* CTA */}
      <section className="container-x pb-32 max-w-3xl">
        <div className="rounded-2xl bg-bg-surface border border-border-subtle p-8 md:p-12">
          <h2 className="display-section text-3xl md:text-4xl text-ink-primary mb-4 text-balance">
            {FOUNDATION_LIVE ? "Subscribe — $19/mo." : "Get the launch ping."}
          </h2>
          <p className="text-base md:text-lg text-ink-muted mb-8 leading-relaxed">
            {FOUNDATION_LIVE
              ? "Stripe Checkout. Cancel anytime. Auto-converts to Apotheosis Pro at launch."
              : "We'll send one email when Foundation Subscription opens. No drip sequence."}
          </p>

          {FOUNDATION_LIVE ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <form action={startFoundationCheckout}>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent text-bg-primary px-7 py-4 font-semibold hover:bg-accent-bright transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Subscribe — $19/mo
                  <span aria-hidden="true">→</span>
                </button>
              </form>
              <form action={startSetupCheckout}>
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border-subtle text-ink-primary px-7 py-4 font-medium hover:border-accent hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Setup Session — $297
                </button>
              </form>
            </div>
          ) : (
            <p className="text-sm text-ink-dim italic">
              Email capture wires up here when Resend + domain land. Newsletter form in the footer
              works for now.
            </p>
          )}
        </div>
      </section>
    </article>
  );
}
