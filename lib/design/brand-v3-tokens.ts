/**
 * Brand v3 design tokens.
 *
 * Source of truth: AI Hub/Brand/dailen-taste-profile.md v1
 *                  AI Hub/Brand/sds-brand-v3-mascot-brief.md v1 LOCKED 2026-05-08
 *                  AI Hub/Decisions/sds-website-brand.md (Brand v3 supersession 2026-05-08)
 *
 * Apply via [data-theme="brand-v3"] CSS scope; do NOT bleed into existing
 * (v3) or (marketing) route groups.
 */

export const brandV3Palette = {
  // Body shell — Dodge Durango Destroyer Gray, non-reflective
  shell: "#3a3b3d",
  // Spine ridge / primary accent — petrol green
  spine: "#2a6055",
  // Aperture filaments / antique gold accent
  gold: "#c8a23e",
  // Warm cream ground — for warm contexts and hero panels
  cream: "#efede5",
  // Optional emotion accent — wine, used sparingly
  wine: "#7e303a",
  // Charcoal body text on cream — slightly darker than shell for readability
  ink: "#2a2a2d",
  // Soft secondary ink for muted copy
  inkMuted: "#5c5d60",
} as const;

export const brandV3Type = {
  // Display: Akira Expanded Super Bold register.
  // Akira is licensed; fallback chain uses open alternatives matching the
  // condensed-bold register: Bricolage Grotesque (already in repo), Anton,
  // Bebas Neue. Production decision deferred to polish pass.
  display: '"Bricolage Grotesque", "Anton", "Bebas Neue", system-ui, sans-serif',
  // Geist (Vercel) — replaces Inter to comply with Impeccable anti-pattern rule
  // "no Inter / Arial as default body font". Geist is free, distinctive,
  // editorial-grade geometric grotesque. Locked 2026-05-09.
  body: '"GeistSans", "Geist", system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", "Fira Code", monospace',
} as const;

export const brandV3Spacing = {
  // Generous vertical rhythm — taste profile signature
  sectionY: "clamp(4rem, 10vh, 9rem)",
  blockY: "clamp(2rem, 5vh, 4rem)",
  inlineGap: "clamp(1rem, 2vw, 2rem)",
} as const;

export const brandV3Mascot = {
  primary: "/brand-v3/nox-PRIMARY-LOCKED.png",
  monogram: "/brand-v3/nox-MONOGRAM-LOCKED.png",
  wordmark: "/brand-v3/nox-WORDMARK-LOCKUP-LOCKED.png",
  poses: {
    working: "/brand-v3/nox-pose-WORKING-LOCKED.png",
    listening: "/brand-v3/nox-pose-LISTENING-LOCKED.png",
    presenting: "/brand-v3/nox-pose-PRESENTING-LOCKED.png",
    resting: "/brand-v3/nox-pose-RESTING-LOCKED.png",
  },
} as const;

export type BrandV3Pose = keyof typeof brandV3Mascot.poses;
