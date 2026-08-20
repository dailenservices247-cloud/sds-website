# Full-surface spec-vs-live diff — 2026-08-19

Audit only, no source files changed. Produced for the **2026-08-20 brand-register re-evaluation**
(`AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md`).

Supersedes the "Not yet checked" section of `SPEC-DRIFT-2026-08-18.md`, which covered the hero H1
only. This pass covers all 31 route files across both route groups, measured by grep plus computed
styles in a live browser against `next dev`.

```
IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=pass shape=not_required image_gate=skipped:measurement-pass mutation=closed
```

---

## Read this before anything else: the spec moved after it was audited

`SPEC-DRIFT-2026-08-18.md` was written at **18:09**. `DESIGN.md` was rewritten at **18:27** — eighteen
minutes later, in the same session.

That rewrite did two different things, and they have to be judged separately.

**Legitimate.** It absorbed the 2026-07-08 colour-role lock (ACTION=spine, IDENTITY=wine,
GOLD=art-only reserve) and documented six AA-safe text tokens that existed only in code. The audit
had correctly found the spec stale on colour. Correcting it was right.

**Not legitimate.** It also closed the hero-typography question — the one the audit had explicitly
flagged as *"UNRESOLVED. Needs Dailen, not inference."* `DESIGN.md` now asserts:

> *"Text-transform on display: sentence case. Corrected 2026-08-18 against the live site... The
> earlier 'uppercase by default' instruction described a treatment that has never been live on the
> v3 site."*

**That assertion is false, and it was never approved.** Measured below: uppercase display is live on
8 routes. The hero is the exception, not the rule. The spec was rewritten to match one element and
now contradicts the other eight.

**Consequence for tomorrow:** `current-focus.md` still carries the *original, twice-superseded*
framing ("the v3 register was never fully implemented"). `DESIGN.md` carries an unapproved
correction pointing the other way. Neither is a safe basis for the 08-20 decision.

---

## Headline finding: half the site is missing its mono tier

**`.mono-label` is defined only under `[data-theme="v3"]` — a selector nothing on the site sets.**
The only two `data-theme` setters (`app/layout.tsx:155`, `app/(brand-v3)/layout.tsx:22`) both set
`brand-v3`. There is no `(v3)` route group; it was removed. The class matches nothing.

**75 elements across 6 live routes carry that dead class.** They render as unstyled Geist body text.

Verified in-browser on `/lab`, computed style of a `.mono-label` element:

| Property | Spec (`DESIGN.md` mono caption) | Computed live |
|---|---|---|
| `font-family` | JetBrains Mono | `__GeistSans` |
| `font-size` | `0.75rem` (12px) | `16px` |
| `text-transform` | uppercase | `none` |
| `letter-spacing` | `0.08em` | `normal` |
| `font-weight` | 500 | `400` |

The correct class is `.bv3-mono`. The split is clean, with zero overlap:

| Route | Dead `.mono-label` | Correct `.bv3-mono` |
|---|---|---|
| `/portfolio` | **39** | 0 |
| `/lab` | 10 | 0 |
| `/foundation` | 8 | 0 |
| `/apotheosis-pro` | 7 | 0 |
| `/matchmaker` | 6 | 0 |
| `/about` | 5 | 0 |
| `/stack` | 0 | 53 |
| `/work` | 0 | 45 |
| `/anti-slop` | 0 | 31 |
| `/diagnostic` | 0 | 33 |
| **Total** | **75** | **162** |

Also affected (grep, not browser-verified): `/foundation/cancel`, `/foundation/success`,
`/portfolio/[slug]`, `/voice-network/success`.

This is not a taste disagreement. It is a broken class reference, and it is why `/portfolio` and
`/work` do not look like the same website. On `/portfolio` the editorial chapter mark "The Portfolio"
renders identically to the paragraph beneath it. On `/work` the same tier renders as
`CONSULTING / WORK WITH SDS` in uppercase mono, exactly as specified.

---

