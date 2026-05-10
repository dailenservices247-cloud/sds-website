---
title: V1 Immersive Garden — Design Brief (post-/impeccable shape)
date: 2026-05-09
command: /impeccable shape
status: AWAITING DAILEN CONFIRMATION
context_anchors:
  - PRODUCT.md (Peer Operator audience, Deliberate · Crafted · Builder-aware)
  - DESIGN.md (matte monolith ground, gold + petrol accents, Bricolage display, Geist body, Nox traveling)
  - AI Hub/Architecture/awa-v3-immersive-garden-spec.md (Immersive Garden mandate)
  - AI Hub/PRDs/sds-brand-v3-rebuild-prd.md (3-variant scope)
  - existing v1-garden/page.tsx (Claude Opus first-pass + Gemini fix)
---

# V1 Immersive Garden — Design Brief

## 1. Feature Summary

Re-pivot of the SDS marketing landing page (V1 of three brand-v3 variants). The page reads as a continuous matte monolith with a single sculpted Nox creature traveling through it on scroll, with Three.js depth in the environmental layer and GSAP/Lenis-driven cinematic motion across every section. Primary purpose: convert Peer Operator visitors into pre-qualified discovery call bookings (free 30-min OR paid audit at $1.5K / $5.5K / $7.5K tiers), with Foundation Subscription as secondary path.

## 2. Primary User Action

**Book a discovery call.** Visitor lands → vibe-checks taste through the Nox + matte monolith register → scrolls → at any point hits the gold-pill primary CTA "Start a project →" → routes to `/contact` → picks free 30-min scoping call OR paid audit booking (Lean $1.5K / Standard $5.5K / Deep $7.5K).

Foundation Subscription is **secondary path** — present in section 3 (Foundation invitation strip) with ghost-outline CTA "Take a seat → $3,500/mo," nav, and footer. Still gets weight on the page, but discovery call is the primary moment of dominance.

## 3. Design Direction

**Color strategy: Committed.** Single ground (matte gray shell `#3a3b3d`) carries 80%+ of the surface; petrol-green spine + antique-gold accent each get 5–10% via spine rules + display-emphasis words + CTA pills. No cream-as-section-ground (cream stays as ink only).

**Theme scene sentence:** "A solo founder at 1am, third coffee, comparing this site against one other AI architecture studio in a parallel browser tab, sliding through the page once to feel the rhythm before deciding whether to read the words." Forces dark monolith register; rejects bright/cream/light themes outright.

**Anchor references:**
- **Immersive Garden (immersive-garden.com)** — primary aesthetic anchor. Editorial 3D, scroll-orchestrated cinematic motion, bas-relief environments, generous whitespace, transparency about the craft.
- **Linear (linear.app)** — typography rigor + tight deliberate dark UI for editorial register reference.
- **Apple product pages** — cinematic scale tweens, deliberate sequencing of moments.

**Per-surface override vs DESIGN.md:** none. V1 honors DESIGN.md exactly.

**Visual direction probe:** SKIPPED. Harness lacks native image-gen for this run. Existing locked Nox PNGs + DESIGN.md + currently-running V1 first-pass already establish the visual lane definitively.

## 4. Scope

- **Fidelity:** PRODUCTION-READY. Replaces current V1 first-pass as the deployable variant.
- **Breadth:** ONE PAGE — `app/(brand-v3)/v1-garden/page.tsx`. Six sections (Hero / Portfolio / Foundation / Services / Now-Next-Later / Channels) per inherited IA.
- **Interactivity:** Shipped-quality scroll-orchestrated motion. R3F canvas + GSAP timelines + Lenis hijacked smooth scroll. Backstage layer reveals technical detail via toggle.
- **Time intent:** Polish-until-it-ships. NOT a sketch.

## 5. Layout Strategy

**Spatial approach: full-bleed cinematic with asymmetric typographic emphasis.** Reject grid-centered conventional landing layout (D-density Linear-changelog register banned). Reject card-grid-everywhere (Impeccable anti-pattern).

