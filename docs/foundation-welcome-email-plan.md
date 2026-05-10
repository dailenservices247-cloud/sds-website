# Foundation Welcome Email Infrastructure — Implementation Plan

**Status:** Draft v1 (2026-05-01)
**Owner:** Dailen
**Goal:** Close the post-checkout brand-experience gap. Today, a customer subscribing to Foundation ($19/mo) or buying a Setup Session ($297) at `https://synapsedynamics.io/foundation` only receives a generic Stripe receipt. We will send a branded welcome email that delivers Discord access, the first content pointer, and clear next steps within seconds of payment.

---

## 1. Architecture

### Trigger flow

```
Stripe Checkout (subscription or payment)
        │
        ▼
Stripe sends webhook event to Vercel
        │
        ▼
POST /api/stripe-webhook  ← signature-verified
        │
        ├── checkout.session.completed   (mode=subscription) ─► Foundation welcome
        └── checkout.session.completed   (mode=payment)      ─► Setup Session welcome
        │
        ▼
Resend.emails.send({ from, to, subject, react|html })
        │
        ▼
Idempotency check (Vercel KV or Supabase) — has this session_id been emailed?
```

### Why `checkout.session.completed` for BOTH (not `payment_intent.succeeded`)

The brief mentioned `payment_intent.succeeded` for the Setup Session, but `checkout.session.completed` fires reliably for both Checkout `mode: "subscription"` and `mode: "payment"`. It carries `customer_details.email`, `metadata` (where we stamped `product`), and `mode`. Using one event type for both products keeps the handler simple and lets us branch on `session.metadata.product` or `session.mode`. (`payment_intent.succeeded` does not carry the Checkout-level metadata cleanly for one-time Checkout sessions and can fire before the Checkout session is finalized.)

### File layout

```
app/api/stripe-webhook/route.ts        ← new — Next.js Route Handler (POST)
lib/resend.ts                           ← new — Resend client init
lib/emails/foundation-welcome.tsx       ← new — React email template (Foundation)
lib/emails/setup-session-welcome.tsx    ← new — React email template (Setup)
lib/emails/send-welcome.ts              ← new — dispatch helper, idempotency
```

### Idempotency

Stripe retries failed webhooks. We MUST deduplicate. Two options:

- **Option A (recommended for v1):** Vercel KV — a single key per `session.id` with a 30-day TTL. `await kv.set("welcome-sent:" + session.id, 1, { nx: true, ex: 60*60*24*30 })`. If `nx` returns null/false, we already sent it; bail.
- **Option B:** A new Supabase table `welcome_emails_sent (session_id text primary key, sent_at timestamptz)`. Insert with `on conflict do nothing`; if row count = 0, skip.

KV is simpler and avoids cross-project Supabase coupling for the SDS site, which currently has no Supabase integration. Recommend KV.

### Runtime

`export const runtime = "nodejs";` — the `stripe` SDK uses Node crypto APIs not available in the Edge runtime, AND we need the raw request body for signature verification (Edge has different streaming semantics).

---

## 2. Email Provider Choice — Resend

### Why Resend over alternatives

| Provider | Free tier | DX | Recommendation |
|---|---|---|---|
| **Resend** | 3k/mo, 100/day | React Email native, one-line send | **Pick this** |
| Postmark | 100/mo trial, then paid | Good, but no free production tier | Skip |
| SendGrid | 100/day forever | Heavier API, more legacy | Skip |
| AWS SES | 200/day free if sent from EC2 | Cheapest at scale, painful setup | Skip for now |

Foundation will not exceed 3k emails/mo at launch. Resend's free tier covers us through the first ~100 subscribers comfortably.

### What to add

- `npm install resend @react-email/components`
- `RESEND_API_KEY` env var (from Resend dashboard)
- Sender identity: `Dailen at Synapse Dynamics <dailen@synapsedynamics.io>` — but Resend needs verified DNS for `synapsedynamics.io` (see DNS section below)

### Cloudflare Email Routing note

Cloudflare Email Routing handles INBOUND email (e.g., `dailen@synapsedynamics.io` → `dailenhuntley@gmail.com`). It does NOT handle outbound. Resend handles outbound, but it needs SPF/DKIM/DMARC records on `synapsedynamics.io` to send legitimately from `dailen@synapsedynamics.io`. The two systems coexist:

