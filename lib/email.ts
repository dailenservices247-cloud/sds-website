// lib/email.ts
// Welcome email senders for Foundation Subscription + Setup Session.
// Both senders degrade gracefully: if RESEND_API_KEY is unset, they log a
// warning and return without throwing so the deploy stays green until the
// user signs up for Resend and adds the key.
//
// The Resend client is constructed lazily inside each function (NOT at module
// load) so importing this file from the webhook route never fails at boot.

import "server-only";
import type Stripe from "stripe";
import { Resend } from "resend";

const FROM = "Dailen at Synapse Dynamics <dailen@synapsedynamics.io>";

// REPLACE BEFORE LIVE EMAIL TRAFFIC: real Discord invite URL
const DISCORD_INVITE_URL = "https://discord.gg/REPLACE";
// REPLACE BEFORE LIVE EMAIL TRAFFIC: real first build-log post URL
const FIRST_DROP_URL = "https://synapsedynamics.io/build-log/welcome";
// REPLACE BEFORE LIVE EMAIL TRAFFIC: real Stripe Customer Portal URL
const CUSTOMER_PORTAL_URL = "https://synapsedynamics.io/foundation/manage";
// REPLACE BEFORE LIVE EMAIL TRAFFIC: real Calendly/Cal.com kickoff URL
const CALENDLY_URL = "https://cal.com/dailenhuntley/setup-session";
// REPLACE BEFORE LIVE EMAIL TRAFFIC: real Setup Session intake form URL
const INTAKE_FORM_URL = "https://synapsedynamics.io/setup-session/intake";

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(
      "[email] RESEND_API_KEY is not set; skipping send. Add the env var in Vercel once Resend is provisioned.",
    );
    return null;
  }
  return new Resend(key);
}

function recipientFromSession(
  session: Stripe.Checkout.Session,
): { to: string; firstName: string } | null {
  const to = session.customer_details?.email ?? session.customer_email ?? null;
  if (!to) {
    console.error(
      `[email] No customer email on session ${session.id}; cannot send welcome.`,
    );
    return null;
  }
  const firstName =
    session.customer_details?.name?.split(" ")[0]?.trim() || "there";
  return { to, firstName };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function foundationHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>
  <p>You're in. Foundation Subscription is active and you're now part of the build.</p>

  <p><strong>Two things to do right now:</strong></p>

  <p><strong>1. Join the Discord</strong><br/>
  <a href="${DISCORD_INVITE_URL}">${DISCORD_INVITE_URL}</a><br/>
  This is where direction-shaping happens. Vote on what gets built next. Submit Friday Q&amp;A questions. Watch the portfolio mesh take shape in real time.</p>

  <p><strong>2. Read the first drop</strong><br/>
  <a href="${FIRST_DROP_URL}">${FIRST_DROP_URL}</a><br/>
  The opening behind-the-build piece. Sets the cadence for everything that follows.</p>

  <p><strong>What to expect this week</strong></p>
  <ul>
    <li>Friday: 20-minute Q&amp;A recap video answering the top 5&ndash;7 voted questions</li>
    <li>Throughout the week: subscriber-only build notes drop in Discord first, then archive</li>
    <li>Whenever Apotheosis ships (target August 2026): your subscription auto-converts to Apotheosis Pro at the same $19/mo. No price change.</li>
  </ul>

  <p><strong>Your founding member status</strong><br/>
  You're in the first 100. That means $19/mo locked forever, founding-member badge in Discord, first-pick on every early-access window, and a retroactive Founding Member NFT when NeoHood Genesis Block ships (years out &mdash; non-equity, non-financial, just a provable timestamp that says you were here at the start).</p>

  <p><strong>Managing your subscription</strong><br/>
  Cancel, update payment, or change email anytime:<br/>
  <a href="${CUSTOMER_PORTAL_URL}">${CUSTOMER_PORTAL_URL}</a></p>

  <p>Or reply to this email. I read every reply.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

function setupHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>
  <p>Your Setup Session is booked. Payment received &mdash; receipt's already in your inbox from Stripe.</p>

  <p><strong>Here's what happens next</strong></p>

  <p><strong>1. Schedule the kickoff (do this now &mdash; 60 seconds)</strong><br/>
  <a href="${CALENDLY_URL}">${CALENDLY_URL}</a><br/>
  Pick a 30-minute window in the next 7 days. This is async-first, but the kickoff is live so I can hear how you actually work.</p>

  <p><strong>2. Fill the intake form (do this before the kickoff)</strong><br/>
  <a href="${INTAKE_FORM_URL}">${INTAKE_FORM_URL}</a><br/>
  Tells me what stack you're on, what's broken, what you want by the end. The more specific you are, the more we can ship in the week.</p>

  <p><strong>3. Watch for Loom walkthroughs this week</strong><br/>
  After kickoff, you'll get Loom recordings + voice messages from me as I:</p>
  <ul>
    <li>Tune your CLAUDE.md to your work</li>
    <li>Set up your Keychain wrappers</li>
    <li>Configure your Denise persona</li>
    <li>Install three starter skills calibrated to what you do</li>
  </ul>
  <p>Expect 2&ndash;3 Looms over 5&ndash;7 days. Reply with voice memos when you have feedback &mdash; that's how the loop works.</p>

  <p><strong>4. Wrap-up deliverable</strong><br/>
  By end of week 1 you'll have a fully-configured setup, a written summary of what we did, and a maintenance doc for keeping it healthy.</p>

  <p><strong>Questions before kickoff?</strong><br/>
  Reply to this email. Voice memos welcome.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendFoundationWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Welcome to Foundation Subscription",
    html: foundationHtml(r.firstName),
  });

  if (result.error) {
    // Bubble up so the webhook route returns 500 and Stripe retries.
    throw new Error(
      `[email] Resend send (foundation) failed: ${result.error.message}`,
    );
  }
}

export async function sendSetupWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Welcome to Setup Session — let's schedule your kickoff",
    html: setupHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (setup) failed: ${result.error.message}`,
    );
  }
}
