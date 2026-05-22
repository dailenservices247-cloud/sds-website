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

// Permanent invite (Synapse Dynamics server, never expires, no use limit)
const DISCORD_INVITE_URL = "https://discord.gg/jGxwQR55A9";
// Foundation Subscription first-drop URL. Until a dedicated `/build-log/welcome`
// page lands, redirect buyers to the Skool community where build-notes drop.
const FIRST_DROP_URL = "https://www.skool.com/synapse-studio-8041";
// Foundation Subscription customer portal. Until a Stripe Customer Portal
// session route exists at `/api/billing/portal`, buyers manage by replying to
// the welcome email (FROM mailbox is monitored).
const CUSTOMER_PORTAL_URL = "mailto:dailen@synapsedynamics.io?subject=Foundation%20Subscription%20%E2%80%94%20manage%20my%20billing";
// Setup Session kickoff URL. NOTE: verify with Dailen whether the canonical
// booking URL is on Calendly.com or Cal.com. Foundation has its own product
// stream and may not need this constant.
const CALENDLY_URL = "https://calendly.com/dailenhuntley/setup-session";
// Setup Session intake URL. NOTE: a dedicated intake form for Setup Session
// is queued for next sprint. Until then, use the O1 intake as the closest
// analog (Calendly redirect into the same Tally form). When Setup launches in
// market, create a separate Tally and update this constant.
const INTAKE_FORM_URL = "https://tally.so/r/D4xzQR";
// Peer Operator's Stack v1 — hosted on Vercel via sds-website /public.
const STACK_DOWNLOAD_URL = "https://synapsedynamics.io/stack-v1.zip";
// SDS Anti-Slop Skill Pack v1 — hosted on Vercel via sds-website /public.
const ANTI_SLOP_DOWNLOAD_URL = "https://synapsedynamics.io/anti-slop-skill-pack-v1.zip";
// Claude Voice Network Pack v1 — hosted on Vercel via sds-website /public.
const VOICE_NETWORK_PACK_DOWNLOAD_URL =
  "https://synapsedynamics.io/claude-voice-network-pack-v1.zip";
// Atomic Note Template Pack — MIT, free on GitHub, $19 honor-system tip on Stripe.
const ATOMIC_NOTE_PACK_GITHUB_REPO = "https://github.com/dailenservices247-cloud/atomic-note-pack";
const ATOMIC_NOTE_PACK_GITHUB_ZIP = "https://github.com/dailenservices247-cloud/atomic-note-pack/archive/refs/heads/main.zip";

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

function peerOperatorStackHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>

  <p>Thanks for picking up the Stack. Direct download below.</p>

  <p><strong>Download Peer Operator's Stack v1</strong><br/>
  <a href="${STACK_DOWNLOAD_URL}">${STACK_DOWNLOAD_URL}</a></p>

  <p><strong>What I'd do on day 1</strong></p>
  <ol>
    <li>Unzip somewhere stable. <code>~/Desktop/peer-operators-stack-v1/</code> is fine.</li>
    <li>Read the README to see what's in each of the 5 categories.</li>
    <li>Pick the one skill that addresses what's frustrating you most this week.</li>
    <li>Don't try to install all 20. The library is designed to be picked from.</li>
  </ol>

  <p><strong>The 5 categories</strong></p>
  <ul>
    <li><strong>Memory + retrieval</strong> (skills 1&ndash;4): atomic-node, retrieval contracts, decisions-log + inferences-log index patterns.</li>
    <li><strong>Voice + craft</strong> (skills 5&ndash;8): brand-voice linter, doctrine injection, banned-words list, drop-overclaim editing pass.</li>
    <li><strong>Workflow + skills</strong> (skills 9&ndash;14): find-skill router, CLAUDE.md TOC, /goal ritual, Plan-Mode brief, Chrome DevTools MCP verification, subagent dispatch.</li>
    <li><strong>Engagement layer</strong> (skills 15&ndash;18): engagement letter, Calendly-to-Stripe redirect, Tally intake spec, Stripe hosted-confirmation pattern.</li>
    <li><strong>Bonus + diagnostic</strong> (skills 19&ndash;20): 8-layer agent stack diagnostic, ICAC tier discipline.</li>
  </ul>

  <p><strong>Lifetime access</strong><br/>
  You own v1 and every v1.x update going forward. When v1.1 ships, it lands in your inbox automatically. No action needed on your end.</p>

  <p><strong>14-day refund window</strong><br/>
  Reply to this email with one line ("refund please") and the refund is yours, no questions asked. The window starts today.</p>

  <p><strong>Stuck on which skill to start with?</strong><br/>
  Reply with one sentence on what you're building right now. I'll point you at the skill that'll bite the soonest. The reply-to is monitored by a human (me).</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendPeerOperatorStackWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Your Peer Operator's Stack is here",
    html: peerOperatorStackHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (peer-operator-stack) failed: ${result.error.message}`,
    );
  }
}

function antiSlopHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>

  <p>Thanks for picking up the Anti-Slop Skill Pack. Direct download below.</p>

  <p><strong>Download SDS Anti-Slop Skill Pack v1</strong><br/>
  <a href="${ANTI_SLOP_DOWNLOAD_URL}">${ANTI_SLOP_DOWNLOAD_URL}</a></p>

  <p><strong>What I'd do on day 1</strong></p>
  <ol>
    <li>Unzip somewhere stable. <code>~/Desktop/anti-slop-skill-pack/</code> is fine.</li>
    <li>Open <code>INSTALL.md</code>. Pick the install mode that fits how you use Claude (Claude.ai Custom Instructions / Claude Code skill / Project knowledge layer).</li>
    <li>Paste a draft you're about to ship. Say "run anti-slop on this." Watch the flag list.</li>
    <li>Fork <code>banned-words-list.md</code> for your brand. Add what's banned for you, remove what your brand actually wants.</li>
  </ol>

  <p><strong>What's in the pack (8 files)</strong></p>
  <ul>
    <li><code>SKILL.md</code> &ndash; the Claude skill itself</li>
    <li><code>banned-words-list.md</code> &ndash; six-category blocklist with replacements</li>
    <li><code>voice-fingerprint-scan.md</code> &ndash; 4-check pre-publish pass (Specific / Honest / Peer / Banned-phrase)</li>
    <li><code>usage-examples.md</code> &ndash; 10 before/after rewrites from real work</li>
    <li><code>INSTALL.md</code> &ndash; three install modes explained</li>
    <li><code>README.md</code> &ndash; overview + forking guidance</li>
    <li><code>LICENSE.md</code> &ndash; MIT</li>
    <li><code>CHANGELOG.md</code> &ndash; v1.0 ship notes + v1.1 banked items</li>
  </ul>

  <p><strong>Six categories the pack catches</strong></p>
  <ul>
    <li>Hype / AI-marketing-speak (supercharge, unlock, transform, 10x)</li>
    <li>Filler intensifiers (just, really, basically, actually, simply)</li>
    <li>AI-influencer vocabulary (leverage, level up, game-changer, imagine if)</li>
    <li>Motivational-grindset (hustle, grind, lock in, side hustle)</li>
    <li>Exit-fetishism (billion-dollar, $100M exit, unicorn)</li>
    <li>Scarcity-FOMO (get it while the getting's good, the window is closing)</li>
  </ul>

  <p><strong>Lifetime access</strong><br/>
  You own v1 and every v1.x update going forward. When v1.1 ships, it lands in your inbox automatically. No action needed.</p>

  <p><strong>14-day refund</strong><br/>
  If the pack doesn't pay for itself inside two drafts run through it, reply to this email. Full refund, no quarrels.</p>

  <p><strong>Cross-sell honesty</strong><br/>
  If you also want the full Peer Operator's Stack v1 (20 patterns, including this anti-slop skill as Skill 05), it's $149 at <a href="https://synapsedynamics.io/stack">synapsedynamics.io/stack</a>. Skip if you already have it.</p>

  <p>Reply with one sentence on what you're about to write next. I'll point out which category trips the most operators in your lane.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendAntiSlopWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Your SDS Anti-Slop Skill Pack is here",
    html: antiSlopHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (anti-slop) failed: ${result.error.message}`,
    );
  }
}

function atomicNotePackHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>

  <p>Thanks for the $19. Means more than you'd think for an honor-system tip on something that's also free.</p>

  <p><strong>The pack is here</strong><br/>
  <a href="${ATOMIC_NOTE_PACK_GITHUB_ZIP}">${ATOMIC_NOTE_PACK_GITHUB_ZIP}</a> (direct ZIP download)<br/>
  <a href="${ATOMIC_NOTE_PACK_GITHUB_REPO}">${ATOMIC_NOTE_PACK_GITHUB_REPO}</a> (GitHub repo, MIT)</p>

  <p><strong>What's inside (4 atom types + 1 retrieval contract)</strong></p>
  <ul>
    <li><code>decision-node.md</code> &ndash; a locked choice plus alternatives considered</li>
    <li><code>inference-node.md</code> &ndash; a claim or pattern derived from sources</li>
    <li><code>context-node.md</code> &ndash; a snapshot of state at a moment in time</li>
    <li><code>test-node.md</code> &ndash; a validation, eval, or experiment with results</li>
    <li><code>retrieval-contract.md</code> &ndash; what an agent needs to know, before any infrastructure pick</li>
    <li><code>examples/</code> &ndash; five filled-in examples drawn from real production work</li>
    <li><code>README.md</code> &ndash; methodology, Obsidian + Notion + Cursor setup, anti-patterns</li>
  </ul>

  <p><strong>How to use it (3 minutes to first atom)</strong></p>
  <ol>
    <li>Unzip into your Obsidian vault root (or Notion, or any markdown notes app)</li>
    <li>Read <code>README.md</code> for the methodology + Obsidian-specific setup steps</li>
    <li>Copy one template (start with <code>decision-node.md</code>) into a new file with today's date</li>
    <li>Fill it in for an actual decision you made this week. That's your first atom.</li>
    <li>Add a second atom tomorrow. Don't try to retro-fill everything; the graph compounds forward.</li>
  </ol>

  <p><strong>Why atomic, why typed</strong><br/>
  Most operators run one rolling Decisions Log + one Lessons Learned dump. At scale that forces your AI agent to read entire files every time it needs context. Atomic-node format inverts that: each decision in its own file, agents scan summaries cheaply, follow typed edges only when they need detail.</p>

  <p><strong>If the pack helps</strong><br/>
  Send me one decision-node you wrote. I'd genuinely value seeing it in the wild. Reply-to is monitored by a human (me).</p>

  <p><strong>If you want the full Peer Operator's Stack</strong><br/>
  The Atomic Note Pack is Skill 01 of a 20-pattern library. The Stack ($149) includes this + retrieval contracts + brand-voice linter + 8-layer agent stack diagnostic + 16 more patterns. <a href="https://synapsedynamics.io/stack">synapsedynamics.io/stack</a></p>

  <p>Either way, thanks for backing the work.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendAtomicNotePackWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Your Atomic Note Pack — thanks for the tip",
    html: atomicNotePackHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (atomic-note-pack) failed: ${result.error.message}`,
    );
  }
}

// Day-7 testimonial-ask follow-up email. Sent ~7 days after a Stack purchase.
//
// Trigger mechanism (not yet wired at v1):
//   Option A: Resend `scheduledAt` parameter at webhook time (no infra needed,
//             but Resend's scheduled-send feature is in beta and behavior may
//             vary).
//   Option B: Vercel cron job at /api/cron/stack-followups that queries a
//             Supabase `stack_purchases` table for purchases 7+ days old
//             without a follow-up timestamp, sends them, marks as sent.
//
// Both deferred to v1.1 sprint. v1 ships the function so the trigger plumbing
// has a real callable to invoke when ready.
const STACK_FEEDBACK_FORM_FALLBACK =
  "mailto:dailen@synapsedynamics.io?subject=Peer%20Operator%27s%20Stack%20%E2%80%94%20day-7%20feedback";

function peerOperatorStackTestimonialHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>

  <p>It&rsquo;s been about a week since you grabbed the Peer Operator&rsquo;s Stack.</p>

  <p>If one specific skill landed (or didn&rsquo;t), I&rsquo;d value a one-line read on which one and what changed (or didn&rsquo;t).</p>

  <p>Three quick options:</p>

  <ol>
    <li><strong>Two-minute feedback form:</strong> <a href="${STACK_FEEDBACK_FORM_FALLBACK}">send a one-liner</a> (this becomes the day-7 Tally form once it&rsquo;s live; until then it&rsquo;s a direct-to-Dailen email).</li>
    <li><strong>Reply to this email</strong> with a sentence or two. Voice memo welcome if you prefer.</li>
    <li><strong>Drop it in the Skool community</strong> at <a href="https://www.skool.com/synapse-studio-8041">synapse-studio-8041</a> if you&rsquo;d rather discuss with peers.</li>
  </ol>

  <p>If a specific pattern bombed for you, that&rsquo;s the most valuable data. v1.x patches go out free as updates; honest feedback shapes the priority order. The 14-day refund window is still open if the Stack just isn&rsquo;t the right fit.</p>

  <p>If you scored the Stack a clear 5 and there&rsquo;s one specific peer who&rsquo;d benefit, the referral pattern works two ways &mdash; send me their name + how to reach them, and I&rsquo;ll handle the introduction so they don&rsquo;t feel cold-pitched.</p>

  <p>Thanks for being in the first cohort.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendPeerOperatorStackTestimonialAskEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "One week with the Stack — quick read?",
    html: peerOperatorStackTestimonialHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (peer-operator-stack testimonial-ask) failed: ${result.error.message}`,
    );
  }
}

