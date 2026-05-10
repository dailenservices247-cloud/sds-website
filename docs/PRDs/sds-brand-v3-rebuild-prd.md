---
title: SDS Brand v3 rebuild — Phase B PRD (SDS-as-test of AWA v2 toolchain)
date: 2026-05-08
status: v0 — pre-build
parent_decisions:
  - AI Hub/Decisions/sds-website-brand.md (Brand v3 supersession 2026-05-08)
  - AI Hub/Brand/sds-brand-v3-mascot-brief.md (mascot artifact set v1 LOCKED 2026-05-08)
  - AI Hub/PRDs/awa-v2-reshape-notes.md (AWA v2 architecture notes)
  - ~/.claude/skills/designer/SKILL.md (Designer Bot variant pipeline)
informed_by:
  - AI Hub/Brand/dailen-taste-profile.md v1 (matte gray + petrol green + antique gold + Akira Expanded + Inter)
  - 7 locked mascot artifacts at AI Hub/Brand/sds-brand-v3-LOCKED/
---

# SDS Brand v3 rebuild — Phase B PRD

Two-purpose build:
1. **SDS production redesign** — replace existing `app/(v3)/` (brand v2 emerald) with brand v3 (matte gray + Nox mascot system)
2. **AWA v2 toolchain test** — exercise the Designer skill `craft` mode pipeline (3 variants → gate 2 pick → polish → deploy) using SDS as the prospect

## Goal

Three deployable site variants of brand v3, each on its own Vercel preview URL, differentiated meaningfully (not 3 colorways of one layout). Dailen picks one for production. Picked variant goes through `/impeccable polish` then promotes to `synapsedynamics.io` (via vercel alias swap).

## Three variant directions (locked)

| | Direction | Anchor reference | Differentiator |
|---|---|---|---|
| **V1** | Immersive Garden | immersive-garden.com case studies | Editorial 3D, full-bleed cinematic hero, Nox primary mascot dominates fold, scroll-spatial motion (parallax, scale tweens) |
| **V2** | Linear | linear.app | Typography-rigor minimal, Akira Expanded bold display, generous whitespace, Nox monogram only (no full mascot in hero), text-led |
| **V3** | Cursor | cursor.com | Developer-tool clean, asymmetric layout, code-snippet aesthetic, Nox alt-poses (Working) inline with copy, kinetic-playful motion |

Each variant uses the same content (IA + copy from existing v2-experiment + brand v2 production), brand v3 palette, brand v3 type, brand v3 mascot artifacts. Differences are LAYOUT, MOTION, MASCOT INTEGRATION DEPTH.

## Information architecture (inherited)

Six sections per existing v2-experiment IA (lock 2026-04-28):

1. **Hero** — wordmark stack + H1 + dual CTA
2. **Portfolio at-a-glance** — 3-column grid, layer-1 + layer-3 products
3. **Foundation Subscription** — invitation strip
4. **Services preview** — Architect / Automator / Strategist
5. **Now / Next / Later** — transparency strip
6. **Latest from the channels** — Allday 24seven + Day One AI cross-routing

IA is locked. Variants don't change IA — they change visual execution.

## Brand v3 system to apply (across all variants)

### Palette
- Body shell: matte gray `#3a3b3d` (Dodge Durango Destroyer Gray)
- Spine ridge / primary: petrol green `#2a6055`
- Accent: antique gold `#c8a23e`
- Ground default: matte gray `#3a3b3d`
- Cream ground (warm contexts): `#efede5`
- Optional emotion accent: wine `#7e303a`

### Type
- Display: Akira Expanded Super Bold (or closest available — fallback chain TBD on var build)
- Body: Inter
- Mono: JetBrains Mono

### Mascot artifacts (all in `AI Hub/Brand/sds-brand-v3-LOCKED/`)
- `nox-PRIMARY-LOCKED.png` — full mascot, glyph posture
- `nox-MONOGRAM-LOCKED.png` — favicon-scale crop
- `nox-pose-WORKING-LOCKED.png` — extended building register
- `nox-pose-LISTENING-LOCKED.png` — coiled attentive
- `nox-pose-PRESENTING-LOCKED.png` — audience-facing
- `nox-pose-RESTING-LOCKED.png` — overhead coil donut
- `nox-WORDMARK-LOCKUP-LOCKED.png` — horizontal lockup with stacked Akira

