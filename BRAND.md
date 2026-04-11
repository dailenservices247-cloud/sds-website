# Synapse Dynamics Segmented — Brand Identity v2.1 (LOCKED)

**Status:** Locked 2026-04-10. Supersedes `sds-brand-art-direction-v1.md`.
**v2.1 addition:** Integrated wordmark-S. The "S" in "Synapse" is now a custom worm-letterform — the wordmark carries the logo DNA inline.
**Decided by:** Dailen gave creative free reign (v2); Dailen asked for the wordmark-S integration (v2.1).
**Next step:** Dispatch website build to Code tab. This doc is the single source of truth for all visual identity decisions.

---

## 1. The Thesis (unchanged from v1)

**Segmented Regeneration.** SDS builds AI systems that are segmented (composed of independent, swappable parts) and regenerative (they recover from failure, they learn, they grow back stronger when pruned). The brand expresses that thesis through a single primary mark (a worm) and a constellation of segmented, regenerating creatures that appear quietly in the background.

The whole visual system should make a skeptical founder at 11:47 PM on their phone say: *"these people are different."*

---

## 2. The Primary Mark

**Mark name:** Nodal Worm
**File:** `sds-logo-primary-mark.svg`
**Concept origin:** Concept 01 from the v1 gallery, refined.

### What it is
Nine tapering green circles arranged along a subtle S-curve spine. The head (left) is the largest circle; each subsequent node shrinks toward the tail (right). A thin connector line runs through the center of every node at 55% opacity, tying them into one continuous body.

### What it reads as
- **A worm** — because of the tapering and the curving spine.
- **A data pipeline** — because of the connected nodes.
- **A lineage tree / evolution diagram** — because of the progression from large to small.
- **A segmented architecture diagram** — because the nodes are discrete but connected.

Four valid readings from one mark. That's the test of a strong logo — it doesn't have one meaning, it has several that all align with the brand thesis.

### Usage rules
- **Color:** `#22C55E` on dark backgrounds. On light backgrounds, use the same green (it holds up). Black-and-white fallback: all nodes `#0A0F0C`, spine at 55% opacity.
- **Minimum width:** 120px wide. Below that, use the monogram instead.
- **Clear space:** at minimum, the diameter of the head node (14px in the base SVG) on all sides. Nothing gets placed inside that clear zone.
- **Aspect ratio:** 4:1 (320×80 in base SVG). Do NOT stretch vertically or horizontally.
- **Never:** rotate it, flip it, recolor the nodes individually, animate the nodes independently, add drop shadows, or place it on a busy background.

### Where it goes
- Website hero (top-left corner, Inter wordmark to its right)
- Business card (front, centered above the wordmark)
- Pitch deck title slides
- Email signature (horizontal lockup)
- Invoice header
- Anywhere with horizontal space at least 120px wide

---

## 3. The Monogram

**Mark name:** Mono-S Coil
**File:** `sds-logo-monogram.svg`
**Concept origin:** Concept 04 from the v1 gallery, refined.

### What it is
The letter S, drawn as a single thick green stroke (13px weight) with rounded ends, styled as a coiled worm. Six thin dark segment rings cut perpendicularly across the three horizontal bars of the S, giving it the segment-like structure of a caterpillar or earthworm while keeping the letterform readable.

### What it reads as
- **The letter S** (for Synapse, for SDS) — immediately legible.
- **A coiled worm** — because of the thick rounded stroke and the segment rings.
- **A monogram** — functioning as both icon and initial.

### Usage rules
- **Color:** `#22C55E` stroke on transparent background. Segment rings are `#0A0F0C` (bg-primary) when on dark backgrounds, `#F5F7F6` (bg-light) when on light backgrounds.
- **Minimum size:** 16×16 px (favicon). Works all the way down.
- **Aspect ratio:** 1:1 (square). Safe to use inside circles.
- **Clear space:** at minimum, 8px on all sides at base size, scales proportionally.
- **Never:** pair it with the primary mark in the same lockup, stretch it, or rotate it.

### Where it goes
- Favicon (16, 32, 48, 180, 192, 512 px sizes)
- App icon (iOS, Android, PWA)
- Browser tab
- Instagram / Twitter / LinkedIn / Gmail sender avatar
- Loading spinner center
- Any square or circular placement
- Sticker / merch (later)

---

## 4. Wordmark & Typography