function voiceNetworkPackHtml(firstName: string): string {
  const name = escapeHtml(firstName);
  return `<!doctype html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111;">
  <p>Hey ${name},</p>

  <p>Thanks for picking up the Claude Voice Network Pack. Direct download below.</p>

  <p><strong>Download Claude Voice Network Pack v1</strong><br/>
  <a href="${VOICE_NETWORK_PACK_DOWNLOAD_URL}">${VOICE_NETWORK_PACK_DOWNLOAD_URL}</a></p>

  <p><strong>What I&rsquo;d do on day 1</strong></p>
  <ol>
    <li>Unzip somewhere stable. <code>~/Desktop/claude-voice-network-pack/</code> is fine.</li>
    <li>Open <code>bridge/INSTALL.md</code>. ~20 min wall-clock if you&rsquo;re fluent in shell.</li>
    <li>Run <code>./bridge/smoke-test.sh</code> after install. It probes all five layers and prints your public tunnel URL.</li>
    <li>Drop <code>vault-template/</code> into your Obsidian vault root.</li>
    <li>Upload one of <code>templates/01-discovery</code> &hellip; <code>05-personal-memory</code> to a new Claude.ai Project. Open from your phone. Voice mode.</li>
  </ol>

  <p><strong>What&rsquo;s in the pack (32 files / 172K)</strong></p>
  <ul>
    <li><code>bridge/</code> &ndash; wrapper template + worked Obsidian example + two launchd plists + smoke-test + 7-failure troubleshooting library + named-tunnel migration guide</li>
    <li><code>playbook/Project-Design-Playbook.md</code> &ndash; full methodology (13 sections, 2200 words)</li>
    <li><code>vault-template/</code> &ndash; atomic-node spec + relay protocol + handoff pattern + 8 starter folders + Active Work Log stub</li>
    <li><code>templates/</code> &ndash; 5 starter Project bundles (Discovery / Build / Sales / Content / Personal-Memory). v1.0 ships scaffold; v1.1 (by 2026-05-28) ships full content. You get the upgrade free.</li>
    <li><code>README.md</code> + <code>CHANGELOG.md</code> + <code>LICENSE.md</code></li>
  </ul>

  <p><strong>The seven silent failures the troubleshooting library covers</strong></p>
  <ol>
    <li>Self-signed TLS cert rejection (&ldquo;fetch failed&rdquo; on every tool call)</li>
    <li>Transport mismatch &ndash; <code>/sse</code> vs <code>/mcp</code> endpoint</li>
    <li>launchd-spawned env stripped of <code>PATH</code></li>
    <li>Keychain miss under launchd context</li>
    <li>Tunnel URL rotation on cloudflared restart</li>
    <li>Claude.ai client cached old tool schema (toggle won&rsquo;t clear it)</li>
    <li>Wrong-package endpoint paths (404 on every tool)</li>
  </ol>

  <p>Each is documented with symptom + root cause + fix. Built tonight from a three-hour debug session, so you skip the integration tax.</p>

  <p><strong>Lifetime v1.x access</strong><br/>
  When v1.1 (full starter Projects + bearer-auth middleware) lands by 2026-05-28, it ships to your inbox automatically. v1.2 (multi-bridge ingress example) shortly after. No re-purchase. No surprise paywall.</p>

  <p><strong>14-day refund</strong><br/>
  If the bridge won&rsquo;t install on your Mac (Monterey+) or smoke-test won&rsquo;t pass after the troubleshooting library, reply to this email for a full refund.</p>

  <p><strong>Anthropic MCP Tunnels note</strong><br/>
  Anthropic shipped hosted MCP Tunnels for Managed Agents enterprise on 2026-05-19. Likely extends to consumer Claude.ai in 6-12 months. When it does, the bridge piece sunsets cleanly &ndash; you point your Claude.ai connector at Anthropic&rsquo;s hosted endpoint instead of your tunnel URL. The methodology and vault structure and 5 starter Projects don&rsquo;t go away. The methodology is the durable asset.</p>

  <p><strong>Cross-sell honesty</strong><br/>
  If you also publish content / DMs / proposals, add the Anti-Slop Skill Pack ($49) at <a href="https://synapsedynamics.io/anti-slop">synapsedynamics.io/anti-slop</a>. If you&rsquo;re building serious agentic software, add the Peer Operator&rsquo;s Stack v1 ($149) at <a href="https://synapsedynamics.io/stack">synapsedynamics.io/stack</a>. Skip if you already have either.</p>

  <p>Reply with one sentence on the first MCP you&rsquo;re going to bridge. I&rsquo;ll point out the failure mode most likely to bite for that specific server.</p>

  <p>&mdash; Dailen<br/>
  Synapse Dynamics &middot; Black Sheep 247 LLC</p>
</body></html>`;
}

export async function sendVoiceNetworkPackWelcomeEmail(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const resend = getResend();
  if (!resend) return;

  const r = recipientFromSession(session);
  if (!r) return;

  const result = await resend.emails.send({
    from: FROM,
    to: r.to,
    subject: "Your Claude Voice Network Pack is here",
    html: voiceNetworkPackHtml(r.firstName),
  });

  if (result.error) {
    throw new Error(
      `[email] Resend send (voice-network-pack) failed: ${result.error.message}`,
    );
  }
}
