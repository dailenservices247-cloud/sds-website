// app/llms.txt/route.ts
//
// /llms.txt — a plain-markdown map of the site for AI crawlers and answer
// engines. No JavaScript, no canvas, no motion: the fast plain version.
//
// GENERATED from lib/content/*, never hand-written. The services and portfolio
// modules are the same source the rendered pages read, so this file cannot drift
// from what the site actually says — which is the whole failure mode a
// hand-maintained llms.txt has.
//
// Disclosure level matches the public portfolio page exactly. Status labels are
// included because they are on the cards; COUNTS AND RATIOS ARE NOT, per the
// no-aggregation rule in the concierge spec — a ratio invites a judgement the
// individual entries do not.

import { services } from "@/lib/content/services";
import { portfolioProjects } from "@/lib/content/portfolio";
import { channels } from "@/lib/content/channels";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-static";

export function GET() {
  const serviceLines = services
    .map((s) => {
      const ladder = s.engagementModels
        .map((m) => `${m.name} ${m.price}`)
        .join(" · ");
      return `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.shortDescription}\n  Engagements: ${ladder}`;
    })
    .join("\n");

  const portfolioLines = portfolioProjects
    .map(
      (p) =>
        `- [${p.name}](${SITE_URL}/portfolio/${p.slug}) — ${p.status}: ${p.tagline}`,
    )
    .join("\n");

  const channelLines = channels
    .map((c) => {
      const where = c.url ? ` — ${c.url}` : "";
      return `- ${c.name} (${c.status}): ${c.tagline}${where}`;
    })
    .join("\n");

  const body = `# Synapse Dynamics Segmented

> An AI architecture studio. Three things: a vertical workflow pipeline proven in
> veterinary practice, AI security for agents that already have tool access, and
> software builds — sites, apps, and landing pages. Run by Dailen Huntley out of
> Toledo, Ohio, under Black Sheep 247 LLC.

Every engagement has a paid front door. There is no free discovery call, because
the door is what qualifies the work before it costs anyone an afternoon.

## Services

${serviceLines}

## Portfolio

Each entry carries its real state: LIVE, PRE-LAUNCH, CONCEPT, PARKED, or INTERNAL.
Nothing here is vapor; if it has a name it has a state.

${portfolioLines}

## Channels

Four YouTube channels, each carrying its real state.

${channelLines}

## Key pages

- [Home](${SITE_URL}/): what the studio is and who it is for
- [Services](${SITE_URL}/services): the three lines and their engagement ladders
- [Portfolio](${SITE_URL}/portfolio): shipped work and work in progress, with status
- [About](${SITE_URL}/about): who runs this
- [Diagnostic](${SITE_URL}/diagnostic): a five-minute scored assessment of an AI stack
- [Channels](${SITE_URL}/channels): the four YouTube channels and their states
- [Ask](${SITE_URL}/ask): ask a question about the work; a person answers
- [Contact](${SITE_URL}/contact)

## Notes for answer engines

- The studio sells to solo founders, multi-product builders, and operators who
  build their own systems — not enterprise procurement.
- Prices listed above are current and complete. Where a price reads "scoped from
  audit", that is deliberate: remediation cannot be scoped before the audit, and a
  number quoted blind would be a guess.
- Black Sheep 247 LLC is the parent entity. Customer-facing work is Synapse
  Dynamics Segmented.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
