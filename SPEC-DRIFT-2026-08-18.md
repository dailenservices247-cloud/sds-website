# Hero spec-vs-live drift — 2026-08-18

> ## ⚠️ CORRECTED LATER THE SAME DAY — READ THIS FIRST
>
> **The original version of this document had the direction of drift backwards.** It concluded the
> live site had drifted from `DESIGN.md`. The full-surface diff showed the opposite for colour:
>
> **`DESIGN.md` is dated 2026-05-14. `app/globals.css` is dated 2026-07-08.** The spec is eight weeks
> stale. The live code implements locked decisions the spec never absorbed:
>
> `AI Hub/Decisions/sds-website-brand.md`, 2026-07-08, shipped to prod as `de51cc2`:
> *"Locked: **ACTION=spine** (all buttons/pills/live dots), **IDENTITY=wine** (eyebrows/links/coil-S/
> selection, wine-text tier on dark), CONTENT=cream/ink, **GOLD=art-only reserve.** Brand House v1
> §2/§4 amended."*
>
> **So the hero's wine emphasis word is CORRECT** — wine is IDENTITY. `DESIGN.md` calling gold the
> primary emphasis colour is the stale half. The original doc flagged this as "off-role token use."
> That was wrong.
>
> **Acting on the original version would have reverted two months of deliberate brand work** and
> undone six AA-safe text tokens (`wine-text`, `spine-text`, `on-wine`, `on-spine`, `destructive`,
> `wine-bright`) that exist in code and are absent from the spec.
>
> **The real fix is therefore not a code change. It is that `DESIGN.md` must absorb the 2026-06-10
> and 2026-07-08 decisions.** Typography remains genuinely open — see below.


Audit only, no files changed. Produced for the **2026-08-20 brand-register re-evaluation**
(`AI Hub/Decisions/decision-2026-05-20-brand-v3-variant-v3-cursor-locked.md`).

`IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=n/a shape=not_required image_gate=skipped:audit-only mutation=closed`

## The headline finding

**The v3 register was never fully implemented.** The most identity-carrying element in the design system — the uppercase Bricolage display with the signature multi-color word stack — is absent from the live hero. What ships is a sentence-case headline at 75% of spec scale with a single accent word, which is structurally the generic-SaaS-hero shape `PRODUCT.md:41` bans by name.

**Consequence for the 2026-08-20 decision:** the register cannot be fairly evaluated, because it is not running. Judging v3-cursor on the current site judges a spec that was never shipped. Fix the drift first; the register question only becomes answerable afterward.

## Diff — hero H1 (`app/(brand-v3)/page.tsx:286-301`)

| Property | Spec (`DESIGN.md`) | Live | Severity |
|---|---|---|---|
| `font-size` | `clamp(3rem, 7.2vw, 6rem)` | `clamp(2.5rem, 6vw, 4.5rem)` | 25% under spec at max |
| `text-transform` | **uppercase** (`DESIGN.md:162`, `:174`) | none — sentence case | **identity-critical** |
| `letter-spacing` | `-0.005em` | `-0.035em` | 7x tighter than spec |
| `line-height` | `0.95` | `1.0` | minor |
| `font-variation-settings` | `'wdth' 100, 'opsz' 96` | absent | optical sizing unused |
| word emphasis | one cream + one gold + one petrol per phrase — **signature** | cream + wine, single accent | **identity-critical** |
| `wine` role | "used sparingly, reserved for 'before' labels or moments needing weight" | carrying hero emphasis | off-role token use |

Spec's own worked example of the signature stack:
`BUILD THE / THINKING (gold) / INTO THE / THING. (petrol)`

Live: `Think before you code.` with `code` in wine.

The letter-spacing value is not arbitrary in the spec — `-0.005em` exists specifically "to compensate for uppercase tracking." At `-0.035em` in sentence case, both halves of that pairing are wrong together.

## Not yet checked

