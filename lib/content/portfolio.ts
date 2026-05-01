import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Cpu,
  BookOpen,
  Globe,
  Layers,
  Eye,
  Sprout,
  Heart,
  Wallet,
  Building2,
  Workflow,
  Network,
} from "lucide-react";

// ----------------------------------------------------------------------------
// Portfolio content schema — mirrors AI Hub/PRDs/_portfolio-map.md
// ----------------------------------------------------------------------------
//
// **CANONICAL DOC:** AI Hub/PRDs/_portfolio-map.md is the source of truth.
// This file is hand-synced from it. When the map updates, this file updates.
// Phase 2+ of the redesign adds a CI gate (scripts/check-portfolio-sync.ts)
// that fails the build if this file drifts from the map.
//
// **STATUS LEGEND:**
//   LIVE         — shipping today, customer-facing
//   PRE-LAUNCH   — architecture committed, no users yet
//   CONCEPT      — vision/blueprint, no architecture committed
//   PARKED       — formerly active, paused with a named unblock condition
//   INTERNAL     — surfaced for transparency, not a product
//
// **LAYER LEGEND** (from portfolio map):
//   0    — legal & operating entities
//   1.A  — funnel + services hub (SDS Website)
//   1.B  — experience hub (Super App Platform)
//   1    — live products
//   2    — internal infrastructure
//   3    — pre-launch (architecture committed)
//   4    — horizon (vision/research)
//   5    — service engagements (not products)
//
// ----------------------------------------------------------------------------

export type PortfolioSlug =
  | "scrlpets"
  | "apotheosis"
  | "bookstack"
  | "autonomous-web-agency"
  | "super-app-platform"
  | "see-through"
  | "canine-cleansing-system"
  | "lucid-companion"
  | "sovereign-ledger"
  | "neohood"
  | "n8n-tools"
  | "paperclip";

export type PortfolioStatus =
  | "LIVE"
  | "PRE-LAUNCH"
  | "CONCEPT"
  | "PARKED"
  | "INTERNAL";

export type PortfolioLayer = "1" | "1.A" | "1.B" | "2" | "3" | "4";

export interface MeshConnection {
  /** Internal slug or external label */
  target: string;
  /** Plain-English description of the connection */
  description: string;
}

export interface PortfolioProject {
  slug: PortfolioSlug;
  name: string;
  status: PortfolioStatus;
  layer: PortfolioLayer;

  /** One-sentence positioning, public-safe */
  tagline: string;

  /** 1-3 sentence "what it is" block for the per-product page hero */
  blurb: string;

  /** External live URL (LIVE products only) */
  liveUrl?: string;

  /** When PARKED, the named unblock condition. Required for PARKED, omitted otherwise. */
  parkedUntil?: string;

  /** Audience the product serves (free-form short string) */
  audience: string;

  /** What the product consumes from the rest of the BS247 mesh */
  consumesFromMesh: MeshConnection[];

  /** What the product contributes to the rest of the BS247 mesh */
  contributesToMesh: MeshConnection[];

  /**
   * Whether the per-product page should expose a notify-me email capture.
   * LIVE products: false (they have their own onboarding).
   * PRE-LAUNCH / CONCEPT: true (capture pre-launch interest).
   * PARKED: false (the unblock condition gates capture).
   * INTERNAL: false.
   */
  notifyMeEnabled: boolean;

  /** Open questions to surface honestly on the per-product page (PRE-LAUNCH and CONCEPT only). 0-5. */
  openQuestions: string[];

  /** Lucide icon for cards / hero */
  icon: LucideIcon;

  /** Parent operating entity. All current portfolio items live under SDS. */
  parent: "SDS" | "BS247";
}

// ----------------------------------------------------------------------------
// The portfolio (12 products)
// ----------------------------------------------------------------------------

