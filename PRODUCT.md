# Product

## Register

brand

## Users

**Peer Operators** — solo founders, multi-product builders, and operators-who-build (people who run their own thing AND wire it themselves, not delegators).

**Context when visiting:** non-traditional hours (nights, weekends, between focus blocks), often comparing two or three options across browser tabs, scanning for trust signals AND actual-work proof. Third coffee. Skeptical of hype but allergic to corporate bored-tone.

**The job they're trying to get done:** decide whether the person behind this site can be trusted to ship the architecture they're hiring out — without being condescended to, sold-to, or asked to fill out a 200-field qualification form.

**Out of scope:** enterprise procurement looking for SOC 2 + DPA boilerplate. AI-bros looking for cheap-fast-generic. Curiosity-tourists with no project.

## Product Purpose

The Synapse Dynamics website exists to **screen for taste-fit before pricing fit**. A Peer Operator should be able to land here, vibe-check the work, sense the rhythm, and self-select in (book a discovery call) or self-select out (close the tab, never call).

Site does the screening so the call doesn't have to. Wrong-fit prospects (who want hype, speed, cheap, generic) self-eject because the visual + verbal register signals "this is not for you." Right-fit prospects (who want deliberate, considered, crafted architecture work) book.

**Success looks like:** pre-qualified discovery call bookings (free 30-min OR paid audit at $1.5K / $5.5K / $7.5K tiers) AND Foundation Subscription ($3.5K/mo retainer) joins from people who already believe before they call. Conversion isn't volume — it's fit.

**Adjacent surface:** the site also serves as the proof-of-work specimen for the Autonomous Web Agency (AWA) — a Peer Operator considering hiring SDS to build their site sees this site, evaluates the taste, decides.

## Brand Personality

**Three words:** *Deliberate · Crafted · Builder-aware.*

- **Deliberate** — thinking-aloud rhythm. Paused. Considered. Voice register is "let me just try something" + "actually, let me undercut this" — the opposite of MrBeast-energy hype display. Anchored in the Hormozi + Nate-Jones voice extractions.
- **Crafted** — every element earns its place. Immersive Garden aesthetic register: editorial 3D, scroll-orchestrated cinematic motion, bas-relief mascot, petrol-and-gold accents on matte ground. The site is itself an artifact, not a brochure.
- **Builder-aware** — the audience is Peer Operators. The copy meets them where they are at 1am, third coffee, comparing options. No condescension. No "let's f-ing go ninja." No enterprise bored-tone.

**Emotional goal:** *calm confidence + slow-burn excitement.* Not hype-rush. Not enterprise-bored. The vibe should be "this person actually ships, and they think before they code." Trust through evidence, not adjectives.

## Anti-references

**What this should NOT look like:**

- **AI-bro / GoDaddy-template / generic SaaS hero** — "Get started for free!" + 3 stock-photo testimonials + 5 logos in a "Trusted by" strip = death by template.
- **Stripe-on-everything cliché** — corporate fintech polish where it doesn't fit. Stripe is great FOR Stripe. We are not Stripe.
- **Linear-density-on-marketing** — Linear's UI density (D-density per locked taste profile) belongs on changelogs and dashboards, NOT on hero conversion pages. Reject information density on landing surfaces.
- **MrBeast-loud hype display** — attention-arresting yelling, oversized arrows, hero CTAs that scream "CLICK HERE." Wrong audience. Peer Operators interpret hype as low-quality.
- **Duolingo-cute-childish** — over-friendly mascot, bouncy easing, exclamation points. Nox is the antithesis of this — sculpted, considered, not waving at you.
- **Synthwave neon glow / generic AI brain icons / glowing circuit overlays** — clichéd AI imagery explicitly banned by the locked Nox brief. No glowing brains. No circuit board patterns. No electric blue.
- **Enterprise procurement aesthetic** — "Talk to Sales" forms with 18 fields, compliance language as marketing copy, navy + gold trust palette. We sell to people, not procurement teams.

