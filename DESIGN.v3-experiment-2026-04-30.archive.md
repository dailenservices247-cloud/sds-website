# Design System — SDS v3 (Synthesis: Replicate × Ollama)

**Status:** v3 evolution of brand v2. Locked 2026-04-30.
**Scope:** Applies to NEW routes only (`/portfolio`, `/portfolio/[slug]`, `/foundation`, `/matchmaker`, `/lab`, redesigned `/`, redesigned `/about`). Existing 12 brand v2 routes (`/services/*`, `/contact`, `/legal/*`, etc.) remain UNTOUCHED until a future migration session.

This is a **synthesis** of two source DESIGN.md files — Replicate and Ollama — chosen by Dailen Huntley. References preserved at `/tmp/design-refs/picked/`.

The synthesis pattern: **Quiet shell, loud moments.** Ollama-restraint sets the base canvas so Replicate-explosion can LAND at the conversion moments. If everything is loud, nothing is.

---

## 1. Visual Theme & Atmosphere

A pure-white canvas where most of the page is restrained, monochrome, and editorial — and specific conversion moments **explode** with vibrant gradient, massive display type, and pill geometry that signals participation rather than performance.

The page reads in TWO REGISTERS:

- **Quiet register** (most of the page): pure white background, near-black text, generous whitespace, weight 400–500 type, zero shadows, border-only depth, system-ui rounded display. Inspired by Ollama. Communicates: *honest, restrained, the founder is doing the work, not the marketing.*
- **Loud register** (specific moments only — hero of conversion routes, Foundation Subscription CTA, Matchmaker entry, Apotheosis early-access): vivid orange→red→magenta gradient backgrounds, 72–128px Bricolage Grotesque headlines at weight 700, pill-shaped everything, dotted-underline links. Inspired by Replicate. Communicates: *come build with us.*

The transition between registers is the design's voice. **Quiet sections set up loud sections.** Loud sections never run more than ~70vh; the quiet always returns.

**Key Characteristics:**
- Pure white canvas (`#ffffff`) with near-black text (`#171717`) — Ollama base
- Selective gradient hero moments (orange → red → magenta) — Replicate energy at conversion points only
- Bricolage Grotesque variable display font (free; replaces rb-freigeist-neue conceptually) at 48–128px, weight 700
- Inter for body (already loaded in the project)
- Geist Mono for code, status pills, technical labels (replaces JetBrains Mono — slightly tighter, more current)
- **Binary radius system: 12px containers / 9999px interactive elements** — agreed across both source designs
- Zero shadows on any element — depth comes from borders + background blocks (agreed across both)
- Brand v2 emerald `#22C55E` PRESERVED as the LIVE-status accent (Replicate's spec uses near-identical green `#2b9a66` for status badges; the migration carries v2's brand through)
- Dotted-underline links (`text-decoration: underline dotted #bbbbbb`) for inline narrative links
- Pill-shaped (9999px) status badges, CTAs, image containers, tags

---

## 2. Color Palette & Roles

### Primary
- **Ink** (`#171717`): Primary text, primary headings, dark surface backgrounds. Slightly warm near-black (matches Vercel-of-Geist sensibility) — softer than pure black.
- **Pure White** (`#ffffff`): Page background, card surfaces, button text on dark.
- **Pure Black** (`#000000`): Used sparingly — manifesto-tier moments only, occasional 1px borders.

### Loud Register — Hero Gradient
- **Hero Blaze**: Orange → Red → Magenta multi-stop gradient. Tokens:
  - `#ea2804` (Replicate Red) — orange-red anchor
  - `#dc2050` — magenta midpoint (added; bridges orange and pink)
  - `#de1d8d` (Vercel Preview Pink) — magenta-pink terminus
- Used: hero of `/`, `/foundation`, `/matchmaker`, `/portfolio/apotheosis`. Never on body sections.
- Always full-bleed, ~50–70vh max height. Quiet always returns below.

### Brand Continuity — emerald survives as semantic green
- **LIVE Emerald** (`#22C55E`): Brand v2's primary accent, demoted to a semantic role: **operational status only**. Used on portfolio LIVE badges, success states, "shipping today" indicators. Pulses (animated) per WCAG SC 1.4.1 non-color affordance.
- **LIVE Emerald Bright** (`#34d880`): Hover state.

