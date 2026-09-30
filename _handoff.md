# Synapse Dynamics (SDS) — Local Handoff (mirror of ~/.claude/handoffs/synapse.md)

**Last synced:** 2026-09-29

**If `~/.claude/` is mounted**, read `~/.claude/handoffs/synapse.md` — it is authoritative, and it
carries the client/business lane this file deliberately does not duplicate. This file is the **repo**
mirror: what is true of this codebase and its deployment. It went five months (2026-04-19 → 2026-09-29)
describing a site that no longer existed, so prefer synapse.md wherever the two disagree.

## Current state

**Website: LIVE at https://synapsedynamics.io** (also answers on synapsedynamics.vercel.app).
**Production branch:** `main` @ `69c1b62`. **Stack:** Next.js 14 App Router · TypeScript strict · Tailwind v3.
**Repo:** `~/black-sheep-247/ventures/sds-website` (re-homed 2026-06-28; was `~/Desktop/sds-website`).

**The brand-v3 redesign shipped 2026-08-21** (`707b34b`, 14 commits). Every route now lives under
`app/(brand-v3)/`; the `(marketing)` route group was dissolved. **26 routes** per the production build.

Added by the redesign: `/channels`, `/ask` (zero-LLM concierge half), `/llms.txt`, a persistent cosmos
canvas mounted in the layout, and the Helix mascot as locked artwork (not a rigged mesh).
Retired, all 308-redirected: `/how-it-works`, `/work`, `/lab`, `/lab/scrlpets`, `/matchmaker`.

## Live service pricing — `lib/content/services.ts`

**Retracted to three services in the redesign.** The old Architect / Automator / Strategist series is gone.

| Service (slug) | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Vertical Pipeline (`pipeline`) | Pipeline Blueprint $1,500 | Pipeline Build $7,500 | Managed Pipeline $750/mo |
| AI Security (`security`) | Security Audit $2,500 | Remediation — from $7,500, **scoped from audit** | Monitoring $750/mo |
| Build (`build`) | Lean Build from $4,500 | Standard Platform from $9,500 | Custom Ecosystem from $20,000 |

Remediation is deliberately not fixed-price: it cannot be scoped before the audit.

## Deploying

**RESOLVED 2026-09-30: push is the deploy.** The two procedures on record are settled by
observation, not inference. Two pushes to `main` that day each produced their own `target:
production` deployment that reached `READY` with **no promote and no alias step run**
(`dpl_9M5je6hz…` for `c732956`, `dpl_ARrYCVFZ…` for `6877e05`), and synapsedynamics.io served the
new build immediately afterwards — verified by measuring the live page, not by curl alone.

```
cd ~/black-sheep-247/ventures/sds-website
npm run build          # ALWAYS first. Never while `next dev` is running — it clobbers .next/
git add <paths> && git commit && git push origin main
# That is the deploy. Confirm state: target=production, then READY.
```

The 2026-04 `npx vercel --prod --yes` + `alias set` steps are **superseded**. They predate the
GitHub integration; running them now creates a second, redundant deployment of the same commit.

**`main` is production.** Confirm what you are pushing with `git ls-remote origin`, **not**
`git rev-parse @{u}` — upstream tracking is local branch config and says nothing about what reached
the remote. On 2026-09-23 that confusion nearly produced a force-push that would have wiped the
deployed redesign.

## Do NOT rebuild

- **The brand-v3 redesign.** 14 commits, live since 2026-08-21, build green at every one.
- **Brand identity v3** — matte shell `#3a3b3d`, spine `#2a6055` as the ACTION accent, wine `#7e303a`
  as IDENTITY, gold `#c8a23e` as art-only reserve. **`DESIGN.md` is the authority.**

> **Corrected 2026-09-29 (twice).** This line originally read *"Brand identity v2 (LOCKED 2026-04-10)
> — emerald `#22C55E`"*. That emerald is banned by name in `DESIGN.md` (`:157` Forbidden, `:357`
> "petrol-green `#2a6055` is the v3 primary accent") and was purged in `c62cc6c`. A "do NOT rebuild"
> entry naming a colour the design system forbids reads as protection while pointing at the thing
> that was deliberately removed. Dailen fixed this in `a0aa73f`; I then overwrote the fix and
> reinstated the v2 claim, citing `--accent-primary` in `globals.css` — a **legacy token that nothing
> under `(brand-v3)` reads**. The live theme uses the `--bv3-*` namespace. Grep the namespace the
> code actually consumes, not the one that merely still exists.
- **Live pricing** — edit `lib/content/services.ts` if prices change; do not rename tiers or services.
- **Phase 4 (fold the nine Stripe routes into the portfolio) — NOT DONE and recommended against.**
  They are purchasable packs and subscriptions, not portfolio products; folding them in dilutes both
  and risks live payment paths. Revisit only if Dailen wants the packs surfaced.

## Known open (repo-side; see synapse.md for the client lane)

- Rigged Helix GLB — blocked on Higgsfield credits. The shipped page uses locked artwork instead.
- Concierge LLM half of `/ask` — banked until the first paid close. The zero-LLM half is live.
- `DESIGN.md` hero drift flagged 2026-08-18 (sentence-case vs the spec's uppercase, tracking and
  font-size off spec) — unverified since the redesign; re-check before calling it open or closed.

## Key refs
- Brand: `BRAND.md` · assets license: `BRAND-ASSETS-LICENSE.md` (logos/SVGs proprietary to BS247)
- Specs: `AI Hub/PRDs/sds-website-redesign-2026-08-20.md` (current) · `helix-mascot-spec-2026-08-20.md` ·
  `helix-concierge-spec-2026-08-20.md`. The 2026-04-28 `sds-website-redesign-prd.md` is superseded.
- Drift audits in-repo: `SPEC-DRIFT-2026-08-18.md`, `SPEC-DRIFT-FULL-SURFACE-2026-08-19.md`
- Vercel project: `prj_kfRBaDj25uJtXAIP9Egg3lAdUCWH` (team `team_rtgZXw2xotQ3s25fNimaFyO3`)
- Supabase automation infra (shared with BS247 n8n): `shphmoyfipuhnjhsbzef`
