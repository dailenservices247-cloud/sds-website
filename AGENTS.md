# AGENTS.md — Implementation rules

Companion to `DESIGN.md` (visual rules). Per the awesome-design-md workflow:
- **`DESIGN.md`** = how things LOOK and FEEL
- **`AGENTS.md`** = how the project is BUILT

Read this BEFORE writing any UI in this repo.

> **Reconciled against the live code 2026-09-29.** This file had drifted to the point of being
> actively misleading: it described a route group that no longer exists, a font that `DESIGN.md`
> bans, and froze three routes that had already been renamed. Everything below the line was
> written for a plan the repo has since outgrown. `DESIGN.md` stayed current; this did not.
>
> **If you change how the project is built, change this file in the same pass.** A stale spec is
> worse than no spec, because it is trusted — the same rule `DESIGN.md` carries.

---

## What MUST NOT change

These are LOCKED per the redesign PRD acceptance criteria:

- The 9 SDS service tier prices (Architect $4.5K/$9.5K/$20K · Automator $2.5K/$5.5K/$1.5K-mo · Strategist $1.5K/$4.5K/$3.5K-mo)
- All currently-shipped routes continue to work without regression
- `lib/content/services.ts` (existing data)

If a redesign change would touch these, STOP and surface to the user.

**Superseded 2026-09-29, recorded so it is not reintroduced:**

- *"`/services` and `/services/{architect,automator,strategist}` — visually frozen."* Those routes
  no longer exist. `907d46d` retracted the surface to three services and `ec8afe5` brought it onto
  the design system; the live routes are `/services/{build,pipeline,security}`. The freeze was
  lifted by that work, not by this edit.
- *"Brand v2 dark theme stays applied to all existing routes."* Brand v3 is the shipped theme —
  `app/layout.tsx` sets `data-theme="brand-v3"`. The v2 emerald `#22C55E` this implied is banned by
  name in `DESIGN.md` and was purged in `c62cc6c`.
- *"All 12 currently-shipped routes."* The build emits 46 static pages. The count was frozen in
  time; the no-regression rule is what actually matters and is kept above.

---

## Where the site lives now

**One route group: `app/(brand-v3)/`.** `1b125cd` dissolved the `(marketing)` group into it, and
`048a88b` removed the dead `[data-theme="v3"]` CSS block, migrating 53 orphaned class references.
The layout sets `data-theme="brand-v3"`; there is no second theme scope and no white-canvas
synthesis.

The homepage is `app/(brand-v3)/page.tsx`. `/foundation`, `/services`, `/portfolio`, `/channels`,
`/ask` and the rest are routes inside the same group — not sections of the homepage.

**Superseded 2026-09-29:** the `app/(v3)/` route group described here never survived; `/preview`
was a one-night hero reference, `/matchmaker` was folded into `/ask` by `272d99e`, and `/lab` was
merged into `/portfolio` by `c62cc6c`.

---

## Tech stack invariants

- Next.js 14 App Router + TypeScript strict (locked — no v15)
- Tailwind v3 (locked — no v4)
- Self-hosted fonts via `next/font/google` (no external CDN)
- Framer Motion 12 (already installed — animation library of record)
- Vercel Analytics (already installed)

**Animation library: Framer Motion ONLY.** No GSAP, no Lottie unless explicitly approved.

**3D / depth / scroll effects:**
- **React Three Fiber is the 3D layer.** `three ^0.161`, `@react-three/fiber ^8.18`, `@react-three/drei ^9.122` are dependencies, and the persistent cosmos canvas is mounted in the layout (`e69e9a3`) with the Helix carrying brand colour as live shader uniforms (`ce24f25`).
- Sequential card reveals via `whileInView` with staggered children
- Parallax via `useScroll` `useTransform` on `y` translate
- All motion checks `prefers-reduced-motion` (WCAG SC 2.3.3)

**Superseded 2026-09-29:** this section said *"HTML5 `<video>` for hero looping background — NOT
Three.js or WebGL"* with scroll-bound `currentTime` scrubbing. Both halves are now false. `e69e9a3`
retired the video hero for the cosmos canvas, and the repo contains **zero `<video>` elements**.
Left as written, this rule would have told the next session to rip out the cosmos.

---

## Performance budget (acceptance criteria)

Per route Lighthouse targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO ≥ 90

**Hard rules:**
- Total font payload ≤ 220KB, subset to Latin. Four families load in `app/layout.tsx`: Bricolage Grotesque (display), Geist Sans (body), JetBrains Mono (mono), and **Inter**.

  > **Inter is a live trap, flagged 2026-09-29.** `DESIGN.md` bans Inter by name as a generic
  > default, and the rendered site obeys: `[data-theme="brand-v3"]` sets `--font-geist-sans`
  > (`app/globals.css:264`) and every surface is inside that group. But Inter is still the base
  > `body` font (`:70`) **and the Tailwind `sans` token** (`tailwind.config.ts:43`) — so any
  > `font-sans` utility renders the banned face, silently, and it ships in the payload either way.
  > Fixing it is a code change (repoint the token to Geist, drop the load), so it is recorded here
  > rather than done in a docs pass.
- Hero video ≤ 6 MB compressed (1080p H.264 + WebM AV1 fallback)
- LCP ≤ 2.5s on 3G throttle
- CLS ≤ 0.1
- No font-loading FOUT (use `next/font` with `display: "swap"` consistently)
- All images via `next/image` with explicit `width`/`height`

If a change risks any of these, STOP and surface a tradeoff option.

---

## Iteration discipline (per video 1 host's separation-of-concerns advice)

After EACH visible component change, give the user a working URL on `localhost:3000` and ask for feedback. **Do NOT batch 5 changes and then ask.** Show ONE high-fidelity component, get feedback, then scale.

This is also our locked global preference: "Default to the minimum viable" — build the smallest thing that delivers the named outcome.

---

## Build sequence — HISTORICAL (2026-05, completed and superseded)

The seven steps that were here described one night's work: install Bricolage, add a
`[data-theme="v3"]` block with a white canvas, create `app/(v3)/layout.tsx`, build a `/preview`
hero, and link it from "the existing dark-emerald nav."

All of it either shipped or was reversed. The `(v3)` group was dissolved into `(brand-v3)`, the
`[data-theme="v3"]` block was deleted as dead (`048a88b`), the dark-emerald nav is gone with the
banned emerald (`c62cc6c`), and the white-canvas synthesis lost to the matte monolith that
`DESIGN.md` now locks.

Kept only as a record of where the current structure came from. **Do not execute these steps.**

---

## When in doubt

1. Read `DESIGN.md` (sibling file) — visual ground truth
2. Read this file — implementation rules
3. Check the redesign PRD: `~/TAOO-Vault/AI Hub/PRDs/sds-website-redesign-2026-08-20.md` — current; supersedes `sds-website-redesign-prd.md` (2026-04-28). (vault re-homed 2026-06-16; was `~/Desktop/Data/TAOO-Vault/`)
4. ASK the user — never guess on visual direction or brand identity