### Neutral Scale
- **Gray 900** (`#171717`): Primary text — same as Ink.
- **Gray 600** (`#4d4d4d`): Secondary text, body copy emphasis.
- **Gray 500** (`#666666`): Tertiary text, muted descriptions.
- **Gray 400** (`#808080`): Placeholder, disabled.
- **Gray 300** (`#bbbbbb`): Dotted-underline link decoration, muted metadata. Replicate's signature.
- **Gray 200** (`#e5e5e5`): Borders, button backgrounds (Ollama gray pill), card outlines.
- **Gray 100** (`#ebebeb`): Subtle dividers.
- **Gray 50** (`#fafafa`): Subtle surface tint, section background variation.

### Surface
- **Page** (`#ffffff`): default body background.
- **Subtle Surface** (`#fafafa`): elevated card backgrounds, "ritual" cards.
- **Dark Surface** (`#171717`): Inverted sections — manifesto blocks, footer, code-window cards. White text on this.

### Focus / Accessibility
- **Focus Ring** (`hsla(212, 100%, 48%, 1)`): 2px outline, 2px offset on all interactive elements. Borrowed from Vercel's Geist focus token (still neutral / non-brand).

### Gradient System
- **Hero Blaze** (full-bleed, hero only)
- **No subtle gradients** elsewhere — flat color blocks for everything else.

---

## 3. Typography Rules

### Font Family
- **Display** (loud register): `Bricolage Grotesque` (variable; weight axis 200–800, width axis 75–100, optical-size axis 12–96), with fallbacks: `system-ui, -apple-system, "Segoe UI", sans-serif`. Used for 48–128px headlines.
- **Display Rounded** (quiet register): `system-ui, -apple-system` — relies on SF Pro Rounded on Apple, falls back to platform sans elsewhere. No extra font load. Used for 24–48px section headings in restrained moments.
- **Body / UI**: `Inter` (already loaded; variable), with fallbacks: `system-ui, sans-serif`. Used for ALL body copy, navigation, captions.
- **Mono**: `Geist Mono` (variable; replaces JetBrains Mono), with fallbacks: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`. OpenType `"liga"` enabled. Used for code, status pills, technical labels, metadata.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| **Manifesto** | Bricolage Grotesque | 96–128px | 700 | 1.00 | -2.4px to -3.0px | "Imagine what you can build."-tier moments. One per page max. |
| **Hero Display** | Bricolage Grotesque | 64–80px (clamp) | 700 | 1.02 | -2.0px | Hero headlines on loud routes. |
| **Section Heading Loud** | Bricolage Grotesque | 48px | 700 | 1.05 | -1.4px | Loud-register section titles. |
| **Section Heading Quiet** | system-ui rounded | 36px | 500 | 1.11 | -0.5px | Quiet-register section titles. |
| **Sub-heading** | Inter | 24–28px | 600 | 1.25 | -0.4px | Card headings, feature names. |
| **Body Large** | Inter | 20px | 400 | 1.50 | normal | Hero descriptions, intros. |
| **Body** | Inter | 16–18px | 400–500 | 1.55 | normal | Standard reading text. |
| **Caption** | Inter | 14px | 400–500 | 1.43 | normal | Metadata, labels. |
| **Mono Caption** | Geist Mono | 12–13px | 500 | 1.40 | 0.05em (slight track) | Status pills, technical labels, layer indicators. UPPERCASE. |
| **Mono Code** | Geist Mono | 14–16px | 400 | 1.50 | normal | Code blocks. |

### Principles

- **Bricolage Grotesque is the brand voice at scale.** Use only for display moments (48px+). The variable axes let us tune compression: `font-variation-settings: 'wdth' 92, 'opsz' 96` on the manifesto type; `'wdth' 100, 'opsz' 48` on section headings.
- **Three weights, strict roles.** 400 (body / reading), 500 (UI / interactive / emphasized body), 600 (sub-headings). Display headlines exclusively use 700 in Bricolage. No other weights.
- **Mono is for ≤6 word labels.** Status pills, layer numbers, version pins, technical metadata. NEVER paragraph body. Always UPPERCASE for caption-tier mono.
- **Dotted-underline for inline links** in narrative body — `text-decoration: underline dotted; text-decoration-color: #bbbbbb; text-underline-offset: 4px`. Never solid in body. Solid IS used on CTA buttons.

---

## 4. Component Stylings

### Buttons

**Primary CTA** (loud register, used at conversion moments):
- Background: Pure Black `#000000`
- Text: Pure White
- Padding: 14px 28px
- Border-radius: pill (9999px)
- Font: Inter 16px weight 500
- Hover: Background → Ink `#171717` (subtle warmth shift)
- Border: none

