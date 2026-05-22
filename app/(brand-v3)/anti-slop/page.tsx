// app/(brand-v3)/anti-slop/page.tsx
//
// Pre-purchase product page for SDS Anti-Slop Skill Pack v1.
// $49 productized Claude skill — strips banned phrases / hype-tone /
// AI-influencer vocabulary / filler intensifiers before publish.
//
// Lives under the brand-v3 route group, V3 Cursor register.
//
// ICP overlap with Stack v1 (per
// AI Hub/Decisions/decision-2026-05-20-stack-v1-icp-solo-ai-builder-context-drift.md):
// the same solo AI builder who's lost a session to context drift also
// hits voice drift in their own content. This pack is the second-product
// cross-sell to Stack v1 buyers.
//
// Pending Dailen action (banked): Resend post-purchase email automation
// + Stripe confirmation message linking to zip download. Until wired, the
// page links the zip directly (URL-soft-gate via Stripe success page).

import type { Metadata } from "next";
import {
  STRIPE_ANTI_SLOP_SKILL_PACK_LINK,
  SITE_URL,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title:
    "SDS Anti-Slop Skill Pack v1 — strip hype + filler from your drafts | Synapse Dynamics Segmented",
  description:
    "A Claude skill that strips banned phrases, hype-tone, AI-influencer vocabulary, and filler intensifiers from your writing before you ship. $49 once. Lifetime v1.x access. 14-day refund.",
  alternates: { canonical: `${SITE_URL}/anti-slop` },
  openGraph: {
    title: "SDS Anti-Slop Skill Pack v1",
    description:
      "Claude skill that strips hype, filler, and AI-influencer vocabulary before publish. $49.",
    url: `${SITE_URL}/anti-slop`,
    type: "website",
  },
};

const PACK_CONTENTS = [
  {
    file: "SKILL.md",
    purpose: "The Claude skill itself. Paste into Custom Instructions or save at ~/.claude/skills/anti-slop/SKILL.md",
  },
  {
    file: "banned-words-list.md",
    purpose: "Six-category blocklist: hype / filler / influencer / grindset / exit / scarcity. With replacement suggestions.",
  },
  {
    file: "voice-fingerprint-scan.md",
    purpose: "4-check pre-publish pass (Specific / Honest / Peer / Banned-phrase). Run on every draft.",
  },
  {
    file: "usage-examples.md",
    purpose: "10 before/after rewrites from real production work — landing pages, posts, DMs, scripts.",
  },
  {
    file: "INSTALL.md",
    purpose: "Three install modes (Claude.ai / Claude Code / Project knowledge).",
  },
  {
    file: "LICENSE.md",
    purpose: "MIT licensed. Fork the blocklist for your own brand.",
  },
  {
    file: "CHANGELOG.md",
    purpose: "v1.0 ship notes + v1.1+ banked items.",
  },
];

const PROBLEMS_SOLVED = [
  {
    name: "Hype drift",
    what: "AI tools default to \"supercharge,\" \"unlock,\" \"transform,\" \"10x.\" Your draft slides into that register without you noticing.",
  },
  {
    name: "Filler intensifiers",
    what: "\"Just,\" \"really,\" \"basically,\" \"actually,\" \"simply\" pile up across paragraphs. Each one weakens the sentence.",
  },
  {
    name: "AI-influencer vocabulary",
    what: "\"Leverage,\" \"level up,\" \"game-changer,\" \"imagine if you could.\" Reads as someone copying influencers, not as your voice.",
  },
  {
    name: "Motivational-grindset",
    what: "\"Hustle,\" \"grind,\" \"passionate,\" \"side hustle,\" \"lock in.\" Audience-coding signals you may not actually want to signal.",
  },
  {
    name: "Exit-fetishism + scarcity-FOMO",
    what: "\"$100M exit,\" \"build a billion-dollar business,\" \"get it while the getting's good.\" Bad signal for serious operators.",
  },
];