export const portfolioProjects: PortfolioProject[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // LAYER 1 — Live Products
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: "scrlpets",
    name: "Scrlpets",
    status: "LIVE",
    layer: "1",
    tagline: "Social platform for animal breeders.",
    blurb:
      "A social platform for breeders and pet owners with a TikTok-style feed, BreederOS dashboard, 21 AI tools for pedigree and health, real-time chat, escrow payments, and a PWA wrapper. Live and shipping. Long-term role: the Scroll Pets companion / satellite of the Super App Platform.",
    liveUrl: "https://scrlpets.lovable.app",
    audience: "Animal breeders + pet owners",
    consumesFromMesh: [
      {
        target: "paperclip",
        description: "Agent orchestration for the AI tools that run inside BreederOS",
      },
    ],
    contributesToMesh: [
      {
        target: "apotheosis",
        description: "Breeder-AI tool patterns become candidate skill clusters in the Apotheosis Hub",
      },
    ],
    notifyMeEnabled: false,
    openQuestions: [],
    icon: Sparkles,
    parent: "SDS",
  },

  {
    slug: "n8n-tools",
    name: "n8n SEO Tool",
    status: "LIVE",
    layer: "1",
    tagline: "Funnel infrastructure for SDS lead generation.",
    blurb:
      "A Cloud Run n8n workflow with Supabase Postgres backing and Gemini API routing, exposed at /webhook/seo-audit. Embedded behind the SDS Website to capture leads via free SEO audits. Lives in the funnel layer; not a customer-facing product.",
    audience: "SDS lead-gen pipeline",
    consumesFromMesh: [
      {
        target: "Supabase",
        description: "Postgres + auth backing the n8n state",
      },
    ],
    contributesToMesh: [
      {
        target: "sds-consulting",
        description: "Captured leads route into the SDS consulting funnel",
      },
    ],
    notifyMeEnabled: false,
    openQuestions: [],
    icon: Workflow,
    parent: "SDS",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LAYER 2 — Internal Infrastructure (visible for transparency)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: "paperclip",
    name: "Paperclip",
    status: "INTERNAL",
    layer: "2",
    tagline: "Agent orchestration substrate that runs underneath everything.",
    blurb:
      "An agent orchestration substrate running locally on http://localhost:3100. Hosts five named agents (Strategist, Architect, Automator, Analyst, Researcher) plus per-product agent personas. Not a product — surfaced here for transparency about the engine that runs the rest.",
    audience: "Internal infrastructure",
    consumesFromMesh: [],
    contributesToMesh: [
      {
        target: "apotheosis",
        description: "Default orchestration substrate for the Apotheosis runtime",
      },
      {
        target: "scrlpets",
        description: "Powers the agent layer behind the BreederOS AI tools",
      },
    ],
    notifyMeEnabled: false,
    openQuestions: [],
    icon: Network,
    parent: "SDS",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LAYER 3 — Pre-Launch (architecture committed, no users yet)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: "apotheosis",
    name: "Apotheosis",
    status: "PRE-LAUNCH",
    layer: "3",
    tagline: "AI working assistant for people brand new to AI.",
    blurb:
      "A developer-centric AI harness that orchestrates multi-model agents into a working assistant — designed for people who tried Lovable, Replit, or Base44 and got stuck, plus people who haven't tried any AI tool yet. v9.3 spec locked; 34-week build; v1.0 ships before August 2, 2026 (EU AI Act deadline).",
    audience: "AI newcomers + people burned by no-code",
    consumesFromMesh: [
      {
        target: "paperclip",
        description: "Default orchestration substrate",
      },
      {
        target: "neohood",
        description: "Sovereign Engine candidate intelligence layer (open question)",
      },
    ],
    contributesToMesh: [
      {
        target: "scrlpets",
        description: "Hub marketplace seeded by Scrlpets users + breeder skill clusters",
      },
      {
        target: "bookstack",
        description: "Apotheosis Pro auto-conversion target for Foundation Subscription",
      },
    ],
    notifyMeEnabled: true,
    openQuestions: [
      "Does Apotheosis live inside the Super App Platform as the dev-tools module, or alongside as a sibling?",
      "Which v9.3 primitives flow throughout the mesh regardless of where Apotheosis-the-product lives?",
      "Web-first PWA, iOS-first native, or both?",
    ],
    icon: Cpu,
    parent: "SDS",
  },

  {
    slug: "bookstack",
    name: "BookStack",
    status: "PRE-LAUNCH",
    layer: "3",
    tagline: "Programmatic-SEO affiliate site for bookkeepers.",
    blurb:
      "A programmatic-SEO affiliate site comparing 10 SaaS tools in the bookkeeping vertical. Phase 1 ships 20 seed pages; Phase 2 expands to 100-300 programmatic comparisons; Phase 3 adds long-tail. Path to revenue: $1 first affiliate in 90 days, target $3-5K MRR by month 9.",
    audience: "Bookkeepers searching SaaS comparisons",
    consumesFromMesh: [
      {
        target: "apotheosis",
        description: "Quality gate for content (planned post-Apotheosis launch)",
      },
    ],
    contributesToMesh: [
      {
        target: "awa",
        description: "Validates the programmatic-SEO playbook AWA productizes",
      },
    ],
    notifyMeEnabled: true,
    openQuestions: [
      "Vertical 2 selection — bookkeeping is V1; what's V2?",
      "Affiliate stack lock — which 10 SaaS tools land first?",
    ],
    icon: BookOpen,
    parent: "SDS",
  },

  {
    slug: "autonomous-web-agency",
    name: "Autonomous Web Agency",
    status: "PRE-LAUNCH",
    layer: "3",
    tagline: "Multi-agent micro-SaaS site builder for small businesses.",
    blurb:
      "A $250 site builder where a multi-agent council generates a watermarked demo, sends outbound to the prospect, processes Stripe checkout on conversion, and hands over GitHub + Vercel + DNS. Volume play. Phase 0: manual proof-of-concept. Phase 1: full automation. Working name AWA — final naming locks at validation.",
    audience: "SMBs without web presence",
    consumesFromMesh: [
      {
        target: "paperclip",
        description: "Multi-agent council orchestration",
      },
      {
        target: "apotheosis",
        description: "Underlying agent harness (post-launch)",
      },
    ],
    contributesToMesh: [
      {
        target: "sds-consulting",
        description: "Lead-gen for higher-tier Architect engagements",
      },
    ],
    notifyMeEnabled: true,
    openQuestions: [
      "Does Phase 0 prove the unit economics ($250 vs $497 A/B)?",
      "Which vertical lands first?",
      "Cold email + watermarked demo flow — does it convert without a sales call?",
    ],
    icon: Globe,
    parent: "SDS",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LAYER 1.B — The Experience Hub (CONCEPT)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: "super-app-platform",
    name: "Super App Platform",
    status: "CONCEPT",
    layer: "1.B",
    tagline: "Consumer-facing umbrella platform navigated by spatial cognition.",
    blurb:
      "A consumer-facing platform — not just an app — that uses spatial cognition as the navigation primitive. Other products plug in as verticals: finance, health, social, creativity, art. Liquid UI adapts to context. Scroll Pets is the companion / satellite. Pre-blueprint; v1.5 or v2.0 territory after Apotheosis ships. Working name TBD.",
    audience: "Consumers (broad)",
    consumesFromMesh: [
      {
        target: "scrlpets",
        description: "Scroll Pets companion is the navigator satellite",
      },
      {
        target: "apotheosis",
        description: "Candidate dev-tools module (open question)",
      },
      {
        target: "neohood",
        description: "Sovereign Engine integrates throughout per ecosystem-wide intelligence pattern",
      },
    ],
    contributesToMesh: [
      {
        target: "all-products",
        description: "Designed as a substrate other products plug into as satellites",
      },
    ],
    notifyMeEnabled: true,
    openQuestions: [
      "What's the name?",
      "What's the MVP module set — which 1-2 verticals ship first?",
      "Web-first PWA, iOS-first native, or both?",
      "Apotheosis-as-module-vs-sibling — and which primitives flow throughout regardless?",
    ],
    icon: Layers,
    parent: "SDS",
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LAYER 4 — Horizon (vision/research)
  // ──────────────────────────────────────────────────────────────────────────

  {
    slug: "see-through",
    name: "See Through",
    status: "PARKED",
    layer: "4",
    tagline: "Horizon product — full vision, ready to prototype.",
    blurb:
      "A Horizon product with a complete vision document, sequenced first in build-order. Parked behind Apotheosis launch. Surface and pricing model undecided.",
    parkedUntil: "After Apotheosis v1.0 ships (post-Aug 2026)",
    audience: "TBD at unblock",
    consumesFromMesh: [],
    contributesToMesh: [],
    notifyMeEnabled: true,
    openQuestions: [
      "iOS-first vs desktop?",
      "Pricing model?",
      "Apple Intelligence differentiation?",
    ],
    icon: Eye,
    parent: "SDS",
  },

  {
    slug: "canine-cleansing-system",
    name: "Canine Cleansing System",
    status: "PARKED",
    layer: "4",
    tagline: "Horizon product — deep formulation complete.",
    blurb:
      "A Horizon product with deep formulation work complete, sequenced second in build-order. Parked behind Apotheosis launch and the manufacturing partnership question.",
    parkedUntil: "Manufacturing partner secured + Apotheosis v1.0 ships",
    audience: "TBD at unblock",
    consumesFromMesh: [],
    contributesToMesh: [],
    notifyMeEnabled: true,
    openQuestions: [
      "D2C vs B2B distribution?",
      "Scrlpets cross-promo mechanics?",
      "Manufacturing partner selection?",
    ],
    icon: Sprout,
    parent: "SDS",
  },

  {
    slug: "lucid-companion",
    name: "Lucid Companion",
    status: "PARKED",
    layer: "4",
    tagline: "Horizon product — research-paper / unified-arch concept.",
    blurb:
      "A Horizon product based on the Heart-and-Hard-Facts + Technosubjunctivity research framework. Sequenced third in build-order. Parked behind MVP-shape decision.",
    parkedUntil: "MVP shape selected (Lucid Therapist? Transparent Tutor?) + Apotheosis ships",
    audience: "TBD at unblock",
    consumesFromMesh: [],
    contributesToMesh: [],
    notifyMeEnabled: true,
    openQuestions: [
      "MVP shape — Lucid Therapist? Transparent Tutor? Something else?",
      "Regulatory posture for therapy-adjacent applications?",
    ],
    icon: Heart,
    parent: "SDS",
  },

  {
    slug: "sovereign-ledger",
    name: "Sovereign Ledger",
    status: "PARKED",
    layer: "4",
    tagline: "Horizon product — strategy / concept only.",
    blurb:
      "A Horizon product addressing cross-game asset interoperability. Sequenced fourth in build-order. Parked behind regulatory clarity and revenue-funded distribution capacity.",
    parkedUntil: "First revenue funded + regulatory environment matures",
    audience: "TBD at unblock",
    consumesFromMesh: [],
    contributesToMesh: [],
    notifyMeEnabled: true,
    openQuestions: [
      "Cross-game asset interop — regulatory posture?",
      "Distribution path?",
    ],
    icon: Wallet,
    parent: "SDS",
  },

  {
    slug: "neohood",
    name: "NeoHood",
    status: "PARKED",
    layer: "4",
    tagline: "Horizon product — Master Plan v8.0 + Sovereign Engine PRD.",
    blurb:
      "The most ambitious Horizon product. Master Plan v8.0 + freshly-locked Sovereign Engine PRD (2026-04-28). Sovereign Engine is a candidate intelligence layer for Apotheosis. Multi-pillar: ForgeRealms (visual runtime), Sovereign Engine (LLM + Expression Parser + n8n routing), Wyoming DUNA legal wrapper, NFT/blockchain primitives. v0 build begins post-Apotheosis launch.",
    parkedUntil: "Apotheosis v1.0 ships → NeoHood Sovereign Engine v0 build begins (3-6 months post-launch)",
    audience: "TBD — gaming + creator economy + Web3-curious",
    consumesFromMesh: [
      {
        target: "apotheosis",
        description: "May share the underlying agent harness, depending on Sovereign-Engine-as-Apotheosis-intelligence-layer decision",
      },
    ],
    contributesToMesh: [
      {
        target: "all-products",
        description: "Sovereign Engine integrates throughout the ecosystem (Google-Stack-AI pattern). Foundation Subscription Founding Members receive retroactive non-equity Founding Member NFTs on the NeoHood Genesis Block when it ships.",
      },
    ],
    notifyMeEnabled: true,
    openQuestions: [
      "Sovereign Engine as Apotheosis's intelligence layer — yes or alongside?",
      "First pillar — ForgeRealms?",
      "Wyoming DUNA legal wrapper timing?",
    ],
    icon: Building2,
    parent: "SDS",
  },
];

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