## The uppercase question, settled by measurement

`DESIGN.md` (as of 18:27 yesterday) says display is sentence case and always has been.

`app/globals.css:404-419` says otherwise. Both `.bv3-display` and `.bv3-display-section` carry
`text-transform: uppercase`, `letter-spacing: -0.005em`, and the `opsz` axis — the original spec,
implemented in CSS, live today on **8 routes**.

The hero at `app/(brand-v3)/page.tsx:286-301` **does not use those classes.** It is inline-styled:

```tsx
fontSize: "clamp(2.5rem, 6vw, 4.5rem)",   // spec class: clamp(3rem, 7.2vw, 6rem)
lineHeight: 1.0,                           // spec class: 0.95
letterSpacing: "-0.035em",                 // spec class: -0.005em
// no text-transform                       // spec class: uppercase
// no font-variation-settings              // spec class: 'wdth' 100, 'opsz' 96
```

So the earlier audit's line "`font-variation-settings`: absent" was right about the hero and wrong
about the site — the axis is implemented, the hero just bypasses the class that carries it.

**One element diverges from eight. The correct reading is that the hero drifted, not that the site
did.** Yesterday's `DESIGN.md` edit inverted that. Dailen still owns the call on which he wants, but
he should make it knowing the ratio is 1:8, not the 1:1 the spec now implies.

---

## `DESIGN.md` contradicts itself in three places

Independent of the live code, the spec no longer agrees with itself. Any fix that reads it will pick
up whichever half it happens to land on.

| # | Location A | Location B | Live code |
|---|---|---|---|
| 1 | Colors: *"ACTION = spine — **all buttons**, pills, live dots"* | Components + frontmatter: `button-primary.backgroundColor: {colors.gold}` | `var(--bv3-spine)` — matches A |
| 2 | Typography table: *"Sentence case. Single-word emphasis in `wine-text`... the older multi-colour stack is superseded"* | Do's: *"**Use multi-color word emphasis on hero H1.** BUILD THE / THINKING (gold) / INTO THE / THING. (petrol) — the multi-color stack is signature"* | single wine accent — matches A |
| 3 | Frontmatter: `display.fontSize: clamp(3rem, 7.2vw, 6rem)`, `letterSpacing: -0.005em` | Prose table: hero = `clamp(2.5rem, 6vw, 4.5rem)`, `-0.035em` | `.bv3-display` matches frontmatter; hero matches prose |

The 18:27 pass updated the prose sections and left the frontmatter, the Components section, and the
Do's list untouched.

---

## Measured violations of the spec's own bans

| Ban (`DESIGN.md`) | Spec allows | Found | Locations |
|---|---|---|---|
| **Inter** — *"Don't use Inter... Geist is the locked body family"* | 0 | **site-wide default** | `tailwind.config.ts:43` sets `font-sans: var(--font-inter)`; `globals.css:92`. `brand-v3-tokens.ts:35` even comments that Geist replaces Inter — the Tailwind default was never switched. |
| **Zero box-shadow** — *"Zero box-shadow anywhere"* | 0 | **3** | `app/not-found.tsx:49`, `(marketing)/lab/scrlpets/page.tsx:321`, `components/sections/CTA.tsx:43` — same 4px CTA ring |
| **No side-stripe borders** | 0 | **6** | `border-l-2 border-accent pl-6` in `matchmaker:88`, `foundation:202`, `about:190`, `apotheosis-pro:157`, `portfolio/[slug]:162,175` |
| **No decorative backdrop-blur** | 1 (6px Nox crossfade) | **4** | `globals.css:514-515` (10px), `(brand-v3)/page.tsx:206`, `components/layout/Nav.tsx:24` |
| **No emerald `#22c55e`** (brand v2) | 0 | **8** | `globals.css:13,56,63,68` (it is `--accent-primary` at `:root`), `manifest.ts:12`, `portfolio/page.tsx:95`, `portfolio/[slug]:78`, `contact/actions.ts:118` |
| **No pure `#000`/`#fff`** | 0 (`ink-on-shell-strong` excepted) | **5** | `globals.css:97,119,120` are raw uses; `:73` and `:313` are the token |
| **No em dashes in copy** | 0 | **236** | Across `(brand-v3)`, `(marketing)`, `components` |
| **Binary radius: 12px or pill** | 2 values (+4px sm) | **6 values** | No `borderRadius` override in `tailwind.config.ts`, so `rounded-md` = Tailwind's **6px**, not the spec's 12px. 71 × `rounded-md` (6px), 33 × `rounded-full`, 23 × `rounded-2xl` (16px), 18 × `rounded-xl` (12px — the only compliant one), 11 × `rounded-lg` (8px), 2 × `rounded-3xl` (24px), 1 × `14px` |
| **`section-y` spacing token** | used by brand-v3 | **inverted** | All 14 uses are in `(marketing)`. `(brand-v3)` uses ad-hoc `py-16/20/24/28/40` (73 instances) |

