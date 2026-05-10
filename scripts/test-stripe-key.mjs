// scripts/test-stripe-key.mjs
// Diagnostic: load .env.local and test the Stripe key with a minimal API call.
// Doesn't print the key. Prints only: format check, length, prefix, success/fail.
//
// Run: node scripts/test-stripe-key.mjs

import fs from "node:fs";
import path from "node:path";
import Stripe from "stripe";
import { fileURLToPath } from "node:url";

// Manual .env.local load (Next.js loads it automatically, but standalone scripts don't)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("✗ .env.local not found at", envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const k = trimmed.slice(0, eq).trim();
  const v = trimmed.slice(eq + 1).trim();
  if (!process.env[k]) process.env[k] = v;
}

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  console.error("✗ STRIPE_SECRET_KEY is missing from .env.local");
  process.exit(1);
}

// Format diagnostics — without printing the key
console.log("=== Key format diagnostics ===");
console.log("Length:", key.length, "(expected: ~107 chars for sk_live_*)");
console.log("Prefix:", key.slice(0, 8) + "...");
console.log("Has whitespace:", /\s/.test(key) ? "✗ YES — STRIPS NEEDED" : "✓ no");
console.log("Has surrounding quotes:", /^["']|["']$/.test(key) ? "✗ YES — STRIP QUOTES" : "✓ no");
console.log("Starts with sk_live_:", key.startsWith("sk_live_") ? "✓ yes" : "✗ NO");
console.log("Starts with sk_test_:", key.startsWith("sk_test_") ? "✗ TEST KEY (should be live)" : "✓ no");
console.log();

// Live API call
console.log("=== Stripe API call test (Account.retrieve) ===");
try {
  const stripe = new Stripe(key, {
    apiVersion: "2025-02-24.acacia",
    typescript: true,
  });
  const account = await stripe.accounts.retrieve();
  console.log("✓ SUCCESS");
  console.log("  Account ID:", account.id);
  console.log("  Business name:", account.business_profile?.name || "(not set)");
  console.log("  Country:", account.country);
  console.log("  Charges enabled:", account.charges_enabled);
  console.log("  Payouts enabled:", account.payouts_enabled);
  console.log("  Live mode:", !account.email?.includes("test"));
} catch (err) {
  console.log("✗ FAILED");
  console.log("  Error:", err.message);
  console.log("  Type:", err.type || "(no type)");
  console.log("  Code:", err.code || "(no code)");
  console.log("  Status:", err.statusCode || err.status || "(no status)");
  process.exit(1);
}
