# Synapse Dynamics (SDS) — Local Handoff (mirror of ~/.claude/handoffs/synapse.md)

**Last synced:** 2026-04-19 23:30

**If ~/.claude/ is mounted in this Cowork project**, read `~/.claude/handoffs/synapse.md` for the authoritative state. This file is a mirror for sessions that can't reach it.

## Current state

**Website: LIVE.** Wave 2 Batch 4 shipped 2026-04-11. All 12 routes deployed, all locked tier pricing visible on /services/*. No placeholders left.
**Live URL:** https://synapsedynamics.vercel.app
**Repo:** ~/Desktop/sds-website (github.com/dailenservices247-cloud/sds-website)
**Stack:** Next.js 14 App Router + TypeScript strict + Tailwind v3

## Locked service pricing (shipped)

| Series | Tier 1 | Tier 2 | Tier 3 |
|---|---|---|---|
| Architect | Lean Build $4,500 (~2wk) | Standard Platform $9,500 (~4–6wk) | Custom Ecosystem $20,000 (~8–12wk) |
| Automator | Workflow Spark $2,500 | Operations Suite $5,500 | Embedded Automator $1,500/mo |
| Strategist | Discovery Sprint $1,500 flat | Quarterly Plan $4,500 flat | Embedded Strategist $3,500/mo |

## Next work (priority order)

1. **Close Taqueria Otates** — proposal ready at AI Hub/Clients/taqueria-otates-proposal.md. 5× 15s 9:16 walk-up pitch videos ready at `Synapse Dynamics/otates-videos/` in Obsidian vault. Target: $500/mo retainer (Tier 1 AI Kickstart).
2. **Buy synapsedynamics.com domain** (~$12/yr Namecheap or Cloudflare) — BLOCKS Resend activation for contact form.
3. **Resend setup** (after domain): verify domain → add 4 DNS records → create API key → set 3 env vars in Vercel (RESEND_API_KEY, CONTACT_TO_EMAIL=dailenhuntley@gmail.com, CONTACT_FROM_EMAIL=contact@synapsedynamics.com) across all 3 environments → redeploy.
4. **Build first n8n tool** — pick between Tool 3 (GBP Review Responder for Otates) OR Tool 7 (AI Readiness Assessment for SDS lead gen). Full tool brainstorm: `Synapse Dynamics/sds-n8n-tool-brainstorm-v1.md` in vault.
5. **Build first directory site** as proof of concept for the Directory Building Service.

## Standard redeploy procedure (LOCKED)

```
cd ~/Desktop/sds-website
git add -A && git commit -m "..." && git push
npx vercel@latest --prod --yes
# Grab new deployment URL, then:
npx vercel@latest alias set <new-deploy-url> synapsedynamics.vercel.app
```

The alias step is REQUIRED — `--prod --yes` only sets the swart alias, not the custom domain.

## Do NOT rebuild

- Wave 1 + Wave 2 Batch 1–4 routes — all live, do not regenerate
- Locked tier pricing — edit `lib/content/services.ts` if prices change, but do not swap tier names
- Brand identity v2 (LOCKED 2026-04-10) — emerald `#22C55E`, NodalWorm, Wordmark, Monogram all shipped inline SVG

## Key refs
- Brand: BRAND.md (repo root)
- Brand assets license: BRAND-ASSETS-LICENSE.md (logos/SVGs proprietary to BS247)
- Vercel project: prj_kfRBaDj25uJtXAIP9Egg3lAdUCWH (team_rtgZXw2xotQ3s25fNimaFyO3)
- Supabase automation infra (shared with BS247 n8n): shphmoyfipuhnjhsbzef