**Secondary CTA** (quiet register):
- Background: Pure White
- Text: Ink `#171717`
- Padding: 14px 28px
- Border-radius: pill (9999px)
- Border: 1px solid `#e5e5e5`
- Hover: border darkens to `#bbbbbb`

**Gradient CTA** (rare — only on the matchmaker hero, foundation hero):
- Background: Hero Blaze gradient
- Text: Pure White
- Padding: 16px 32px
- Border-radius: pill (9999px)
- Font: Inter 16px weight 600
- Used max ONCE per route

### Cards & Containers
- Background: Pure White or Subtle Surface `#fafafa`
- Border: `1px solid #e5e5e5` (Gray 200)
- Border-radius: **12px** (containers always 12px; only interactive elements use pill)
- Shadow: **none** — depth purely from border + background contrast
- Hover (when clickable): border → `#bbbbbb`; subtle background → `#fafafa`

### Status Badges (THE bridge to brand v2)
- Pill (9999px), font-mono, uppercase, 12px Geist Mono weight 500
- Padding: 4px 10px
- Status colors:
  - **LIVE**: bg `rgba(34, 197, 94, 0.12)`, text `#15803d`, dot `#22C55E` (pulse)
  - **PRE-LAUNCH**: bg `#fef3c7`, text `#854d0e`
  - **CONCEPT**: bg `#dbeafe`, text `#1e40af`
  - **PARKED**: bg `#f5f5f5`, text `#525252`
  - **INTERNAL**: bg `#ffedd5`, text `#9a3412`
- LIVE pulse honors `prefers-reduced-motion`

### Inputs
- Background: Pure White
- Border: 1px solid `#e5e5e5`
- Border-radius: **pill (9999px)** for search/email; 12px for textareas
- Padding: 12px 20px
- Focus: 2px focus ring `hsla(212, 100%, 48%, 1)`
- Placeholder: Gray 400 `#808080`

### Navigation
- Background: transparent on white page
- Border: 1px solid `#e5e5e5` at bottom (subtle separator), only visible on scroll
- Logo: NodalWorm in Ink (`#171717`) — needs cream/white-canvas variant verification
- Links: Inter 16px weight 500, Ink color, hover → underline dotted `#bbbbbb`
- Right-aligned: Black pill CTA + Connect dropdown
- Sticky on scroll with subtle backdrop blur

### Image Treatment
- Pill-shaped containers (9999px) for hero illustrations, model gallery thumbnails
- 12px containers for screenshots, code-window mockups
- No drop shadows. Border-only.

### Distinctive Components

**Manifesto Section**
- Dark surface (`#171717`), white text
- Bricolage 96–128px weight 700
- One per page max — closes a high-energy route
- Inspired by Replicate's "Imagine what you can build."

**Code Window Card**
- Dark surface (`#171717` or `#0d1117` for terminal-feel)
- Geist Mono 14–16px, white text
- 12px border-radius, no shadow
- Optional: 1px accent border (`#22C55E` for active example)

**Portfolio Card** (used on /portfolio index)
- White, 12px radius, 1px border
- Pill status badge + mono layer label at top
- Bricolage 28–32px name + Inter 16px tagline
- Hover: border → `#bbbbbb`, slight `transform: translateY(-2px)`, transition 200ms ease-out

**Dotted-Underline Inline Link**
- `text-decoration: underline dotted; text-decoration-color: #bbbbbb; text-underline-offset: 4px`
- On hover: color → Ink `#000`, decoration-color → Ink

---

## 5. Layout Principles

### Spacing System
- Base: 8px
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192px
- Section vertical: 96–128px on mobile, 128–192px on desktop
- Container padding: 24px mobile, 32–48px desktop

### Container
- Max width: `max-w-container` = 72rem (already defined in current Tailwind config — keep)
- Centered, fluid

### Whitespace Philosophy
- **Whitespace is the brand.** Quiet sections breathe big. Loud sections fill the screen briefly, then dissolve back to white.
- Content density is intentionally LOW — never fight visitors with cluttered surfaces.

### Border Radius (Binary)
- **Container: 12px** — cards, panels, dialogs, code blocks, image containers (non-pill)
- **Interactive: 9999px** — buttons, status badges, search inputs, tabs, tags, image avatars
- **No values between 12 and 9999.** No 4px, no 6px, no 8px, no 24px. Binary system per Ollama discipline.

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 — Flat | No border, no shadow | Page background, body content |
| 1 — Bordered | 1px solid `#e5e5e5` | Cards, code blocks, buttons |
| 2 — Subtle Surface | `#fafafa` background + bordered | Elevated cards, hover state |
| 3 — Inverted | Dark `#171717` + white text | Manifesto blocks, code windows, footer |
| 4 — Hero Blaze | Full-bleed gradient | Hero of conversion routes ONLY |

