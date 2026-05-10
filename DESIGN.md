---
name: Synapse Dynamics — Brand v3
description: The Editorial Workshop — matte monolith ground, sculpted Nox mascot, Immersive-Garden-register cinematic motion for Peer Operators
colors:
  shell: "#3a3b3d"
  shell-deep: "#2a2a2d"
  spine: "#2a6055"
  spine-bright: "#347466"
  gold: "#c8a23e"
  gold-bright: "#d8b85a"
  wine: "#7e303a"
  cream: "#efede5"
  cream-deep: "#e0ddd0"
  ink-on-shell: "#efede5"
  ink-on-shell-strong: "#ffffff"
  ink-on-shell-muted: "#9b9b96"
  ink-on-shell-dim: "#6c6c69"
  ink-on-cream: "#2a2a2d"
  ink-on-cream-muted: "#5c5d60"
  border-subtle: "#4a4b4d"
  border-strong: "#5c5d5f"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Anton, Bebas Neue, system-ui, sans-serif"
    fontSize: "clamp(3rem, 7.2vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 100, 'opsz' 96"
  display-section:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.0
    letterSpacing: "0"
    fontVariation: "'wdth' 100, 'opsz' 48"
  body:
    fontFamily: "GeistSans, Geist, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  body-large:
    fontFamily: "GeistSans, Geist, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "GeistSans, Geist, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "normal"
  mono:
    fontFamily: "JetBrains Mono, GeistMono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "12px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  block-y: "clamp(2rem, 5vh, 4rem)"
  section-y: "clamp(4rem, 10vh, 9rem)"
  inline-gap: "clamp(1rem, 2vw, 2rem)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.shell}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.gold-bright}"
    textColor: "{colors.shell}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "16px 28px"
    typography: "{typography.body}"
  button-ghost-hover:
    backgroundColor: "{colors.shell-deep}"
    textColor: "{colors.cream}"
  card:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "32px"
  card-elevated:
    backgroundColor: "{colors.shell-deep}"
    textColor: "{colors.cream}"
    rounded: "{rounded.md}"
    padding: "32px"
  pill-mono-label:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    typography: "{typography.mono}"
  pill-status-live:
    backgroundColor: "{colors.spine}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    typography: "{typography.mono}"
---

## Overview

**The Editorial Workshop.** A magazine-grade marketing surface for Synapse Dynamics — an AI architecture studio for Peer Operators. The site reads as a continuous matte monolith: warm dark gray ground (Dodge Durango Destroyer Gray register), antique-gold filaments threaded through accents, petrol-green spine ridges marking section transitions, with a single sculpted Nox creature traveling through the page on scroll.

The visual register is **Immersive-Garden editorial cinematic** — bas-relief 3D mascot photography against a continuous matte plane, scroll-orchestrated parallax + scale tweens, generous whitespace, deliberate sequence of moments. The page does NOT use the Linear-density UI register (info-dense changelog format), the Stripe-fintech polish register (corporate navy + gold), or the AI-bro template register (gradient hero + 3 testimonials).

Mood: deliberate, crafted, builder-aware. Calm-confident with slow-burn excitement. Anti-hype. The interface communicates "this person actually ships and thinks before coding" through restraint + craft, not adjectives.

Anti-references: AI-bro/GoDaddy generic, Stripe-on-everything, Linear-density-on-marketing, MrBeast-loud display, Duolingo cute-childish, synthwave neon glow, generic AI brain icons.

Pro-references: Immersive Garden (immersive-garden.com), Linear (typography rigor only), Cursor (developer-tool clean), Apple product pages, Meebits voxel renders.

## Colors

**Strategy: Committed.** One ground (matte gray shell) carries 80%+ of every surface; petrol-green primary + antique-gold accent each get 5–10% of attention via spine rules + display-emphasis words + CTA pills + mono labels. Cream is reserved for ink (text on shell) — NOT for inverted section grounds (cream-as-ground reads generic and breaks the monolith).

All colors are intentionally **tinted neutrals**, not pure values. The shell `#3a3b3d` is warm gray (slight brown undertone) — explicitly chosen over `#2a2a2a` (cool gray) per locked taste profile v1. The cream `#efede5` is warm off-white, not paper. The gold is **antique gold** (desaturated brass register), not Stripe-gold (corporate). The petrol-green is desaturated bridge-of-blue/green at low chroma — never the saturated emerald `#22c55e` from brand v2.

**Forbidden:** pure black `#000`, pure white `#ffffff`, pure gray (no warmth), saturated emerald, electric blue, neon anything.

