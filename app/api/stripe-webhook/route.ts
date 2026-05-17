// app/api/stripe-webhook/route.ts
// Stripe webhook handler. Verifies the signature, branches on
// session.metadata.product, and dispatches the matching welcome email.
//
// Runtime is Node (not Edge) because:
//   1. The stripe SDK uses Node crypto APIs for signature verification.
//   2. We need the RAW request body (req.text()) before parsing.
//
// Idempotency is intentionally NOT implemented yet. At current volume (pre-
// launch, single-digit subscribers expected), Stripe-driven duplicate sends
// are tolerable. Add Vercel KV (per docs/foundation-welcome-email-plan.md
// section 4a) before scaling past ~100 customers.

import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import {
  sendFoundationWelcomeEmail,
  sendSetupWelcomeEmail,
  sendPeerOperatorStackWelcomeEmail,
} from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Peer Operator's Stack v1 product ID (Stripe live).
// Used as a fallback detector when metadata.product is unset on the session
// (the Dashboard-recreated Payment Link omits metadata since Stripe's UI no
// longer surfaces it on the Payment Link create form).
const PEER_OPERATOR_STACK_PRODUCT_ID = "prod_UWlvMzls8Yi1wO";

async function sessionHasStackLineItem(
  sessionId: string,
): Promise<boolean> {
  try {
    const expanded = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });
    const items = expanded.line_items?.data ?? [];
    return items.some((item) => {
      const product = item.price?.product;
      if (!product) return false;
      if (typeof product === "string") {
        return product === PEER_OPERATOR_STACK_PRODUCT_ID;
      }
      // Expanded Product object
      return product.id === PEER_OPERATOR_STACK_PRODUCT_ID;
    });
  } catch (err) {
    const e = err as Error;
    console.error(
      `[stripe-webhook] Failed to expand line items for ${sessionId}: ${e.message}`,
    );
    return false;
  }
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn(
      "[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set; rejecting request. Add the env var in Vercel after registering the endpoint in Stripe Dashboard.",
    );
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 400 },
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const e = err as Error;
    console.error(
      "[stripe-webhook] Signature verification failed:",
      e.message,
    );
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Only act on checkout.session.completed. Acknowledge everything else with
  // 200 so Stripe doesn't retry.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // TODO: idempotency via Vercel KV. See docs/foundation-welcome-email-plan.md
  // section 4a. Skipping for v1 — current volume tolerates duplicate sends.

  const product = session.metadata?.product;

  try {
    if (product === "foundation_subscription") {
      await sendFoundationWelcomeEmail(session);
      return NextResponse.json({ received: true, sent: true, product });
    }

    if (product === "setup_session") {
      await sendSetupWelcomeEmail(session);
      return NextResponse.json({ received: true, sent: true, product });
    }

    if (product === "peer_operators_stack") {
      await sendPeerOperatorStackWelcomeEmail(session);
      return NextResponse.json({ received: true, sent: true, product });
    }

    // Fallback: metadata is missing on the Stack Payment Link (Stripe UI
    // dropped metadata from the create-link form). Detect via expanded
    // line_items product ID and dispatch the Stack email if matched.
    if (await sessionHasStackLineItem(session.id)) {
      await sendPeerOperatorStackWelcomeEmail(session);
      return NextResponse.json({
        received: true,
        sent: true,
        product: "peer_operators_stack",
        via: "line_item_product_id",
      });
    }

    console.warn(
      `[stripe-webhook] Unknown product on session ${session.id}: ${product ?? "(none)"}`,
    );
    return NextResponse.json({ received: true, unknownProduct: true });
  } catch (err) {
    const e = err as Error;
    console.error(
      `[stripe-webhook] Email dispatch failed for session ${session.id}:`,
      e.message,
    );
    // 500 so Stripe retries the webhook with exponential backoff.
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