- Cloudflare Email Routing: keeps your existing inbound forwarding intact.
- Resend: adds outbound DKIM signing + SPF entry. As long as the SPF record `include`s both Cloudflare and Resend, both work.

### DNS records to add at Cloudflare (for `synapsedynamics.io`)

Resend will give you exact values; expect roughly:

```
Type   Name                              Value
TXT    send.synapsedynamics.io           "v=spf1 include:amazonses.com ~all"
CNAME  resend._domainkey                 resend._domainkey.resend.com
TXT    _dmarc                            "v=DMARC1; p=none; rua=mailto:dailen@synapsedynamics.io"
```

If an SPF record already exists at the apex (from Cloudflare Email Routing), MERGE the includes — don't add a second SPF record (multiple SPF records cause hard failures). Example merged: `v=spf1 include:_spf.mx.cloudflare.net include:amazonses.com ~all`.

---

## 3. Email Copy

Below are the v1 drafts. Lock copy with Dailen before wiring templates. Each email is plain, human, and matches the Foundation page voice.

### 3a. Foundation Subscription welcome ($19/mo)

**Subject:** Welcome to Foundation — your Discord invite + what's next

**Preview text:** Discord, Friday Q&A, first content drop. Everything you need to land.

**Body:**

```
Hey [first name or "there"],

You're in. Foundation Subscription is active and you're now part of the build.

Two things to do right now:

1. JOIN THE DISCORD
   [Discord invite link — placeholder: https://discord.gg/REPLACE]
   This is where direction-shaping happens. Vote on what gets built next.
   Submit Friday Q&A questions. Watch the portfolio mesh take shape in real time.

2. READ THE FIRST DROP
   [Link to first content drop — placeholder: https://synapsedynamics.io/build-log/welcome]
   The opening behind-the-build piece. Sets the cadence for everything that follows.

WHAT TO EXPECT THIS WEEK
• Friday: 20-minute Q&A recap video answering the top 5–7 voted questions
• Throughout the week: subscriber-only build notes drop in Discord first, then archive
• Whenever Apotheosis ships (target August 2026): your subscription auto-converts to
  Apotheosis Pro at the same $19/mo. No price change.

YOUR FOUNDING MEMBER STATUS
You're in the first 100. That means $19/mo locked forever, founding-member badge in
Discord, first-pick on every early-access window, and a retroactive Founding Member
NFT when NeoHood Genesis Block ships (years out — non-equity, non-financial, just a
provable timestamp that says you were here at the start).

MANAGING YOUR SUBSCRIPTION
Cancel, update payment, or change email anytime:
[Stripe Customer Portal link — placeholder: https://synapsedynamics.io/foundation/manage]

Or reply to this email. I read every reply.

— Dailen
Synapse Dynamics · Black Sheep 247 LLC
```

### 3b. Setup Session welcome ($297 one-time)

**Subject:** Setup Session booked — let's get your kickoff scheduled

**Preview text:** Calendly link inside. Kickoff window within 48 hours.

**Body:**

```
Hey [first name or "there"],

Your Setup Session is booked. Payment received — receipt's already in your inbox
from Stripe.

HERE'S WHAT HAPPENS NEXT

1. SCHEDULE THE KICKOFF (do this now — 60 seconds)
   [Calendly link — placeholder: https://cal.com/dailenhuntley/setup-session]
   Pick a 30-minute window in the next 7 days. This is async-first, but the
   kickoff is live so I can hear how you actually work.

2. FILL THE INTAKE FORM (do this before the kickoff)
   [Intake form link — placeholder: https://synapsedynamics.io/setup-session/intake]
   Tells me what stack you're on, what's broken, what you want by the end. The
   more specific you are, the more we can ship in the week.

3. WATCH FOR LOOM WALKTHROUGHS THIS WEEK
   After kickoff, you'll get Loom recordings + voice messages from me as I:
   • Tune your CLAUDE.md to your work
   • Set up your Keychain wrappers
   • Configure your Denise persona
   • Install three starter skills calibrated to what you do

   Expect 2–3 Looms over 5–7 days. Reply with voice memos when you have feedback —
   that's how the loop works.

4. WRAP-UP DELIVERABLE
   By end of week 1 you'll have a fully-configured setup, a written summary of
   what we did, and a maintenance doc for keeping it healthy.

QUESTIONS BEFORE KICKOFF?
Reply to this email. Voice memos welcome.

— Dailen
Synapse Dynamics · Black Sheep 247 LLC
```