**Hierarchy:**
1. **Hero** — 100vh full-bleed. Display-uppercase H1 with multi-color word emphasis (cream + gold + petrol) anchors the LEFT 5/12 columns. Traveling Nox at fixed-right 7/12 with R3F environmental gradient field behind. Editorial publication caption mark below H1 ("VOL. 03 / ISSUE Nº 01"). Dual CTA: **gold pill primary "Start a project →" (discovery)** + ghost outline secondary "Explore the portfolio."
2. **Portfolio at-a-glance** — 12-col grid, cards 2x3 desktop / 1col mobile. LIVE + PRE-LAUNCH only. Card hover = border tint shift + 2px translateY.
3. **Foundation Subscription invitation** — secondary moment with weight but NOT the loudest. Asymmetric. Heavy display H2 LEFT, body copy + CTA RIGHT. Listening-pose Nox crossfades in here. **Ghost-outline CTA "Take a seat → $3,500/mo"** (NOT gold pill — keeps discovery as primary). Petrol spine rule above + below.
4. **Services preview** — 3-col grid (Architect / Automator / Strategist) with locked tier prices visible. Working-pose Nox crossfade. Cards = level-2 elevation (`shell-deep`).
5. **Now / Next / Later** — 3-col transparency strip. Editorial publication mark "II. ROADMAP" or similar above. Working-pose Nox crossfade. NO speculative future-tense — only what's shipped (Now), in-flight (Next), banked-with-trigger (Later).
6. **Channels (Allday 24seven + Day One AI)** — 2-col cross-routing. Resting-pose Nox settles here.

**Backstage toggle** lives bottom-right, sticky. Click reveals overlay-mode: dimmed page background + foreground panel with brand v3 build wireframes + design rationale (drawn from PRODUCT.md + DESIGN.md). Closes via X or Escape. Demonstrates "absolute transparency" mandate from Immersive Garden spec.

**Rhythm:** generous vertical breath between sections (`section-y` token = clamp 4rem–9rem). Petrol-spine hairline rules between every section. Mono section labels ("II. PORTFOLIO", "III. THE FOUNDATION", etc.) anchor each section as editorial chapter marks.

## 6. Key States

| State | Treatment |
|---|---|
| **Default** (page loaded, scroll = 0) | Hero visible. Nox rendered at "working" pose, fixed-right. R3F canvas idle (subtle ambient particle drift). All other sections off-screen. |
| **Scrolling** | Lenis hijacked smooth scroll active. GSAP ScrollTrigger fires per-section reveal stagger. Traveling Nox crossfades pose at thresholds (working → listening at 0.34 → presenting at 0.5 → working at 0.68 → resting at 0.86). R3F camera does subtle parallax on Y. Hero copy lifts/fades on scroll-out. |
| **Reduced motion** | All animations static. Nox renders at current-pose snapshot, no crossfade. Lenis disabled (native scroll). R3F canvas renders single still frame. Section reveals immediate (no stagger). |
| **Mobile** | Traveling Nox hidden (desktop-first cinematic). R3F canvas hidden or simplified. Sections stack 1-col. Hero copy dominates. CTA buttons full-width sticky bottom-bar style. |
| **Backstage toggle: off** | Default page. Toggle button visible bottom-right but unobtrusive. |
| **Backstage toggle: on** | Page dims via 0.6 black overlay. Backstage panel slides up from bottom, ~80vh height. Contains: brand v3 wireframes (3 SVG diagrams), DESIGN.md excerpt (Colors + Typography sections), Nox lock history (7 thumbnails + dates), built-with attribution. Close button + Escape close. |
| **Loading (initial)** | Cream skeleton placeholders for Nox + R3F canvas while assets load. Hero copy renders immediately (HTML-first, JS-progressive). |
| **Error (R3F fails)** | Graceful fallback: 2D Nox PNG only, no canvas. Page still functional. |

## 7. Interaction Model

- **Scroll** = primary navigation. Lenis hijacks for buttery smooth pacing. GSAP ScrollTrigger fires section reveals + Nox pose swaps + R3F camera parallax.
- **Click "Take a seat" (Foundation CTA)** → Stripe Checkout for $3.5K/mo subscription product. Existing `/foundation` route handles this.
- **Click "Start a project" (secondary)** → `/contact` route.
- **Click portfolio card** → `/portfolio/[slug]` detail.
- **Click service tier card** → `/services/[architect|automator|strategist]`.
- **Click backstage toggle (bottom-right)** → overlay opens. Click X / press Escape → closes.
- **Hover card** → border shifts `border-subtle` → `border-strong` + 2px translateY, 200ms ease-out.
- **Hover gold pill CTA** → background brightens `gold` → `gold-bright`.
- **Focus** → 2px gold outline, 2px offset, on every interactive element.
- **Reduced motion preference** → all motion degrades gracefully (no parallax, no scroll-jacking, instant section reveals).

## 8. Content Requirements

**Hero copy:**
- Caption mark: "SYNAPSE DYNAMICS / V1 IMMERSIVE GARDEN — VOL. 03 / ISSUE Nº 01" (editorial publication anchor)
- H1: multi-color, draft: "BUILD THE / **THINKING** (gold) / INTO THE / **THING.** (petrol)" — current copy passes anti-overclaim rule
- Body: "An AI architecture studio for solo founders, multi-product builders, and operators-who-build. Sites, apps, automations, and the strategy underneath them — shipped by a small studio that thinks before it codes."
- Primary CTA: "Start a project →" (Contact / discovery call)
- Secondary CTA: "Explore the portfolio" (ghost outline → /portfolio)
- Editorial stamp: "I. OPEN BERLIN — CLOSED FRIDAY — MMXXVI"