| Role | Token | Hex | Use |
|---|---|---|---|
| Body shell / primary ground | `shell` | `#3a3b3d` | Page background. Card backgrounds. The continuous monolith. |
| Deeper shell | `shell-deep` | `#2a2a2d` | Elevated card variant. Section breaks needing slight depth. |
| Primary accent | `spine` | `#2a6055` | Hairline rules between sections. Section-label dividers. Working-state interior emphasis. |
| Spine bright | `spine-bright` | `#347466` | Hover states on petrol-accented elements. |
| Secondary accent | `gold` | `#c8a23e` | Mono labels (uppercase). Display-emphasis word color. Primary CTA pill background. Antique-gold-filament accents. |
| Gold bright | `gold-bright` | `#d8b85a` | Hover on gold elements. |
| Emotion accent | `wine` | `#7e303a` | Used sparingly. Reserved for "before" labels or moments needing weight. |
| Warm cream (ink) | `cream` | `#efede5` | Body text on shell. Display headline base color. |
| Cream deep | `cream-deep` | `#e0ddd0` | Slight tint for cream-on-cream contrast (rare — use only when required). |
| Ink strong | `ink-on-shell-strong` | `#ffffff` | Reserved — display-emphasis only when cream isn't sharp enough. |
| Ink muted | `ink-on-shell-muted` | `#9b9b96` | Body copy secondary. Subhead descriptive text. |
| Ink dim | `ink-on-shell-dim` | `#6c6c69` | Tertiary metadata. Caption muting. |
| Border subtle | `border-subtle` | `#4a4b4d` | Card borders, divider lines on shell ground. |
| Border strong | `border-strong` | `#5c5d5f` | Ghost button outlines. Focus emphasis. |

**Contrast verifications:** cream `#efede5` on shell `#3a3b3d` = 10.6:1 (passes AAA). Gold on shell = passes AA at large display sizes only — never used for body. Petrol on shell = passes AA for divider/accent use.

**No info by color alone.** Status pills (LIVE / PRE-LAUNCH / etc.) include both background color AND uppercase text label. LIVE pulse animation is supplementary, not load-bearing.

## Typography

**Display: Bricolage Grotesque** (variable font, weight 700, condensed-bold register). Stand-in for the locked Akira Expanded display lock — Bricolage covers the same condensed-heavy uppercase territory as a free open-licensed alternative. Use ONLY at 36px+ display sizes; never for body. Variation axes: `'wdth' 100` baseline (do not condense further), `'opsz' 96` for hero-scale, `'opsz' 48` for section-heading-scale.

Text-transform on display: **uppercase** by default. Letter-spacing: `-0.005em` on hero (slight tightening to compensate for uppercase tracking), `0` on section heads.

