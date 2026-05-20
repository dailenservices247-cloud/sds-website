// Single source of truth for the canonical site URL.
// Used by metadata, sitemap, robots, OG image, Stripe appInfo, and legal pages.
export const SITE_URL = "https://synapsedynamics.io";
export const SITE_HOST = "synapsedynamics.io";

// External booking + payment endpoints. Locked 2026-05-14.
// O1 Architecture Review = 3-tier ladder (locked 2026-05-20).
// Decision: AI Hub/Decisions/decision-2026-05-20-o1-review-three-tier-ladder.md
// 60-day check at 2026-07-19 evaluates sunset/keep on each tier.
//
// Calendly: single booking link for all O1 tiers. Tier assignment happens
// at intake form / payment, not booking step.
export const CALENDLY_O1_ARCHITECTURE_REVIEW =
  "https://calendly.com/dailenhuntley/ai-architecture-review";
// Stripe Payment Link: O1 Architecture Review — Essentials, $1,500 one-time.
// Product: prod_UWA22LvEYz08vo | Price: price_1TX7it0OE14HosLEE97oGYzi
// (Existing constant kept for backward-compat; alias as ESSENTIALS_LINK below.)
export const STRIPE_O1_ARCHITECTURE_REVIEW_LINK =
  "https://buy.stripe.com/4gM14fczD5yA8gycE3bjW02";
export const STRIPE_O1_REVIEW_ESSENTIALS_LINK = STRIPE_O1_ARCHITECTURE_REVIEW_LINK;
// Stripe Payment Link: O1 Architecture Review — Standard, $2,500 one-time.
// Product: prod_UY8ioZWXdNmk7e | Price: price_1TZ2RN0OE14HosLECzHpxOEy
// Created 2026-05-20 via Stripe MCP per tier-ladder decision.
export const STRIPE_O1_REVIEW_STANDARD_LINK =
  "https://buy.stripe.com/5kQ14fbvzbWYdASdI7bjW05";
// Stripe Payment Link: O1 Architecture Review — Premium, $5,000 one-time.
// Product: prod_UY8iz2p15RjyCz | Price: price_1TZ2RQ0OE14HosLEj4xLUaV7
// Created 2026-05-20 via Stripe MCP per tier-ladder decision.
export const STRIPE_O1_REVIEW_PREMIUM_LINK =
  "https://buy.stripe.com/bJeeV5eHL3qsdASavVbjW06";
// Stripe Payment Link: Atomic Note Template Pack, $19 one-time.
// Product: prod_UW8HDFDCGh1cBg | Price: price_1TX61P0OE14HosLEMmAgXsDE
export const STRIPE_ATOMIC_NOTE_PACK_LINK =
  "https://buy.stripe.com/dRmeV50QV8KM0O647xbjW01";
// Stripe Payment Link: SDS Anti-Slop Skill Pack v1, $49 one-time.
// Product: prod_UYHepwPCSLkGHn | Price: price_1TZB5h0OE14HosLExW7omrAZ
// Created 2026-05-20 via Stripe MCP. ICP overlap with Stack v1
// (per decision-2026-05-20-stack-v1-icp-solo-ai-builder-context-drift.md).
export const STRIPE_ANTI_SLOP_SKILL_PACK_LINK =
  "https://buy.stripe.com/3cI3cnbvzf9a0O647xbjW07";
// Stripe Payment Link: Peer Operator's Stack v1, $149 one-time.
// Product: prod_UWlvMzls8Yi1wO. Recreated via Dashboard 2026-05-16 to attach
// confirmation message (markdown) + custom field "Where did you hear about
// the Stack?" (optional text). Old API-created link
// plink_1TXiOM0OE14HosLEgb3YaDU4 deactivated.
export const STRIPE_PEER_OPERATOR_STACK_LINK =
  "https://buy.stripe.com/eVqcMX1UZaSU0O69rRbjW04";

// Skool community: Synapse Studio (Hobby tier, $9/mo). Private group.
// Pro upgrade ($99/mo) unlocks custom URL (community.synapsedynamics.io)
// and lower transaction fees; trigger when gross MRR exceeds ~$100/mo.
export const SKOOL_SYNAPSE_STUDIO =
  "https://www.skool.com/synapse-studio-8041";

// Tally intake form: O1 AI Architecture Review (13 questions).
// Drives prospect from Stripe-paid -> intake -> 90-min call.
// Spec: AI Hub/PRDs/o1-architecture-review-intake-spec.md
export const TALLY_O1_INTAKE_FORM = "https://tally.so/r/D4xzQR";