Copy these into `~/Desktop/sds-website/public/brand-v3/` for serving.

## Implementation

### Routes
- New route group: `app/(brand-v3)/` mirroring `(v3)` IA
- Per-variant routing approach: subdomain or path-based?
  - **Path-based** (recommended): `app/(brand-v3)/v1-garden/`, `app/(brand-v3)/v2-linear/`, `app/(brand-v3)/v3-cursor/`
  - Each path renders the SAME content with DIFFERENT components / styles
  - Easier to deploy + share previews via single URL with path
- Existing `(v3)` route preserved during dev — rename to `(v2-experiment)` after gate 2

### Design tokens
- New `lib/design/brand-v3-tokens.ts` — palette + type + spacing
- New `app/(brand-v3)/layout.tsx` — sets `data-theme="brand-v3"` on wrapping div
- Add CSS vars in `app/globals.css` under `[data-theme="brand-v3"]` selector

### Mascot component
- New `components/brand-v3/Nox.tsx` — props: pose ('primary' | 'working' | 'listening' | 'presenting' | 'resting' | 'monogram'), size, position
- Renders correct PNG from `/public/brand-v3/`
- Lazy-load with next/image

### Per-variant polish
- Variant 1 (Garden): R3F scene OR layered PNG with parallax tween (R3F if budget; PNG-parallax if not)
- Variant 2 (Linear): pure CSS + Inter / Akira; no images beyond mascot monogram
- Variant 3 (Cursor): asymmetric grid + code-snippet pseudo-blocks + Nox.Working inline

## Out of scope for tonight (banked)

- Variants 2 + 3 (Linear + Cursor)
- Polish pass on picked variant
- Vercel preview deploys (3 separate URLs)
- Final naming lock (Nox vs Lux)
- Vector / flat derivable mascot exports
- Production swap — replacing existing live site

Tonight scope: **PRD + scaffolding + Variant 1 (Immersive Garden) home page only.**

## Acceptance criteria — tonight scope

- [ ] PRD landed at `AI Hub/PRDs/sds-brand-v3-rebuild-prd.md` + repo `docs/PRDs/`
- [ ] `app/(brand-v3)/` route group exists with layout
- [ ] `lib/design/brand-v3-tokens.ts` exists with palette + type tokens
- [ ] `components/brand-v3/Nox.tsx` exists, renders correct asset by pose prop
- [ ] All 7 mascot PNGs copied to `public/brand-v3/`
- [ ] `app/(brand-v3)/v1-garden/page.tsx` renders 6-section IA with brand v3 system applied
- [ ] Local `npm run dev` starts clean, brand-v3 route renders without errors
- [ ] No regression to existing `(marketing)` or `(v3)` routes

## Acceptance criteria — full Phase B (banked)

- [ ] Variants 2 (Linear) + 3 (Cursor) home pages built
- [ ] All 3 variants pushed to Vercel preview URLs
- [ ] Gate 2 review with Dailen — pick one
- [ ] Picked variant goes through `/impeccable polish`
- [ ] Picked variant routes promoted from `(brand-v3)/vN-<dir>/` to root `(marketing)` (replacing or shadowing)
- [ ] Production alias swap — `synapsedynamics.io` points to picked variant
- [ ] Old `(v3)` route group archived to `(v2-experiment)/` or deleted
- [ ] Decision log entry recording the variant pick + rationale

## Risks / mitigations

- **Akira Expanded font availability** — if not freely licensed, fallback to closest open alternative (Bricolage Grotesque, Anton, Bebas Neue super-condensed) — decide during scaffolding
- **R3F bundle size on variant 1** — keep optional. PNG + Framer parallax acceptable substitute
- **Mascot PNG file sizes** — primary is 18MB; need WebP / AVIF compression for production (defer to polish pass)
- **Production swap timing** — must NOT break current live site during dev. New route group is parallel; swap is atomic when ready

## Eval dimensions (lightweight per variant)

- **Brand fidelity:** does it apply brand v3 system correctly?
- **Direction-anchor match:** does variant feel like its named anchor (Garden / Linear / Cursor)?
- **Differentiation:** is each variant meaningfully distinct from the others?
- **Conversion shape:** does the IA still flow → CTAs visible, services preview clear, foundation pitch lands?
- **Performance:** Lighthouse > 90 on mobile? (defer until polish)