export function getProjectBySlug(
  slug: PortfolioSlug,
): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function projectsByStatus(
  status: PortfolioStatus,
): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.status === status);
}

export function projectsByLayer(
  layer: PortfolioLayer,
): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.layer === layer);
}

/**
 * Default sort order for the /portfolio index:
 * LIVE first, then PRE-LAUNCH, then CONCEPT, then PARKED, then INTERNAL last.
 * Within a status group, alphabetical by name.
 */
const STATUS_ORDER: Record<PortfolioStatus, number> = {
  LIVE: 0,
  "PRE-LAUNCH": 1,
  CONCEPT: 2,
  PARKED: 3,
  INTERNAL: 4,
};

export function sortedPortfolio(): PortfolioProject[] {
  return [...portfolioProjects].sort((a, b) => {
    const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
    if (statusDiff !== 0) return statusDiff;
    return a.name.localeCompare(b.name);
  });
}

/**
 * Status badge metadata for UI rendering. Colors map to Tailwind classes
 * the /portfolio routes will use.
 */
export const statusBadge: Record<
  PortfolioStatus,
  { label: string; className: string; emoji: string }
> = {
  LIVE: {
    label: "Live",
    emoji: "🟢",
    className: "bg-emerald-100 text-emerald-900 border-emerald-300",
  },
  "PRE-LAUNCH": {
    label: "Pre-launch",
    emoji: "🟡",
    className: "bg-amber-100 text-amber-900 border-amber-300",
  },
  CONCEPT: {
    label: "Concept",
    emoji: "🔵",
    className: "bg-sky-100 text-sky-900 border-sky-300",
  },
  PARKED: {
    label: "Parked",
    emoji: "⏳",
    className: "bg-zinc-100 text-zinc-700 border-zinc-300",
  },
  INTERNAL: {
    label: "Internal",
    emoji: "🟠",
    className: "bg-orange-100 text-orange-900 border-orange-300",
  },
};