This audit covered the hero H1 only. **A full-surface diff has not been run.** Sections not examined: spacing scale (`section-y: clamp(4rem, 10vh, 9rem)`), the petrol spine rules, mono section labels ("II. PORTFOLIO"), Nox pose thresholds, card elevation, button tokens, the shadow ban, and every interior route. Assume more drift until measured.

## Two paths, and why they are not symmetric

**Drift fix** — implement `DESIGN.md` as written on the hero. Needs no lock change; the spec IS the current lock. Low risk, and it is a prerequisite for evaluating the register honestly.

**Register change** — abandon v3-cursor. An escalation under the umbrella `CLAUDE.md`, and the 90-day commit lapses 2026-08-20 on its own. **Doing this without fixing drift first means rejecting a register on evidence that never tested it.**

## Related, found during this audit

- The decision file's step 6 still instructs updating `~/Desktop/sds-website/_handoff.md` — a path deleted in the 2026-06-28 restructure.
- That decision carries a second trigger: "At 2026-08-20 **(or 30 sales of Stack v1, whichever first)**." Confirm which fired.
- `_handoff.md` in this repo has not been updated since 2026-04-20 despite this project's `CLAUDE.md` naming it step 1 before any work.


---

## Post-correction status (2026-08-18, second pass)

### RESOLVED — colour roles. No code change needed.

| | |
|---|---|
| Live code | wine=IDENTITY, spine=ACTION, gold=art-only reserve |
| `DESIGN.md` | gold=primary CTA/emphasis, wine=sparse "before" labels |
| Authority | `AI Hub/Decisions/sds-website-brand.md` 2026-07-08, shipped `de51cc2` |
| Verdict | **Code correct. Spec stale. Update `DESIGN.md`.** |

Undocumented-but-live tokens to add to the spec: `--bv3-spine-text`, `--bv3-on-spine`,
`--bv3-wine-bright`, `--bv3-wine-text`, `--bv3-on-wine`, `--bv3-destructive`. These are AA-safe
text tiers — wine and spine are fill-only on dark, which the spec does not say.

### UNRESOLVED — hero typography. Needs Dailen, not inference.

| Property | `DESIGN.md` (2026-05-14) | Live hero (`page.tsx:286-301`) |
|---|---|---|
| `text-transform` | uppercase by default (`:162`, `:174`) | sentence case |
| `letter-spacing` | `-0.005em` ("to compensate for uppercase tracking") | `-0.035em` |
| `font-size` | `clamp(3rem, 7.2vw, 6rem)` | `clamp(2.5rem, 6vw, 4.5rem)` |
| `font-variation` | `'wdth' 100, 'opsz' 96` | absent |

**No typography decision exists after 2026-05-14.** The decisions log's type entries are from
2026-05-07/08 and still name "Akira Expanded + Inter", which `DESIGN.md` itself already superseded.
So the type spec is not obviously stale the way the colour spec was — but it is not obviously
authoritative either.

Complicating it: **35 uppercase display usages exist elsewhere in the live site** (opengraph images,
`BackstageLayer`, `Stage`). The uppercase convention is live; the hero is the exception.

**Two readings, and only Dailen can settle which:**
1. **Deliberate** — the hero was intentionally softened to sentence case during the v3-coherence
   work and the spec simply was not updated, same as the colours. → update `DESIGN.md`, no code change.
2. **Drift** — the hero was never brought to spec. → code change: uppercase, `-0.005em`, spec clamp,
   restore the `opsz` axis.

Note the letter-spacing and casing are a matched pair: `-0.005em` exists *because* uppercase needs
looser tracking. Sentence-case at `-0.005em` would look wrong. Change both or neither.

### Mutation gate

`IMPECCABLE_PREFLIGHT: context=pass product=pass command_reference=n/a shape=FAIL image_gate=n/a mutation=BLOCKED`

Blocked pending a user-confirmed shape brief. Per impeccable, a brief written by the agent does not count.