### Primary wordmark (v2.1 — integrated wormS)
**"Synapse Dynamics"** set in **Inter**, weight **700 (Bold)**, letter-spacing **-0.02em**, color `#F0FDF4` on dark, `#0A0F0C` on light — **with the leading "S" replaced by the worm-S letterform** (`sds-logo-wordmark-s.svg`).

The worm-S is rendered in `--accent-primary` (`#22C55E`) — so when a user reads the wordmark, their eye locks onto the green S first. The rest of the word ("ynapse Dynamics") is in the text color. This is the defining visual move of the SDS brand: **the S IS the mark**, and because it's embedded in the wordmark, you don't need a separate logo to its left in most contexts.

### Wordmark-S letterform (new in v2.1)
**File:** `sds-logo-wordmark-s.svg`
**Concept origin:** Simplified variant of the Mono-S Coil monogram — stripped of segment rings for inline typographic use. Uses a clean three-curve cubic Bezier path instead of the three-bar coil structure, so it reads as a proper "S" at body-text scale while preserving the thick-stroke / rounded-cap / worm-body language.

**Why a separate file from the monogram:** At wordmark scale (16-72px text), the segment rings on the Mono-S Coil become visual noise and make the S look like a typo. The wordmark-S is a typographic glyph first, logo second. The Mono-S Coil is a logo first, glyph second. Both are correct for their respective contexts.