**What it SHOULD look like (pro-references):**

- **Immersive Garden (immersive-garden.com)** — primary aesthetic anchor. Editorial 3D, scroll-orchestrated cinematic motion, bas-relief environments, generous whitespace, transparency about the craft itself.
- **Linear (linear.app)** — typography rigor + tight deliberate dark UI when used selectively (variant 2 reference for SDS Brand v3 build).
- **Cursor (cursor.com)** — developer-tool clean, asymmetric layouts, kinetic-playful but restrained motion (variant 3 reference).
- **Apple product pages** — cinematic scale tweens, generous whitespace, deliberate sequencing of moments. Anchor of locked taste profile v1.
- **Meebits voxel renders** — 3D mascot register reference for closed-sculpted, non-skeumorphic, non-cute creature design.

## Design Principles

1. **Thinking before coding.** Every line, every element, every motion choice ships intentionally. Visible deliberation is the brand. Reject generic "good enough" defaults — they signal the opposite of what we sell.

2. **Show, don't tell.** Proof through shipped work, not hype copy. Portfolio cards over testimonials. Live status indicators over "trusted by" logos. The site itself is the strongest sales argument — if Peer Operators look at it and feel "this person ships," the copy can be quiet.

3. **Calm before bold.** Quiet sections (matte-gray monolith, deliberate spacing, restrained type) set up loud moments (display-uppercase H1 in petrol+gold, traveling Nox crossfade, scroll-orchestrated reveal). Without quiet, loud doesn't land.

4. **Builder-to-builder voice.** Copy speaks Peer Operator's actual language — "thinking before coding," "shipped by a small studio," "out loud" transparency. NOT agency-speak ("We empower brands to..."), NOT enterprise-speak ("Enterprise-grade AI architecture..."), NOT hype-speak ("10x your output").

5. **Anti-overclaim.** Drop relationship-warmth. Lead with observation about THE THING (the work, the craft) rather than warmth-via-personal-relationship. Per locked Drop-Overclaim rule from 2026-05-08 — "Otates is hard to miss" beats "We go back."

## Accessibility & Inclusion

**Target:** WCAG 2.1 AA across all surfaces. Specific commitments:

- **`prefers-reduced-motion` respected on every animation.** Nox traveling renders static at current pose when reduced-motion set. Parallax, scale tweens, scroll-orchestration all degrade gracefully. Implemented in V1 first-pass via Framer Motion's `useReducedMotion()`.
- **Color contrast:** cream `#efede5` on shell `#3a3b3d` = ~10.6:1 ratio (passes AAA). Gold `#c8a23e` on shell passes AA at large display sizes only — never used for body copy. Petrol-green `#2a6055` on shell passes AA for accent/divider use.
- **No info by color alone:** status pills (LIVE / PRE-LAUNCH / CONCEPT / etc.) include both background color AND uppercase text label. LIVE-status pulse animation is supplementary, not load-bearing for state communication.
- **Focus rings visible** on every interactive element (gold pill CTA, ghost-outline secondary, all links). Focus ring uses high-contrast against any ground.
- **Keyboard navigation:** logical tab order, no keyboard traps. Skip-to-content link present.
- **Screen readers:** Nox mascot renders with descriptive alt text per pose ("Nox — working pose / extended building register"). Decorative gradients + spine rules carry `aria-hidden="true"`.
- **Touch + pointer targets:** minimum 44×44px hit areas on mobile. CTAs large + spaced.
- **No autoplay video as page-load default.** Future Higgsfield-generated environmental textures (Kling 3.0 / Sora V3) honor reduced-motion + pause when off-screen + pause when tab hidden.
- **Banned-words rule applied to all copy** — anti-buzzword filter from locked taste profile (no "leverage," no "synergy," no "let's go," etc.) — keeps copy plain-language accessible.
