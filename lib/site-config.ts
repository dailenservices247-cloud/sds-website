// Single source of truth for the canonical site URL.
// Used by metadata, sitemap, robots, OG image, Stripe appInfo, and legal pages.
export const SITE_URL = "https://synapsedynamics.io";
export const SITE_HOST = "synapsedynamics.io";

// External booking + payment endpoints. Locked 2026-05-14.
// Calendly: O1 AI Architecture Review wedge offering (90 min, $1.5K).
export const CALENDLY_O1_ARCHITECTURE_REVIEW =
  "https://calendly.com/dailenhuntley/ai-architecture-review";
// Stripe Payment Link: O1 AI Architecture Review, $1,500 one-time.
// Product: prod_UWA22LvEYz08vo | Price: price_1TX7it0OE14HosLEE97oGYzi
export const STRIPE_O1_ARCHITECTURE_REVIEW_LINK =
  "https://buy.stripe.com/4gM14fczD5yA8gycE3bjW02";
// Stripe Payment Link: Atomic Note Template Pack, $19 one-time.
// Product: prod_UW8HDFDCGh1cBg | Price: price_1TX61P0OE14HosLEMmAgXsDE
export const STRIPE_ATOMIC_NOTE_PACK_LINK =
  "https://buy.stripe.com/dRmeV50QV8KM0O647xbjW01";
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
