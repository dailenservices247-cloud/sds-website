// app/(v3)/foundation/actions.ts
// Server Actions for Foundation Subscription + Setup Session checkout flows.
// Called from <form action={action}> in app/(v3)/foundation/page.tsx.
// Each action creates a Stripe Checkout session and redirects to the hosted
// payment page. Stripe handles card input, fraud, dispute flow.

"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  stripe,
  FOUNDATION_PRICE_ID,
  SETUP_PRICE_ID,
} from "@/lib/stripe";

function getBaseUrl(): string {
  // Try the explicit env var first (set per-environment)
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  // Fall back to the request origin (works in local + vercel preview)
  const h = headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}`;
}

/**
 * Create a Stripe Checkout session for Foundation Subscription ($19/mo).
 * Customer ends up on Stripe-hosted payment, redirects to success/cancel
 * pages in app/(v3)/foundation/{success,cancel}/.
 */
export async function startFoundationCheckout(): Promise<void> {
  if (!FOUNDATION_PRICE_ID) {
    throw new Error("STRIPE_FOUNDATION_PRICE_ID is missing in .env.local");
  }

  const baseUrl = getBaseUrl();
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: FOUNDATION_PRICE_ID, quantity: 1 }],
      success_url: `${baseUrl}/foundation/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/foundation/cancel`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        product: "foundation_subscription",
        bs247_offer: "foundation_19_mo",
      },
      subscription_data: {
        metadata: {
          product: "foundation_subscription",
          bs247_offer: "foundation_19_mo",
        },
      },
    });
  } catch (err) {
    // Surface the REAL error from Stripe instead of letting it bubble up as
    // the generic SDK retry message. Logged server-side; in dev you'll see
    // it in the terminal running `next dev`.
    const e = err as { message?: string; type?: string; code?: string; raw?: unknown };
    console.error("[startFoundationCheckout] Stripe error:", {
      message: e.message,
      type: e.type,
      code: e.code,
      raw: e.raw,
    });
    throw err;
  }

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}

/**
 * Create a Stripe Checkout session for Setup Session ($297 one-time).
 */
export async function startSetupCheckout(): Promise<void> {
  if (!SETUP_PRICE_ID) {
    throw new Error("STRIPE_SETUP_PRICE_ID is missing in .env.local");
  }

  const baseUrl = getBaseUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: SETUP_PRICE_ID, quantity: 1 }],
    success_url: `${baseUrl}/foundation/success?session_id={CHECKOUT_SESSION_ID}&product=setup`,
    cancel_url: `${baseUrl}/foundation/cancel`,
    allow_promotion_codes: true,
    billing_address_collection: "required",
    customer_creation: "always",
    metadata: {
      product: "setup_session",
      bs247_offer: "setup_297_one_time",
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  redirect(session.url);
}