---

## 4. Code Sketches

### 4a. `app/api/stripe-webhook/route.ts`

```typescript
// app/api/stripe-webhook/route.ts
// Stripe webhook handler. Verifies signature, deduplicates by session.id,
// and dispatches the matching welcome email via Resend.

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { sendWelcomeEmail } from "@/lib/emails/send-welcome";
import { kv } from "@vercel/kv"; // or Supabase fallback

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
  throw new Error("STRIPE_WEBHOOK_SECRET is not set");
}

export async function POST(req: NextRequest) {
  const body = await req.text(); // RAW body — required for signature verification
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (err) {
    const e = err as Error;
    console.error("[stripe-webhook] Signature verification failed:", e.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Only act on the events we care about. Acknowledge the rest with 200 so
  // Stripe doesn't retry.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Idempotency: bail if we've already processed this session.
  const idemKey = `welcome-sent:${session.id}`;
  const claim = await kv.set(idemKey, 1, { nx: true, ex: 60 * 60 * 24 * 30 });
  if (claim === null) {
    console.log(`[stripe-webhook] Already sent for ${session.id}, skipping`);
    return NextResponse.json({ received: true, deduped: true });
  }

  try {
    await sendWelcomeEmail(session);
  } catch (err) {
    // Roll back the idempotency claim so a retry can succeed.
    await kv.del(idemKey);
    const e = err as Error;
    console.error("[stripe-webhook] sendWelcomeEmail failed:", e.message);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true, sent: true });
}
```

### 4b. `lib/emails/send-welcome.ts`

```typescript
// lib/emails/send-welcome.ts
import "server-only";
import Stripe from "stripe";
import { resend } from "@/lib/resend";
import { FoundationWelcomeEmail } from "./foundation-welcome";
import { SetupSessionWelcomeEmail } from "./setup-session-welcome";

const FROM = "Dailen at Synapse Dynamics <dailen@synapsedynamics.io>";

export async function sendWelcomeEmail(session: Stripe.Checkout.Session) {
  const to = session.customer_details?.email ?? session.customer_email;
  if (!to) {
    throw new Error(`No customer email on session ${session.id}`);
  }

  const product = session.metadata?.product;
  const firstName = session.customer_details?.name?.split(" ")[0];

  if (product === "foundation_subscription") {
    return resend.emails.send({
      from: FROM,
      to,
      subject: "Welcome to Foundation — your Discord invite + what's next",
      react: FoundationWelcomeEmail({ firstName }),
    });
  }

  if (product === "setup_session") {
    return resend.emails.send({
      from: FROM,
      to,
      subject: "Setup Session booked — let's get your kickoff scheduled",
      react: SetupSessionWelcomeEmail({ firstName }),
    });
  }

  console.warn(`[send-welcome] Unknown product on session ${session.id}: ${product}`);
}
```

### 4c. `lib/resend.ts`

```typescript
// lib/resend.ts
import "server-only";
import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### 4d. Email templates (React Email)

`lib/emails/foundation-welcome.tsx` and `lib/emails/setup-session-welcome.tsx` use `@react-email/components` (`<Html>`, `<Text>`, `<Button>`, etc.) to render the copy in Section 3 with proper inline styles for email-client compatibility. Component skeletons follow standard React Email patterns — straightforward to scaffold once copy is locked.

---

## 5. What This Requires From You (External Setup)

These steps cannot be done by code — Dailen must do them in the relevant dashboards.

### 5a. Resend account setup

1. Sign up at https://resend.com (free).
2. Add domain `synapsedynamics.io`.
3. Resend will give exact DNS records — copy them.
4. Generate an API key. Save to `~/.secret_keys` labeled `RESEND_API_KEY` (sds-website).
5. Add to Vercel: `vercel env add RESEND_API_KEY production` (and `preview`, `development`).

### 5b. DNS records at Cloudflare

For domain `synapsedynamics.io`, in the Cloudflare DNS panel:

- Add the SPF/CNAME/DMARC records Resend provides.
- If an SPF TXT record already exists at the apex (from Email Routing), MERGE the includes into one record. Do NOT add a second SPF — that breaks both.
- Wait for verification in the Resend dashboard (usually 5–30 minutes).

### 5c. Stripe webhook endpoint registration

1. Stripe Dashboard → Developers → Webhooks → Add endpoint.
2. URL: `https://synapsedynamics.io/api/stripe-webhook` (production) — register a separate endpoint for any preview/staging URL if you test pre-merge.
3. Events to listen for:
   - `checkout.session.completed`
