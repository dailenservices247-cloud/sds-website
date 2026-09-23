# AGENTS.md — Implementation rules

Companion to `DESIGN.md` (visual rules). Per the awesome-design-md workflow:
- **`DESIGN.md`** = how things LOOK and FEEL
- **`AGENTS.md`** = how the project is BUILT

Read this BEFORE writing any UI in this repo.

---

## What MUST NOT change

These are LOCKED per the redesign PRD acceptance criteria:

- `/services` and `/services/{architect,automator,strategist}` — visually frozen until a future migration session
- The 9 SDS service tier prices (Architect $4.5K/$9.5K/$20K · Automator $2.5K/$5.5K/$1.5K-mo · Strategist $1.5K/$4.5K/$3.5K-mo)
- All 12 currently-shipped routes continue to work without regression
- `lib/content/services.ts` (existing data)
- Brand v2 dark theme stays applied to all existing routes via root `app/layout.tsx`

If a redesign change would touch these, STOP and surface to the user.

---

## What we ARE building (this redesign scope)

**v3 routes** (NEW; live inside `app/(v3)/` route group):
- `app/(v3)/preview/` — tonight's high-fidelity homepage hero reference
- `app/(v3)/portfolio/` — index of all 12 portfolio products
- `app/(v3)/portfolio/[slug]/` — per-product pages (12 slugs)
- `app/(v3)/foundation/` — Foundation Subscription page (Q3 lock decisions baked in)
- `app/(v3)/matchmaker/` — AI Business Matchmaker landing (interactive build deferred)
- `app/(v3)/lab/` — index of live products + experiments

**Route group layout** (`app/(v3)/layout.tsx`) sets `data-theme="v3"` on a wrapping div. The CSS variable scope in `globals.css` activates the white-canvas synthesis ONLY inside this group. Existing routes are untouched.

---

## Tech stack invariants

- Next.js 14 App Router + TypeScript strict (locked — no v15)
- Tailwind v3 (locked — no v4)
- Self-hosted fonts via `next/font/google` (no external CDN)
- Framer Motion 12 (already installed — animation library of record)
- Vercel Analytics (already installed)

**Animation library: Framer Motion ONLY.** No GSAP, no Lottie unless explicitly approved.

**3D / depth / scroll effects** (per video 2 reference at youtu.be/TcFeSjwTo7g):
- HTML5 `<video>` for hero looping background — NOT Three.js or WebGL
- Scroll-bound video scrubbing via `useScroll` + `useTransform` mapped to `currentTime`
- Sequential card reveals via `whileInView` with staggered children
- Parallax via `useScroll` `useTransform` on `y` translate
- All motion checks `prefers-reduced-motion` (WCAG SC 2.3.3)

---

## Performance budget (acceptance criteria)

Per route Lighthouse targets:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO ≥ 90

**Hard rules:**
- Total font payload ≤ 220KB (Bricolage Grotesque variable + Geist Mono variable + Inter variable [already loaded] subset to Latin)
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

## Build sequence (this session)

1. Install Bricolage Grotesque + Geist Mono via `next/font/google`. Keep Inter (already loaded). DROP JetBrains Mono once Geist Mono lands (or keep both during transition — TBD).
2. Update `tailwind.config.ts` — add `fontFamily.display` (Bricolage), update `fontFamily.mono` (Geist Mono), add new color tokens scoped to `[data-theme="v3"]`.
3. Update `globals.css` — add `[data-theme="v3"]` block with white canvas + synthesis palette. Add hero gradient utility class. Add LIVE-pulse keyframes. Add dotted-underline link style.
4. Create `app/(v3)/layout.tsx` setting `data-theme="v3"`.
5. Build `app/(v3)/preview/page.tsx` — tonight's high-fidelity homepage hero with: Hero Blaze gradient, Bricolage 80px headline, scroll-bound parallax, dotted-underline link, sequential reveal cards below.
6. Add nav link to `/preview` so the user can reach it from the existing dark-emerald nav.
7. Show user; iterate.

---

## When in doubt

1. Read `DESIGN.md` (sibling file) — visual ground truth
2. Read this file — implementation rules
3. Check the redesign PRD: `~/TAOO-Vault/AI Hub/PRDs/sds-website-redesign-2026-08-20.md` — current; supersedes `sds-website-redesign-prd.md` (2026-04-28). (vault re-homed 2026-06-16; was `~/Desktop/Data/TAOO-Vault/`)
4. ASK the user — never guess on visual direction or brand identity