**Shadow philosophy: zero.** Every visible depth cue comes from background-color shifts and 1px borders. Per BOTH source designs.

---

## 7. Animation (added per Dailen's request — not in source DESIGN.mds)

The design.md format is static; animation is layered on top via Framer Motion 12 (already installed).

### Allowed motion
- **Hero scroll-bound video** — looping `<video>` with `useScroll` + `useTransform` mapping scroll position to current frame. Per video 2 reference.
- **Sequential card reveals** — `whileInView` with staggered children. 60ms stagger. fade + 8px translate-y.
- **Hover states on cards** — 200ms ease-out, transform translateY(-2px) + border-color change.
- **Manifesto type entrance** — Bricolage scales from 0.95 to 1.0 + fades in over 600ms when entering viewport.
- **Gradient hero parallax** — gradient background shifts position 5–10% on scroll for depth.
- **LIVE status pulse** — emerald dot pulses at 2s ease-in-out infinite. Behind `prefers-reduced-motion` media query.

### Forbidden motion
- Bouncing, springy overshoots — too playful for the voice.
- Auto-playing carousels — accessibility nightmare.
- Scroll-jacking (snap-scroll between sections) — fights the user.
- Page-transition curtains — slows the site.

### Reduced motion
- ALL animations check `prefers-reduced-motion: reduce` and degrade gracefully (instant transitions, no parallax, no pulse).

---

## 8. Do's and Don'ts

### Do
- Use the binary radius system (12px or 9999px) — no other values
- Use Bricolage Grotesque only at 48px+ display sizes
- Use Inter for ALL body copy — never substitute
- Reserve the Hero Blaze gradient for ONE moment per route, max 70vh
- Apply the dotted-underline link style to inline body links
- Pulse the LIVE status badge — non-color affordance per WCAG
- Keep emerald `#22C55E` strictly semantic (LIVE / operational status) — never decorative
- Honor `prefers-reduced-motion` on every animation

### Don't
- Don't use shadows anywhere
- Don't use cream / off-white — pure white only
- Don't use any gradient other than Hero Blaze
- Don't apply Bricolage below 48px or above weight 700
- Don't use Geist Mono for body text — labels only
- Don't use solid underlines on inline body links — dotted is the signature
- Don't migrate /services/* to white canvas yet — that's a separate session, brand v2 lock holds
- Don't lazy-clone Replicate's red brand color — `#ea2804` lives ONLY in the gradient, never as a surface

---

## 9. Multi-route application matrix

| Route | Register | Hero Blaze | Manifesto |
|---|---|---|---|
| `/` (redesigned home) | Mixed — quiet sections, ONE loud hero | Yes (top hero) | Optional close |
| `/about` | Quiet throughout | No | No (founder voice is restrained) |
| `/portfolio` (index) | Quiet | No | No |
| `/portfolio/[slug]` | Quiet base; loud strip on `apotheosis` slug only | No (or top strip on apotheosis) | No |
| `/foundation` | Loud hero, quiet body, loud CTA section | Yes (hero + closing CTA) | Yes (closing) |
| `/matchmaker` | Loud throughout — this is the funnel front door | Yes (top hero) | Yes (closing) |
| `/lab` | Quiet | No | No |
| `/services/*` | NOT IN SCOPE — brand v2 dark-emerald, untouched | — | — |
| `/contact`, `/legal/*` | NOT IN SCOPE — brand v2, untouched | — | — |

---

## 10. Sources

- `/tmp/design-refs/picked/DESIGN-replicate.md` — Replicate full spec (loud register source)
- `/tmp/design-refs/picked/DESIGN-ollama.md` — Ollama full spec (quiet register source)
- Council deliberation 2026-04-30 (synthesis logic, accessibility fixes)
- Video 1 inspiration: youtu.be/cSF-bxotrz4 (awesome-design-md workflow)
- Video 2 inspiration: youtu.be/TcFeSjwTo7g (scroll-bound video, sequential card reveals)
- Brand v2 acceptance criteria: AI Hub/PRDs/sds-website-redesign-prd.md (existing 12 routes must not regress)
