# Synapse Dynamics — Website

Marketing site for **Synapse Dynamics Segmented**, an AI agency owned by Black Sheep 247 LLC. This is the credibility surface for pitches — the real URL on a real brand a skeptical founder can point at.

**Status:** Wave 1 complete. Live at the production domain once deployed on Vercel.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 with SDS brand tokens |
| Fonts | Inter + JetBrains Mono via `next/font/google` |
| Icons | lucide-react |
| Animation | Framer Motion (sparingly, CSS where possible) |
| Forms | Server actions + zod validation, honeypot for spam |
| Deployment | Vercel (free Hobby tier) |
| Analytics | Vercel Analytics (not yet enabled) |

---

## Run it locally

```bash
npm install
npm run favicons    # regenerate favicons from monogram SVG (also runs on prebuild)
npm run dev         # http://localhost:3000
```

### Build + production

```bash
npm run build       # includes favicon regen via prebuild
npm run start
```

---

## Project structure

```
app/
├── (marketing)/           # Public marketing pages
│   ├── page.tsx           # Home
│   ├── services/          # Services index + 3 detail pages
│   ├── how-it-works/      # Four-step process
│   └── contact/           # Form + server action
├── layout.tsx             # Root layout + fonts + metadata
├── globals.css            # Tailwind + brand CSS variables
├── sitemap.ts             # Next.js metadata routes
├── robots.ts
├── manifest.ts            # PWA manifest
└── opengraph-image.tsx    # Dynamic OG image

components/
├── brand/                 # Wordmark, Monogram, NodalWorm
├── layout/                # Nav, Footer, Container
└── sections/              # Reusable page sections (Hero, CTA, etc.)

lib/
├── utils.ts               # cn() helper
└── content/
    └── services.ts        # Three service series (single source of truth)

public/
├── brand/                 # Proprietary SVG logo files (see BRAND-ASSETS-LICENSE.md)
├── favicon.ico
├── icon-192.png
├── icon-512.png
└── apple-touch-icon.png

scripts/
└── generate-favicons.mjs  # Rasterizes favicons from monogram.svg via sharp

BRAND.md                   # Locked brand identity (v2.1) — visual source of truth
BRAND-ASSETS-LICENSE.md    # Brand assets are NOT MIT — proprietary to Black Sheep 247 LLC
LICENSE                    # Source code MIT license
```

---

## Brand assets

Brand assets live in `public/brand/` and are **not** covered by the MIT license. They are proprietary to Black Sheep 247 LLC. See `BRAND-ASSETS-LICENSE.md`.

The canonical brand identity document is `BRAND.md` (v2.1 locked). Don't modify visuals without updating that doc.

**The three SDS marks:**
- **Wordmark** (default everywhere) — "Synapse Dynamics" with the inline worm-S letterform in accent green. Implemented in `components/brand/Wordmark.tsx`.
- **Monogram** (favicons, avatars, square contexts) — Mono-S Coil with segment rings. `components/brand/Monogram.tsx`.
- **Nodal Worm** (hero sections, pitch decks, large format) — nine tapering nodes along a subtle S-curve spine. `components/brand/NodalWorm.tsx`.

The accent green is `#22C55E`. SDS is visually independent from Scrlpets (which uses coral `#EE5A42`) — both are siblings under the Black Sheep 247 LLC umbrella.

---

## Deploying to Vercel

1. Log into Vercel with the GitHub account that owns this repo.
2. Import the `sds-website` repo as a new project.
3. Framework preset auto-detects Next.js — accept defaults.
4. Deploy. First deploy lands on `sds-website-<hash>.vercel.app`.
5. In project settings, change the production domain to `synapsedynamics.vercel.app` if available (fall back to `sds-synapse` or `synapse-dynamics`).
6. When a custom domain is available, add it in Vercel project settings. SSL auto-issues.

---

## Wave 1 scope

Built:
- Home, Services index, 3 service detail pages, How It Works, Contact
- Nav, Footer, brand components, shared sections
- Metadata API, sitemap, robots, manifest, dynamic OG image
- Favicons generated from monogram via sharp
- Contact form with honeypot + zod validation (logs only in Wave 1)

**Not in Wave 1** (Wave 2+):
- About page, Digital Products page, Case study deep dives
- Email delivery on contact form (currently console logs)
- Privacy Policy / Terms of Service (stub links)
- Blog / MDX
- Client portal
- Analytics dashboard

---

## Contact form

The contact form is a server action (`app/(marketing)/contact/actions.ts`) with zod validation and a honeypot field (`website`). In Wave 1 it only logs submissions. Wave 2 will wire up email delivery via Resend, Postmark, or similar.

---

© 2026 Black Sheep 247 LLC · Synapse Dynamics Segmented