Clean, no violations found: gradient text (`background-clip: text`) — 0. Cream-as-ground — 0.
Bounce/elastic easing — 0. Those three bans are genuinely holding.

---

## The `(marketing)` route group was never in the register

Ten routes — `/services` (+3 children), `/contact`, `/how-it-works`, `/legal/privacy`,
`/legal/terms`, `/lab/scrlpets` — contain **zero** `--bv3-*` references. `(brand-v3)` has 444;
`components/` has 96.

They inherit `data-theme="brand-v3"` from the root layout, so they pick up the CSS variables, but
they consume the legacy `--accent-*` / `--bg-*` bridge instead. At `:root`, `--accent-primary` is
`#22c55e`, the banned brand-v2 emerald.

`DESIGN.md` does not mention this group at all. It is not drift from the spec so much as territory
the spec never claimed — and `/services` and `/contact` are conversion surfaces.

---

## Dead CSS

`[data-theme="v3"]` scopes **12 rule blocks** in `globals.css` for a route group that no longer
exists. That is where `.mono-label` lives, which is what makes the headline bug possible. It also
holds `.gradient-blaze`, a full-bleed gradient hero utility from the register the current brand
explicitly rejects.

---

## Audit health score

Scored only on the dimensions this pass actually measured. Accessibility, performance, and
responsive behaviour were **not** measured — this was a spec-conformance pass, not a technical audit.
Scoring them would be invention.

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | — | not measured this pass |
| 2 | Performance | — | not measured this pass |
| 3 | Responsive | — | not measured this pass |
| 4 | Theming | **1/4** | Banned emerald is the `:root` accent; Inter is the site-wide default font; radius system has 6 values where the spec allows 2; one route group ignores the token set entirely |
| 5 | Anti-patterns | **2/4** | 3 shadows, 6 side-stripes, 4 decorative blurs against explicit bans — but no gradient text, no cream-ground, no bounce easing, and the matte monolith holds |

**Not an AI-slop failure.** The register is distinctive and intentional where it runs. `/work`,
`/stack`, `/anti-slop`, and `/diagnostic` are on-brand and good. The problem is that the other half
of the site is not running the register at all.

---

## Findings by severity

**[P0] Dead `.mono-label` class strips the mono tier from 6 routes**
Location: `app/globals.css:148` (selector), 75 call sites across 10 files
Category: Theming
Impact: The editorial chapter-mark tier — which `DESIGN.md` names as signature — is invisible on
`/portfolio`, `/lab`, `/foundation`, `/apotheosis-pro`, `/matchmaker`, `/about`. Those routes read as
a generic template. `/portfolio` is the worst affected with 39.
Fix: rename the 75 call sites to `.bv3-mono`, or add `.mono-label` to the `[data-theme="brand-v3"]`
block. The rename is preferable — one class per tier.

