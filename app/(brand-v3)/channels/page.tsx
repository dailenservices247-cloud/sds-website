// app/(brand-v3)/channels/page.tsx
//
// /channels — the four YouTube channels, each carrying its real state.
//
// This route also fixes a live bug. The homepage previously linked to
// /channels/allday and /channels/day-one; neither route existed, and the first
// advertised Allday 24seven, which was RETIRED 2026-05-21 into Day One AI. Both
// links now point here.
//
// Status labels are honest by design, same discipline as /portfolio: Forgd and
// Husbandry are published shells with no episodes yet, Day One AI's first video
// is packaged and waiting on a recording session, and DEVIANT's monetisation is
// still an open question. None of that is hidden.

import type { Metadata } from "next";
import { channels } from "@/lib/content/channels";
import { SITE_URL } from "@/lib/site-config";

const DESCRIPTION =
  "Four channels from Synapse Dynamics: Day One AI, Forgd, Husbandry, and DEVIANT. Each carries its real state — launching, in production, or in development.";

export const metadata: Metadata = {
  title: { absolute: "Channels · Synapse Dynamics" },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/channels` },
  openGraph: {
    title: "Channels · Synapse Dynamics",
    description: DESCRIPTION,
    url: `${SITE_URL}/channels`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Channels · Synapse Dynamics",
    description: DESCRIPTION,
  },
};

// Status colour carries meaning, but never alone — every pill also renders its
// uppercase text label, per the WCAG 1.4.1 commitment in PRODUCT.md.
const statusStyle: Record<string, { bg: string; fg: string }> = {
  LAUNCHING: { bg: "rgba(42, 96, 85, 0.22)", fg: "var(--bv3-spine-text)" },
  "IN PRODUCTION": { bg: "rgba(126, 48, 58, 0.22)", fg: "var(--bv3-wine-text)" },
  "IN DEVELOPMENT": {
    bg: "rgba(155, 155, 150, 0.14)",
    fg: "var(--bv3-ink-on-shell-muted, #9b9b96)",
  },
};

export default function ChannelsIndex() {
  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="container-x max-w-4xl pt-24 pb-16 md:pt-36 md:pb-20">
          <p className="bv3-mono mb-6">The Channels</p>
          <h1
            className="bv3-display text-ink-primary text-balance"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)", maxWidth: "18ch" }}
          >
            Four channels. One studio.
          </h1>
          <p className="text-ink-muted mt-8 max-w-3xl text-lg leading-relaxed text-pretty md:text-xl">
            Same rule as the portfolio: each one carries its real state. Two are
            published and waiting on their first episode, one is packaged and
            waiting on a camera, and one is still being argued with.
          </p>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {channels.map((channel) => {
            const tone = statusStyle[channel.status];
            const Card = channel.url ? "a" : "div";
            return (
              <Card
                key={channel.slug}
                {...(channel.url
                  ? {
                      href: channel.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {})}
                className={`border-border-subtle bg-bg-surface block h-full rounded-xl border p-7 transition-all ${
                  channel.url
                    ? "hover:border-accent hover:-translate-y-0.5"
                    : "cursor-default"
                }`}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span
                    className="bv3-mono inline-flex items-center rounded-full px-2.5 py-1 text-[10px]"
                    style={{ backgroundColor: tone.bg, color: tone.fg }}
                  >
                    {channel.status}
                  </span>
                  {channel.handle ? (
                    <span className="bv3-mono text-ink-muted text-[10px]">
                      {channel.handle}
                    </span>
                  ) : null}
                </div>

                <h2
                  className="bv3-display-section text-ink-primary"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)" }}
                >
                  {channel.name}
                </h2>

                <p className="bv3-mono text-ink-muted mt-3 text-[10px]">
                  {channel.format}
                </p>

                <p className="text-ink-primary mt-5 text-lg text-pretty">
                  {channel.tagline}
                </p>

                <p className="text-ink-muted mt-3 leading-relaxed text-pretty">
                  {channel.blurb}
                </p>

                {channel.disclosure ? (
                  <p className="bv3-mono text-ink-muted mt-6 text-[10px]">
                    {channel.disclosure}
                  </p>
                ) : null}

                {channel.url ? (
                  <p
                    className="bv3-mono mt-6 text-[10px]"
                    style={{ color: "var(--bv3-wine-text)" }}
                  >
                    Watch on YouTube →
                  </p>
                ) : null}
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
