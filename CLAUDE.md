# SDS Website — Project Instructions

## Before starting any work
1. Read `_handoff.md` in this folder — it's a mirror of `~/.claude/handoffs/synapse.md`
2. If `~/.claude/` is mounted in this Cowork project, prefer reading `~/.claude/handoffs/synapse.md` directly (authoritative source)

## Canonical paths
- Repo root: `~/Desktop/sds-website`
- GitHub: github.com/dailenservices247-cloud/sds-website
- Vercel project: `dailenhuntley-8809s-projects/sds-website` (ID: `prj_kfRBaDj25uJtXAIP9Egg3lAdUCWH`)
- Live production: https://synapsedynamics.vercel.app

## Redeploy procedure (LOCKED — never shortcut)
```
cd ~/Desktop/sds-website
git add -A && git commit -m "..." && git push
npx vercel@latest --prod --yes
npx vercel@latest alias set <new-deploy-url> synapsedynamics.vercel.app
```

The alias step is REQUIRED — `--prod --yes` only sets the swart alias, not the custom domain.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript strict
- Tailwind v3
- Inter + JetBrains Mono
- lucide-react icons
- Inline SVG brand components (Wordmark, Monogram, NodalWorm)
- Resend for contact form (activates on `RESEND_API_KEY` + `CONTACT_TO_EMAIL` env vars)
- @vercel/analytics wired into root layout

## Brand — LOCKED (do not drift)
- **Brand color:** SDS emerald `#22C55E` (distinct from Scrlpets coral)
- **Identity source:** `BRAND.md` (repo root)
- **Asset license:** `BRAND-ASSETS-LICENSE.md` — logos/SVGs proprietary to BS247
- **Brand v2 locked 2026-04-10** — do not regenerate logos, wordmark, monogram, or NodalWorm without explicit Dailen approval

## Locked service tier pricing (live on /services/*)
| Series | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Architect | Lean Build $4,500 (~2wk) | Standard Platform $9,500 (~4–6wk) | Custom Ecosystem $20,000 (~8–12wk) |
| Automator | Workflow Spark $2,500 | Operations Suite $5,500 | Embedded Automator $1,500/mo |
| Strategist | Discovery Sprint $1,500 flat | Quarterly Plan $4,500 flat | Embedded Strategist $3,500/mo |

Edit `lib/content/services.ts` if prices change — do not swap tier names.

## Mandatory workflow (safety-net)
Before building ANY new feature / page:
1. Run gap analysis against the dimensions in `~/.claude/CLAUDE.md` (if mounted) — else see `_handoff.md`
2. Present options (full / simpler / skip)
3. Get Dailen's explicit confirmation before writing any code

## After significant work
1. Update `_handoff.md` in this folder
2. If `~/.claude/` is mounted: append entry to `~/.claude/relay.md` (format in `~/.claude/rules/session-relay.md`)

## DO NOT
- Rebuild Wave 1 or Wave 2 Batch 1–4 routes (all live)
- Regenerate brand assets (v2 locked)
- Shortcut the redeploy procedure (skipping `alias set` means synapsedynamics.vercel.app stays stale)
- Commit real API keys or env values — use `.env.example` for shape
- Swap tier names without Dailen approval

## Dailen-side pending (Cowork cannot do these)
1. Buy `synapsedynamics.com` domain (~$12/yr) — BLOCKS Resend activation
2. Resend setup (after domain): verify domain → add 4 DNS records → create API key → set 3 env vars in Vercel across all 3 environments → redeploy

## Self-verify before reporting done

After any UI-touching change in this repo, before reporting the task complete:

1. Use Chrome DevTools MCP (`chrome-devtools-mcp`) to navigate to the affected route
2. Click through the user happy path
3. Read the browser console and network logs
4. If any error, warning, or unexpected state appears, fix it and re-verify
5. Only after a clean verification, mark the task complete and update the relay log

This rule banked 2026-05-13 from the Puru "one line in claude.md = 30% fewer bugs" pattern.
See full skill spec at github.com/dailenservices247-cloud/sds-skill-pack/blob/main/plugins/sds-skill-pack/skills/self-verify/SKILL.md.
