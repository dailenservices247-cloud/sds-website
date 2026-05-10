// scripts/test-stripe-checkout.mjs
// Reproduce the exact Checkout Session creation that the website does.
// Surfaces the real Stripe error (not the generic SDK retry message).

import fs from "node:fs";
import path from "node:path";
import Stripe from "stripe";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("✗ .env.local not found");
  process.exit(1);
}

for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("=");
  if (eq === -1) continue;
  const k = t.slice(0, eq).trim();
  const v = t.slice(eq + 1).trim();
  if (!process.env[k]) process.env[k] = v;
}

const key = process.env.STRIPE_SECRET_KEY;
const priceId = process.env.STRIPE_FOUNDATION_PRICE_ID;

console.log("=== Config ===");
console.log("Key prefix:", key?.slice(0, 8) + "...");
console.log("Key length:", key?.length);
console.log("Price ID:", priceId);
console.log();

if (!key || !priceId) {
  console.error("✗ Missing key or price ID");
  process.exit(1);
}

console.log("=== Creating Checkout Session ===");
const stripe = new Stripe(key, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
  // Disable retries so we see the FIRST error, not the retry-exhausted one
  maxNetworkRetries: 0,
});

try {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "http://localhost:3000/foundation/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/foundation/cancel",
    allow_promotion_codes: true,
    billing_address_collection: "auto",
  });
  console.log("✓ SUCCESS");
  console.log("  Session ID:", session.id);
  console.log("  Checkout URL:", session.url);
  console.log("  Mode:", session.mode);
  console.log("  Status:", session.status);
} catch (err) {
  console.log("✗ FAILED — actual error from Stripe:");
  console.log("  Message:", err.message);
  console.log("  Type:", err.type);
  console.log("  Code:", err.code);
  console.log("  Decline code:", err.decline_code);
  console.log("  Status code:", err.statusCode);
  console.log("  Param:", err.param);
  console.log("  Doc URL:", err.doc_url);
  console.log("  Request ID:", err.requestId);
  if (err.raw) {
    console.log("\n  Raw error object:");
    console.log("  ", JSON.stringify(err.raw, null, 2).split("\n").join("\n   "));
  }
  process.exit(1);
}