**Foundation Section copy** (secondary path, ghost outline CTA):
- Mono label: "III. THE FOUNDATION"
- H2: "A standing seat at the architecture table."
- Body: "Monthly subscription. Direct access to the strategist, architect, and automator. Decisions get made; momentum stays."
- CTA: "Take a seat — $3,500/mo →" (ghost outline, NOT gold pill)
- Subline: "Cancel anytime. No setup fee."

**Services tier prices** (pull from `lib/content/services.ts`):
- Architect: Lean Build $4,500 starting / Standard Platform $9,500 / Custom Ecosystem $20,000
- Automator: Workflow Spark $2,500 / Operations Suite $5,500 / Embedded Automator $1,500/mo
- Strategist: Discovery Sprint $1,500 flat / Quarterly Plan $4,500 flat / Embedded Strategist $3,500/mo

**Now / Next / Later transparency:**
- Now: "Phase 0 of Autonomous Web Agency. Brand v3 mascot lock. Otates close."
- Next: "Foundation subscription public. AWA v2 toolchain validation. Scrlpets v2 brand."
- Later: "Apotheosis. NeoHood programmable digital jurisdiction. Sovereign Ledger."

**Banned-words filter** applied throughout. NO em dashes in body copy (use commas / colons / periods). NO "leverage" / "synergy" / "let's go" / "10x" / "AI-native" / "unlock potential."

**Backstage panel content:**
- Headline: "How this was built."
- Three sub-panels: "The brand," "The motion," "The Nox."
- Each with 2-3 sentences + 1 SVG/PNG asset.
- Footer credit: "Built with Open Design + Claude Code + Gemini CLI + Higgsfield. Source on GitHub."

## 9. Recommended References (during craft)

- `reference/brand.md` — brand register (this is brand, not product)
- `reference/motion-design.md` — GSAP/Lenis timelines, scroll orchestration patterns
- `reference/spatial-design.md` — full-bleed cinematic + asymmetric grid spacing
- `reference/typography.md` — display hierarchy + multi-color word emphasis pattern
- `reference/interaction-design.md` — scroll-jacking caveats, reduced-motion fallback patterns
- DESIGN.md (project root) — token contract
- PRODUCT.md (project root) — strategic guardrails
- `AI Hub/Architecture/awa-v3-immersive-garden-spec.md` — full spec

## 10. Open Questions

1. **R3F environmental layer specifics.** Recommend: subtle particle field (200 sparse points) drifting along Y axis at 0.005 units/sec + Bezier-curve 3D wireframe representing the spine ridge running edge-of-viewport on the right side of the canvas. Confirm OR alternative direction.
2. **Backstage SVG wireframes.** Either generate via Higgsfield Nano Banana Pro tonight OR use placeholder SVGs (3 simple geometric diagrams) for V1 + replace in polish pass. Recommend: placeholder SVGs tonight.
3. **GSAP license.** Free tier covers the locked motion plan (ScrollTrigger + Timeline). No SplitText / MorphSVG / Club GSAP needed. Confirm OR flag if budget for paid tier exists.
4. **Lenis configuration.** Default ease, lerp 0.1, smoothWheel true, smoothTouch false. Confirm OR override.
5. **CTA route wire-up.** Hero primary "Start a project →" routes to `/contact` (existing — has free 30-min booking + paid audit tier buttons). Foundation Section CTA "Take a seat" routes to `/foundation` (existing — Stripe Checkout). Confirm both routes intact.
6. **Hero copy multi-color word emphasis.** Current draft uses "THINKING" (gold) + "THING." (petrol). Keep or revise word choice?

---

## Confirmation request

Reply **"y"** to confirm this brief and proceed to `/impeccable craft`, OR specific revisions ("y but Q1: simpler particle field" / "swap hero copy: ..." / etc).

After confirmation, craft will:
1. Install Lenis smooth-scroll wrapper at app root
2. Set up GSAP ScrollTrigger with reduced-motion fallback
3. Build R3F environmental canvas (particle field + petrol-spine wireframe)
4. Re-write `v1-garden/page.tsx` to use GSAP+Lenis instead of Framer's useScroll for section reveals + Nox traveling
5. Add backstage layer component with toggle + 3 placeholder SVGs
6. Run `/impeccable typeset` + `/impeccable animate` + `/impeccable audit` + `/impeccable polish`
7. Verify tsc + lint + Lighthouse perf/a11y/best-practices/SEO ≥ 90