4. Reveal the signing secret. Save to `~/.secret_keys` labeled `STRIPE_WEBHOOK_SECRET`.
5. Add to Vercel: `vercel env add STRIPE_WEBHOOK_SECRET production`.

### 5d. Vercel KV (idempotency store)

1. Vercel Dashboard → Storage → Create → KV (Upstash).
2. Connect to the `sds-website` project. Vercel auto-injects `KV_REST_API_URL` + `KV_REST_API_TOKEN` env vars.
3. `npm install @vercel/kv`.

### 5e. Placeholder asset prep (before going live)

Before the welcome emails actually go out to real customers, replace these placeholders:

- Discord invite URL (create the server + a permanent invite link)
- First content drop URL (write and publish the first build-log post)
- Stripe Customer Portal URL (configure via Stripe Dashboard → Billing → Customer Portal)
- Calendly/Cal.com link for Setup Session kickoff
- Setup Session intake form URL (Tally, Typeform, or a Next.js page)

---

## 6. Testing Plan

### Local testing with Stripe CLI

```bash
# Terminal 1: Run the dev server
npm run dev

# Terminal 2: Forward webhooks from Stripe to localhost
stripe listen --forward-to localhost:3000/api/stripe-webhook

# Stripe CLI prints a webhook signing secret — temporarily set this in .env.local
# as STRIPE_WEBHOOK_SECRET while testing locally. Production uses the real one.

# Terminal 3: Trigger a test event
stripe trigger checkout.session.completed
```

### End-to-end test (Stripe test mode)

1. Set `STRIPE_SECRET_KEY` to your `sk_test_*` key locally.
2. Visit `localhost:3000/foundation`, click Subscribe.
3. Use Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC, any zip.
4. Confirm:
   - Checkout completes and redirects to `/foundation/success`
   - Stripe CLI shows `checkout.session.completed` event forwarded
   - Server log shows webhook received + email dispatched
   - Resend dashboard shows the email in the activity feed
   - Email lands in your inbox (use a real test email at checkout)
5. Trigger the same event again from Stripe CLI: confirm idempotency (`deduped: true`, no second email).
6. Repeat for Setup Session product.

### Production smoke test

1. After deploy, run a real $19/mo subscription against your own card.
2. Verify the welcome email lands and links work.
3. Cancel the subscription immediately via the customer portal.
4. Refund the $19 from Stripe Dashboard.

---

## 7. Out of Scope (v1) — Park for v2

- Drip sequence after welcome (welcome is one-shot for now)
- Cancellation/dunning emails (Stripe sends defaults; revisit if branded versions matter)
- Receipt customization (Stripe receipts are fine for v1)
- Welcome SMS (no phone collected)
- Mid-cycle upgrade emails (no upsell yet)

Each can be added incrementally on top of this foundation.

---

## 8. Build Order (when greenlit)

1. Resend account + DNS verification (parallel with #2)
2. Vercel KV provision + env vars
3. Stripe webhook endpoint registration + signing secret
4. Build `app/api/stripe-webhook/route.ts` + helpers + templates
5. Local test via Stripe CLI (test mode)
6. Deploy to preview, register a preview webhook endpoint, retest
7. Deploy to production, register prod webhook endpoint, smoke test with real $19 charge
8. Refund the smoke-test charge, mark as launched

Estimated effort once external setup is done: ~2–3 focused work blocks for code + tests.