**Body: Geist Sans** (Vercel's geometric grotesque, free MIT license). Replaces Inter — Inter is Impeccable-anti-pattern banned as a generic default. Geist is distinctive, editorial-grade, and pairs well with Bricolage for display+body contrast.

Body weights: 400 (default reading), 500 (UI emphasis, navigation, CTAs), 600 (sub-headings only). No thin weights below 400 — they soften the deliberate register.

**Mono: JetBrains Mono** (existing system) for uppercase technical labels, status pills, editorial publication captions ("VOL. 03 / ISSUE Nº 01"), and code blocks. Always uppercase for caption-tier mono. Letter-spacing `0.08em` for caption/label use; normal for code blocks. Color: gold `#c8a23e` on shell ground.

**Hierarchy via scale + weight contrast** (never via color alone). Scale ratio ~1.25 between steps minimum.

| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero display | Bricolage | clamp(3rem, 7.2vw, 6rem) | 700 | Uppercase. Multi-color word-emphasis allowed (one cream + one gold + one petrol per phrase). |
| Section display | Bricolage | clamp(2.25rem, 4.5vw, 3.5rem) | 700 | Uppercase. |
| Sub-heading | Geist | 1.5–1.75rem | 600 | Card titles, pricing tier names. |
| Body large | Geist | 1.25rem | 400 | Hero descriptions, intro paragraphs. |
| Body | Geist | 1.125rem | 400 | Standard reading. Line-height 1.55. |
| Caption | Geist | 0.875rem | 400 | Metadata, footnotes. |
| Mono caption | JetBrains | 0.75rem | 500 | Section labels (UPPERCASE), status pills, editorial publication marks. |

**Cap body line length 65–75ch.** Long-form copy never extends edge-to-edge — readability over coverage.

**Anti-patterns banned:** Inter, Arial, Helvetica defaults. No `font-family: sans-serif` fallback as primary. No bouncy or italic display headlines.

## Elevation

**Philosophy: flat-with-tonal-depth.** Zero box shadows on the matte ground (shadows on a matte register read fake / glass-morphic / Stripe-cliché). All depth comes from background-color shifts (`shell` → `shell-deep`) and 1px tinted borders.

The exception: the traveling Nox mascot is itself a 3D bas-relief render with baked-in lighting + shadow on the cream studio backdrop within the PNG — that's photographic depth, not CSS shadow.

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat ground | No border, no shadow | Page background, body content, hero text |
| 1 — Bordered card | 1px solid `border-subtle` `#4a4b4d` | Portfolio cards, pricing tiers, contact form fields |
| 2 — Elevated card | `shell-deep` `#2a2a2d` background + bordered | Hover state for level-1 cards. Foundation Subscription pitch container. |
| 3 — Inverted moment | `cream` background + `ink-on-cream` text | Reserved for explicit content modules where cream-on-shell would lose readability (e.g. long-form blog posts on `/lab`). NOT for hero or portfolio sections — those stay matte. |
| 4 — Bas-relief mascot | 3D-rendered Nox PNG with baked lighting | Single traveling instance, fixed position right of viewport on desktop. Hidden on mobile per current V1 implementation. |

**No glassmorphism. No backdrop-blur as decoration.** Both are absolute Impeccable bans. The only allowed blur is the 6px filter on the AnimatePresence pose-crossfade transition (functional, not decorative).

## Components

### Buttons

**Primary CTA** (`button-primary`):
- Background: `gold` `#c8a23e`
- Text: `shell` `#3a3b3d` (dark ink on gold for contrast)
- Padding: 16px 28px
- Border-radius: pill (9999px)
- Typography: Geist body, weight 500
- Hover: background → `gold-bright` `#d8b85a`
- Focus: 2px outline `border-strong` `#5c5d5f`, 2px offset

**Secondary / Ghost CTA** (`button-ghost`):
- Background: transparent
- Text: `cream` `#efede5`
- Padding: 16px 28px
- Border-radius: pill (9999px)
- Border: 1px solid `border-strong` `#5c5d5f`
- Hover: background → `shell-deep` `#2a2a2d`

### Cards

**Standard card** (`card`):
- Background: `shell` `#3a3b3d` (same as page — depth via border, not contrast)
- Border: 1px solid `border-subtle` `#4a4b4d`
- Border-radius: 12px (`rounded.md`)
- Padding: 32px
- Hover: border → `border-strong` `#5c5d5f`, slight `transform: translateY(-2px)`, transition 200ms ease-out

**Elevated card** (`card-elevated`):
- Background: `shell-deep` `#2a2a2d`
- Same other props

### Pills + status

**Mono section label** (`pill-mono-label`):
- Background: transparent
- Text: `gold` `#c8a23e`
- UPPERCASE, JetBrains Mono 0.75rem weight 500, letter-spacing 0.08em
- Used as section anchors ("II. PORTFOLIO", "III. THE FOUNDATION")
- Mimics editorial publication chapter marks

**Status pill — LIVE** (`pill-status-live`):
- Background: `spine` `#2a6055`
- Text: `cream` `#efede5`
- Border-radius: pill
- 4px 10px padding
- Mono caption typography

**Status pill — PRE-LAUNCH:** background `shell-deep`, same styling.

### Spine rule

Petrol-green hairline horizontal divider that draws in on scroll-into-view. SVG `path` with `pathLength` animated 0 → 1 over 1.4s ease-out. Optional centered uppercase mono label overlaid (e.g. "II. PORTFOLIO") with `shell` background to mask the line behind the label.

```tsx
<motion.line stroke="var(--bv3-spine)" strokeWidth="1" pathLength={0 → 1} />
```

### Mascot — Nox

The single traveling Nox mascot is a `<motion.div>` at `position: fixed`, `top: 50%`, `right: 3vw`, `translateY: -50%`, with `useScroll` document-level progress driving `x` / `y` / `scale` / `rotate` MotionValues. Pose swaps at scroll thresholds via `useMotionValueEvent` + `AnimatePresence` crossfade with 6px blur on enter/exit (700ms ease-out).

Pose mapping (per V1 first-pass):
- Hero (0.0–0.16): `working` (worm-only, no baked wordmark text)
- Portfolio (0.16–0.34): `working`
- Foundation (0.34–0.5): `listening`
- Services (0.5–0.68): `presenting`
- Roadmap (0.68–0.86): `working`
- Channels (0.86–1.0): `resting`

Sources: 7 locked PNGs at `public/brand-v3/nox-*.png` per `AI Hub/Brand/sds-brand-v3-mascot-brief.md` v1 LOCKED 2026-05-08.

Reduced-motion fallback: render static at current pose, no parallax/scale/rotate.

Hidden on mobile (`hidden md:block`) per desktop-first cinematic brief. Mobile fallback: corner-pinned smaller variant — banked for follow-up.

### Forms

Inputs match card register: shell-deep background, 1px border-subtle, 12px radius, 16px padding, 2px gold focus ring.

## Do's and Don'ts

### Do

- **Maintain the matte monolith.** Every section uses `shell` `#3a3b3d` as ground. Petrol-spine rules + gold mono labels + Bricolage display are how sections differentiate.
- **Use the binary radius system: 12px (containers) or 9999px (pills).** No values between.
- **Reserve display moments.** Bricolage 700 only at 36px+. One hero display per route. Section displays smaller.
- **Use multi-color word emphasis on hero H1.** "BUILD THE / **THINKING** (gold) / INTO THE / **THING.** (petrol)" — the multi-color stack is signature.
- **Pulse LIVE status badge** with `prefers-reduced-motion` honored.
- **Apply scroll-orchestrated motion across the entire page.** Every section animates on entry (stagger fade + y-shift). The traveling Nox crossfades poses at section thresholds. Hero copy lifts/fades on scroll-out. Per Immersive Garden register.
- **Keep the cream as ink, not as ground.** Cream `#efede5` is text color on shell. Avoid cream-as-section-background — it reads generic and breaks the monolith.
- **Use editorial publication marks.** "VOL. 03 / ISSUE Nº 01 · AN AI ARCHITECTURE STUDIO" mono caption. "I. OPEN BERLIN — CLOSED FRIDAY — MMXXVI" stamp. These signal magazine-grade craft.
- **Honor reduced-motion** on every animation.
- **Apply Banned Words filter** to all copy: no "leverage," no "synergy," no "let's go," no MrBeast-energy.

### Don't

- **Don't use shadows.** Zero box-shadow anywhere. Depth via border + background shift.
- **Don't use cream as a section background.** Pure-shell ground is the locked direction. (Exception: Level 3 elevation for long-form-blog readability only.)
- **Don't use Inter, Arial, or generic-default body fonts.** Geist is the locked body family.
- **Don't use bounce or elastic easing curves.** Cubic-bezier ease-out (`[0.16, 1, 0.3, 1]`) for all transitions.
- **Don't use the saturated emerald `#22c55e` from brand v2.** Petrol-green `#2a6055` is the v3 primary accent.
- **Don't use clichéd AI imagery.** No glowing brains, no electric blue, no circuit overlays, no synthwave neon.
- **Don't overdesign.** Apply the Drop-Overclaim rule — observation about the work beats warmth-via-relationship language. Trust the matte ground + Nox + display type to carry the brand; don't add decorative gradients/flourishes "to fill space."
- **Don't apply MrBeast-energy display register.** Quiet base, considered loud moments. Hero display IS the loud moment per route — don't compete with it.
- **Don't add modal-as-first-thought.** Modals are usually laziness. Inline progressive disclosure first.
- **Don't write em dashes.** Use commas, colons, semicolons, periods, or parentheses. (This applies to copy, not to code comments or display headlines where dash punctuation is intentional editorial.)
- **Don't use side-stripe borders** as decorative accents (`border-left: 4px` on cards). Full borders or background tints only.
- **Don't ship gradient text** (`background-clip: text` on a gradient). Solid colors only. Multi-color word emphasis = whole-word color swap, not gradient.

---

## Sources

- `PRODUCT.md` (sibling) — strategic register + users + principles
- `AI Hub/Brand/sds-brand-v3-mascot-brief.md` v1 LOCKED 2026-05-08 — 7 locked Nox artifacts
- `AI Hub/Brand/dailen-taste-profile.md` v1 — voice, visual, motion, layout, audience anchors
- `AI Hub/Architecture/awa-v3-immersive-garden-spec.md` — authoritative AWA v3 spec (Immersive Garden / Dilshan Arukatti aesthetic mandate)
- `AI Hub/Decisions/sds-website-brand.md` — brand v3 supersession entries 2026-05-08
- `lib/design/brand-v3-tokens.ts` — TypeScript token export (palette + type + Nox paths)
- `app/globals.css` `[data-theme="brand-v3"]` block — CSS variable mirror of these tokens

Stale archive (do not consume): `DESIGN.v3-experiment-2026-04-30.archive.md` — pre-brand-v3 Replicate × Ollama synthesis from the abandoned `(v3)` route group experiment. Preserved for history only.
