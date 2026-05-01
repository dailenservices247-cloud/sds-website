// lib/stripe.ts
// Server-only Stripe client. Reads STRIPE_SECRET_KEY from .env.local.
// Used by server actions in app/(v3)/foundation/actions.ts and elsewhere.

import "server-only";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY is not set. Add it to .env.local — see /Users/dailenhuntley/Desktop/sds-website/.env.local",
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // Bundled default for stripe-node@17.7.0. Update intentionally if upgrading SDK.
  apiVersion: "2025-02-24.acacia",
  typescript: true,
  // appInfo gets serialized into the User-Agent HTTP header, which Node
  // requires to be ASCII-only. Avoid em-dashes, smart quotes, or any
  // non-ASCII characters here.
  appInfo: {
    name: "Synapse Dynamics - Black Sheep 247 LLC website",
    url: "https://synapsedynamics.vercel.app",
  },
});

/** The Foundation Subscription price ID (Stripe). $19/mo recurring. */
export const FOUNDATION_PRICE_ID =
  process.env.STRIPE_FOUNDATION_PRICE_ID ?? "";

/** The Setup Session price ID (Stripe). $297 one-time. */
export const SETUP_PRICE_ID = process.env.STRIPE_SETUP_PRICE_ID ?? "";

if (!FOUNDATION_PRICE_ID || !SETUP_PRICE_ID) {
  // Fail loud at server start if Price IDs are missing — don't let the page
  // load with broken checkout buttons.
  console.warn(
    "[stripe] Missing Price IDs — STRIPE_FOUNDATION_PRICE_ID or STRIPE_SETUP_PRICE_ID is unset in .env.local",
  );
}