**Usage rules:**
- **Inline only.** Always embedded inside "Synapse" text, never standalone.
- **Color:** `#22C55E` on both dark and light backgrounds (the green holds against both).
- **Sizing:** `height: 0.78em` relative to the parent font-size, with `transform: translateY(0.05em)` for baseline alignment. Never hard-coded pixel sizes — scales with the text.
- **Kerning:** `margin-right: 0.02em` nudge after the S so "ynapse" doesn't crowd it.
- **Never:** used as the "S" in "SEGMENTED" (that's JetBrains Mono uppercase, all caps are solid white/green — no integrated glyph there), used as a general lowercase "s", or inserted into any word that isn't the brand name.

**Why this works:** The integrated worm-S is the Stripe move (the uppercase S in the Stripe wordmark is a custom letterform), the Shopify move (the custom "S" bag), the Dropbox move (the box is the O). Every time someone reads "Synapse Dynamics," the green worm-S is the first thing they see. It's unforgettable the second time, and it makes the wordmark self-sufficient — **no separate mark required in most contexts**.

### When to use the Nodal Worm primary mark vs. wordmark-only
- **Wordmark-only (S is the mark):** default for most contexts. Nav bars, footers, business cards, email signatures, social profiles, stationery, invoice headers, blog post headers, body-copy mentions.
- **Nodal Worm + wordmark together:** hero sections where you want visual weight, pitch deck title slides, large-format print (posters, stickers, merch), any moment you want two "beats" of brand instead of one.
- **Nodal Worm alone (no wordmark):** only for huge contexts where the wordmark would be redundant — a 2-meter trade-show backdrop, a loading splash screen, a decorative background element.

### Legacy wordmark (v2, without integrated S)
Kept as an approved fallback for contexts where custom SVG rendering isn't possible (plain-text emails, printed contracts, terminal ASCII signatures). In those contexts, use the plain text "Synapse Dynamics" in whatever font is available.

### Secondary tag
**"SEGMENTED"** set in **JetBrains Mono**, weight **500**, size **11px**, letter-spacing **0.15em**, uppercase, color `#22C55E` or `#94A3A0` depending on context.

The tag sits either directly below "Synapse Dynamics" (centered or left-aligned) or to its right (separated by a thin vertical `#242E2A` rule).

### When to use the full "Synapse Dynamics Segmented"
Only in legal/formal contexts: LLC contract signatures, footer copyright line, Terms of Service, Privacy Policy, PayPal/Stripe business name, tax filings. Never in marketing copy or hero lockups — it's too long and muddies the cadence.

### Font system
| Role | Font | Usage |
|---|---|---|
| Wordmark, display, headings | **Inter** (700/800) | "Synapse Dynamics", page H1/H2, hero copy |
| Body, UI, subheadings | **Inter** (400/500/600) | All paragraph text, buttons, nav |
| Code, labels, metadata, numbers, tags | **JetBrains Mono** (400/500/700) | `SEGMENTED` tag, version numbers, code blocks, small caps labels, navigation section numbers |

This is the Linear / Vercel pattern. Inter signals clean modern credibility to non-technical buyers. JetBrains Mono signals engineering depth to technical buyers. Using both means SDS can pitch to a restaurant owner and a CTO on the same day without rewriting its visual system.

**Skip:** IBM Plex Serif (tension with tech mark is too high), Helvetica (dated), Space Grotesk (overused in AI agencies), Pretendard (too niche for English-primary use).

---

## 5. Color System

All colors locked. These are the tokens the website repo will define as CSS variables.

| Token | Hex | Usage |
|---|---|---|
| `--bg-primary` | `#0A0F0C` | Page background — near-black with faint green undertone |
| `--bg-surface` | `#111817` | Elevated surfaces, cards, navigation bars |
| `--bg-elevated` | `#1C2422` | Hover states, modal backgrounds, secondary cards |
| `--bg-light` | `#F5F7F6` | Light-mode background (used sparingly — for printed materials, light-mode docs) |
| `--accent-primary` | `#22C55E` | THE brand color. Logo, primary CTAs, links, highlights. |
| `--accent-bright` | `#34D880` | Hover states on primary CTAs, focus rings |
| `--accent-deep` | `#15803D` | Pressed/active states, darker green variations |
| `--text-primary` | `#F0FDF4` | Primary text on dark backgrounds — warm near-white |
| `--text-muted` | `#94A3A0` | Secondary text, captions, metadata labels |
| `--text-dim` | `#5F6B66` | Tertiary text, placeholders, disabled states |
| `--border-subtle` | `#242E2A` | Card borders, divider rules, table lines |
| `--border-accent` | `#2D8F50` | Active borders, focused inputs, selected states |

**Note on `--accent-primary` (corrected 2026-04-10):** Locked at `#22C55E` emerald. Previous v2 drafts assumed this would be verified against the Scrlpets brand color for family alignment. That assumption was checked at Code tab dispatch and turned out to be wrong: Scrlpets' brand primary is coral (`hsl(8 85% 62%)` ≈ `#EE5A42`), not green. **Decision:** SDS and Scrlpets are visually independent sibling brands under the Black Sheep 247 LLC umbrella (the Alphabet model — separate sub-brands, shared holding company). No color family alignment. The green wormS is the SDS brand move and is not shared with Scrlpets.

---

## 6. The Creature Constellation (Background Aesthetic)

Five creatures. They appear in the website background at very low opacity (8–15%), as thin-stroke line art, in `#22C55E` or `#94A3A0`. One per section maximum. Never the primary focus. The goal is that 80% of visitors never consciously notice them, and 20% notice one and feel rewarded for looking.

| Creature | Latin name | Reads as | Where it appears |
|---|---|---|---|
| **Earthworm** | *Lumbricus terrestris* | Already IN the logo as the primary mark. The whole brand. | N/A — it's the mark |
| **Axolotl** | *Ambystoma mexicanum* | Water, regeneration, limb regrowth, unkillable | Services section background, top-right corner |
| **Centipede** | *Chilopoda* | Segmentation, speed, industriousness, many-legged execution | How It Works section background, following the scroll |
| **Gecko with dropped tail** | *Squamata* (caudal autotomy) | Sacrifice for survival, strategic amputation, optimization | Pricing/Strategist section — the tail literally drops off, visible mid-shed |
| **Planaria** | *Platyhelminthes* | THE regeneration icon — cut it in half, both halves become whole | About/Philosophy section, mid-page |

### Background usage rules (strict)
- **Opacity:** 8–15% maximum. Never above 20%.
- **Stroke:** 1–2px thin line. Fill-only creatures are forbidden. No gradients.
- **Color:** `#22C55E` or `#94A3A0`. No other colors.
- **Size:** Maximum 20% of viewport width at any breakpoint.
- **Position:** Absolute, behind content. Never overlapping readable text at >0.5 contrast against the background.
- **Animation:** Static on load. Allowed: very slow parallax on scroll (0.3x speed max), occasional 0.5s fade-in when entering viewport. Forbidden: wiggling, crawling, walking, morphing.
- **Frequency:** One creature per section, max. Never two creatures visible in the same viewport at once.
- **Never:** cartoonish, anthropomorphized, cute, colored, animated aggressively, in the foreground, used as a button, placed in navigation.

### Scientific illustration reference
Ernst Haeckel's *Kunstformen der Natur* (1904). Victorian field-guide plates. National Geographic infographics. Think technical drawing, not children's book.

### Not on the list (cut from v1)
- Tardigrade — too niche, not segmented enough.
- Starfish/sea star — considered but cut. Adds shape variety but breaks the "segmented body" visual coherence.
- Worm variants (nematode, polychaete) — cut for redundancy with the primary earthworm mark.

---

## 7. Voice & Copy Guardrails

Unchanged from v1:
- **Direct.** No marketing jargon. Concrete numbers over adjectives.
- **No-BS.** Never says "we believe", "we're passionate", "cutting-edge", "synergy", "leverage", "transform your business".
- **Dry humor allowed.** Never cute. Never corporate.
- **Plain language.** A restaurant owner can read every page and understand what SDS does.
- **Never:** use em-dashes as decorative separators in body copy (they're fine in headlines), open with "In today's fast-paced world…", use the phrase "AI-powered", or call anything "revolutionary".

---

## 8. What Changed

### From v1 → v2
- **Concept locked:** Primary = Nodal Worm (Concept 01). Monogram = Mono-S Coil (Concept 04). Everything else cut.
- **Typography locked:** Inter + JetBrains Mono. IBM Plex Serif dropped.
- **Creature list locked:** Worm, Axolotl, Centipede, Gecko, Planaria. Tardigrade dropped.
- **Wordmark strategy locked:** "Synapse Dynamics" + "SEGMENTED" tag. Full three-word phrase only for legal contexts.
- **Color tokens locked:** All 12 CSS variables defined. `--accent-primary` is `#22C55E` emerald — locked independent of Scrlpets. Scrlpets runs coral (`#EE5A42`); the two brands are visually independent siblings under Black Sheep 247 LLC. See Section 5 note for details.

### From v2 → v2.1
- **Integrated wordmark-S added:** The "S" in "Synapse" is now a custom worm-letterform (`sds-logo-wordmark-s.svg`) rendered in `--accent-primary` green. Inline-SVG embedded in the wordmark at 0.78em height.
- **Clean Bezier variant created:** The wordmark-S uses a three-curve cubic Bezier, not the three-bar coil of the Mono-S Coil monogram. Segment rings dropped at wordmark scale.
- **Wordmark is now self-sufficient:** In most contexts (nav, footer, business card, email sig, social profiles), the wordmark alone is the complete logo. The Nodal Worm becomes optional — reserved for hero moments, pitch deck title slides, and large-format print.
- **Nodal Worm downgraded from "required in every lockup" to "optional visual-weight add-on."** Still a locked asset, still used, just not mandatory everywhere.

---

## 9. Deliverables Checklist (for Code tab dispatch)

- [x] `sds-brand-identity-v2-LOCKED.md` — this document (v2.1)
- [x] `sds-logo-primary-mark.svg` — Nodal Worm primary mark
- [x] `sds-logo-monogram.svg` — Mono-S Coil monogram (with segment rings)
- [x] `sds-logo-wordmark-s.svg` — Wordmark-S inline letterform (no rings) **[new in v2.1]**
- [x] `sds-brand-preview-v2.html` — visual preview showing all variants rendered (v2.1)
- [ ] `sds-favicon-16.png` — generated from monogram SVG (Code tab job)
- [ ] `sds-favicon-32.png` — generated from monogram SVG (Code tab job)
- [ ] `sds-favicon-48.png` — generated from monogram SVG (Code tab job)
- [ ] `sds-favicon-180.png` — Apple touch icon, generated from monogram (Code tab job)
- [ ] `sds-favicon-192.png` — Android/PWA icon (Code tab job)
- [ ] `sds-favicon-512.png` — Android/PWA icon large (Code tab job)
- [ ] `sds-og-image.png` — 1200×630 social preview with primary mark + wordmark on dark (Code tab job)
- [ ] `sds-logo-bw.svg` — black-and-white fallback for print and single-color contexts (Code tab job)

The Cowork side delivers the SVG sources and the spec. The Code tab generates the rasterized sizes, the OG image, and the B&W fallback during website setup because those need `npm` and imagemagick/sharp.

---

## 10. Success Criteria (test the brand)

Show the website to three people and ask "what does this company do?" without telling them:

1. A **skeptical founder** (technical) — should say "AI agency" or "dev shop" or "they build AI tools." Should NOT say "pharmaceutical company" or "biology lab."
2. A **small business owner** (non-technical, like the childcare pitch audience) — should say "they build software" or "they help businesses use AI." Should NOT be confused.
3. A **designer** — should say "this is on-brand, the worm thing makes sense once you see the whole system." Should NOT say "cute" or "kids' book."

If all three pass, the identity works.

---

**End of document.** Next action: dispatch website build to Code tab with this doc attached.