**[P0] `DESIGN.md` asserts an unapproved typography decision as settled fact**
Location: `DESIGN.md` Typography section, added 2026-08-18 18:27
Category: Process
Impact: The 08-20 decision would be made against a spec that answered its own open question by
inference. The claim "never been live" is contradicted by 8 routes.
Fix: revert that paragraph to an open question, or have Dailen confirm it. Do not build on it.

**[P1] Inter is the site-wide default body font**
Location: `tailwind.config.ts:43`, `app/globals.css:92`
Category: Theming
Impact: Every `font-sans` consumer renders Inter, which `DESIGN.md` bans by name twice. Geist ships
in the bundle and is used by the bv3 classes, so the site pays for both.

**[P1] Banned emerald `#22c55e` is the `:root` accent**
Location: `app/globals.css:13,63,68`
Category: Theming
Impact: Every legacy-token consumer — the whole `(marketing)` group — draws its accent from the
brand-v2 colour the spec forbids.

**[P1] `DESIGN.md` self-contradicts on buttons, hero emphasis, and display scale**
Location: three pairs, tabled above
Impact: Any future fix implements whichever half it reads first.

**[P2] Radius system has 6 values where the spec allows 2**
Location: no `borderRadius` block in `tailwind.config.ts`
Impact: `rounded-md`, used 71 times as the house container radius, is 6px — half the specified 12px.

**[P2] 236 em dashes against an explicit copy ban**
**[P2] 6 side-stripe borders, 4 decorative backdrop-blurs, 3 box-shadows**
**[P3] 12 dead `[data-theme="v3"]` rule blocks**
**[P3] `_handoff.md` last updated 2026-04-20**, though this project's `CLAUDE.md` names it step 1

---

## Systemic pattern

Every finding here is one of two shapes:

1. **Two parallel implementations of the same tier, and half the site is on the wrong one.**
   `.mono-label` vs `.bv3-mono`. Inline hero display vs `.bv3-display`. Legacy `--accent-*` vs
   `--bv3-*`. Tailwind default radius vs the spec's binary system. Nothing is missing — the right
   version exists in every case. It just is not wired up everywhere.

2. **The spec and the code correcting each other in alternating passes**, with no record of which
   direction was approved. Colour: code was right, spec updated. Typography: spec updated to match
   one element, against eight others.

The second shape is the one that matters tomorrow. `SPEC-DRIFT-2026-08-18.md` had to publish a
correction to its own headline within hours. `DESIGN.md` carries a warning at the top saying a stale
spec is worse than none *because it is trusted* — and then, further down the same file, resolves by
inference the exact question the audit escalated.

---

## What this means for the 2026-08-20 decision

**The register is not the problem, and abandoning it would not fix anything measured here.**

Where v3 runs — `/work`, `/stack`, `/anti-slop`, `/diagnostic` — it is distinctive, on-brand, and
does what `PRODUCT.md` asks. Where the site reads generic, it is because the register is *not
running*: a dead class reference, an unswitched Tailwind default, and a route group that was never
brought in.

So the honest framing is neither of yesterday's two paths:

- Not *"the register was never fully implemented"* (`current-focus.md`, superseded twice).
- Not *"the spec was stale and is now corrected"* (`DESIGN.md` 18:27, correct on colour, wrong on
  typography).

It is: **the register is implemented, and wired to roughly half the surface.**

A register change made tomorrow would be made on evidence from the unwired half. Recommend:

1. Fix the P0 class reference. Mechanical, 75 call sites, no design judgment needed.
2. Settle the hero casing question yourself — 1 element vs 8, and the spec currently misreports it.
3. Re-look at the site after both, then decide the register.

The 90-day commit lapses on its own tomorrow either way, so the decision can be *deferred* without
being *escalated* — nothing forces a call on an unwired surface.

---

## Not measured

Accessibility, performance, responsive behaviour, Nox pose thresholds against their scroll bands,
line-length compliance (65–75ch), and the `(marketing)` group's internal consistency with whatever
register it *is* following. Also: 4 of the 10 dead-`.mono-label` routes were confirmed by grep only,
not by computed style.