export default function AntiSlopPage() {
  return (
    <main
      className="min-h-screen px-6 py-16 md:px-12 md:py-24"
      style={{ color: "var(--bv3-ink)" }}
    >
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <p
          className="bv3-mono"
          style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
        >
          MICRO PRODUCT / A1
        </p>

        <h1
          className="bv3-display mt-4 text-5xl md:text-6xl"
          style={{ color: "var(--bv3-ink-strong)", lineHeight: 0.95 }}
        >
          Anti-Slop Skill Pack v1
        </h1>

        <p
          className="mt-6 text-lg leading-relaxed"
          style={{ color: "var(--bv3-cream)", maxWidth: "60ch" }}
        >
          A Claude skill that strips banned phrases, hype-tone,
          AI-influencer vocabulary, and filler intensifiers from your
          writing before you ship. Built from the production brand-voice
          linter I use inside Black Sheep 247 LLC.
        </p>

        {/* Pill row */}
        <ul
          className="bv3-mono mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs"
          style={{ color: "var(--bv3-ink-muted)", letterSpacing: "0.12em" }}
        >
          <li>$49 ONCE</li>
          <li>LIFETIME V1.X ACCESS</li>
          <li>14-DAY REFUND</li>
          <li>MIT LICENSED</li>
          <li>8 FILES / ~20 KB ZIP</li>
        </ul>

        {/* Buy CTA above the fold */}
        <section className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={STRIPE_ANTI_SLOP_SKILL_PACK_LINK}
            className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: "var(--bv3-gold)",
              color: "var(--bv3-shell)",
            }}
          >
            Buy the Pack — $49
          </a>
          <a
            href="#what-it-solves"
            className="rounded-md px-6 py-4 text-base"
            style={{
              border: "1px solid var(--bv3-border-strong)",
              color: "var(--bv3-ink)",
            }}
          >
            See what it solves
          </a>
        </section>

        {/* What it solves */}
        <section
          id="what-it-solves"
          className="mt-16 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            FIVE PROBLEMS NAMED
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What the pack catches
          </h2>

          <ul className="mt-6 flex flex-col gap-5">
            {PROBLEMS_SOLVED.map((p, i) => (
              <li key={p.name} className="flex items-start gap-4">
                <span
                  className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                  style={{
                    color: "var(--bv3-gold-bright)",
                    border: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="bv3-display text-lg"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {p.name}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink)" }}
                  >
                    {p.what}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* What's in the pack */}
        <section className="mt-16">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            INVENTORY / 8 FILES
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            What&apos;s in the zip
          </h2>

          <ul className="mt-6 flex flex-col gap-3">
            {PACK_CONTENTS.map((item) => (
              <li key={item.file} className="flex items-start gap-4">
                <span
                  className="bv3-mono mt-1 shrink-0 rounded px-2 py-0.5 text-xs"
                  style={{
                    color: "var(--bv3-gold-bright)",
                    border: "1px solid var(--bv3-border-subtle)",
                  }}
                >
                  FILE
                </span>
                <span className="flex-1">
                  <code
                    className="bv3-mono text-sm"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {item.file}
                  </code>
                  <span
                    className="ml-3 text-sm"
                    style={{ color: "var(--bv3-ink-muted)" }}
                  >
                    {item.purpose}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* How to use */}
        <section className="mt-16">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            HOW TO USE
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Three install modes
          </h2>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Pick the one that fits how you use Claude:
          </p>

          <ol className="mt-6 flex flex-col gap-5">
            {[
              {
                step: "01",
                title: "Claude.ai (web / mobile)",
                body: "Settings → Custom Instructions → paste SKILL.md. Done. Use anywhere on claude.ai.",
              },
              {
                step: "02",
                title: "Claude Code (local CLI)",
                body: "Copy SKILL.md + supporting files to ~/.claude/skills/anti-slop/. Skill auto-discovered in every session.",
              },
              {
                step: "03",
                title: "Project knowledge (brand-layered)",
                body: "Upload to a Claude.ai Project alongside your brand voice doc. Skill applies default blocklist + your brand-specific layer.",
              },
            ].map((s) => (
              <li key={s.step} className="flex items-start gap-4">
                <span
                  className="bv3-mono shrink-0 rounded-md px-3 py-1 text-xs"
                  style={{
                    color: "var(--bv3-gold-bright)",
                    border: "1px solid var(--bv3-border-subtle)",
                    letterSpacing: "0.14em",
                  }}
                >
                  {s.step}
                </span>
                <div>
                  <h3
                    className="bv3-display text-lg"
                    style={{ color: "var(--bv3-cream)" }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p
            className="mt-6 leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "60ch", fontSize: "0.875rem" }}
          >
            Full install steps in <code className="bv3-mono">INSTALL.md</code> inside the pack.
          </p>
        </section>

        {/* Forking guidance */}
        <section className="mt-16">
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            FORK IT
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            The default blocklist is opinionated.
          </h2>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            The default reflects SDS / Black Sheep 247 voice (Hormozi
            specificity + Nate B Jones measured tempo + anti-hype
            anti-influencer-bro posture). Your brand may differ.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            Fork the list. Remove what your brand actually wants. Add
            phrases that don&apos;t belong in your voice. Adjust replacement
            suggestions to your brand&apos;s preferred phrasing. The skill
            reads whatever blocklist you point it at.
          </p>

          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            The value isn&apos;t the specific list. It&apos;s the discipline
            of having one + running every draft through it before you ship.
          </p>
        </section>

        {/* Bottom CTA + Stack cross-sell */}
        <section
          className="mt-16 rounded-md p-6 md:p-8"
          style={{
            backgroundColor: "var(--bv3-shell-deep)",
            border: "1px solid var(--bv3-border-subtle)",
          }}
        >
          <p
            className="bv3-mono text-xs"
            style={{ color: "var(--bv3-gold)", letterSpacing: "0.18em" }}
          >
            NEXT STEP
          </p>
          <h2
            className="bv3-display mt-2 text-2xl md:text-3xl"
            style={{ color: "var(--bv3-ink-strong)" }}
          >
            Stop shipping slop.
          </h2>
          <p
            className="mt-4 leading-relaxed"
            style={{ color: "var(--bv3-ink)", maxWidth: "60ch" }}
          >
            $49 once. Lifetime v1.x access. 14-day refund. If the pack
            doesn&apos;t pay for itself inside two drafts run through it,
            email me and I refund.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={STRIPE_ANTI_SLOP_SKILL_PACK_LINK}
              className="rounded-md px-6 py-4 text-base font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "var(--bv3-gold)",
                color: "var(--bv3-shell)",
              }}
            >
              Buy the Pack — $49
            </a>
            <a
              href="/stack"
              className="rounded-md px-6 py-4 text-base"
              style={{
                border: "1px solid var(--bv3-border-strong)",
                color: "var(--bv3-ink)",
              }}
            >
              Or get the full Stack v1 — $149
            </a>
          </div>

          <p
            className="mt-6 text-xs leading-relaxed"
            style={{ color: "var(--bv3-ink-muted)", maxWidth: "60ch" }}
          >
            Stack v1 ($149) includes the brand-voice linter as Skill 05,
            plus 19 other patterns. If you&apos;re going to buy both, buy
            Stack v1 — the Anti-Slop pack is included.
          </p>
        </section>

        {/* Status bar footer */}
        <footer
          className="mt-24 flex flex-wrap items-center justify-between gap-2 border-t pt-6 text-xs"
          style={{
            borderColor: "var(--bv3-border-subtle)",
            color: "var(--bv3-ink-dim)",
          }}
        >
          <p className="bv3-mono" style={{ letterSpacing: "0.14em" }}>
            A1 / V1.0 / DAILEN HUNTLEY / SYNAPSE DYNAMICS SEGMENTED
          </p>
          <p>
            <a
              href="/"
              style={{ color: "var(--bv3-gold)", textDecoration: "underline" }}
            >
              ← Synapse Dynamics
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
