// app/(brand-v3)/layout.tsx
// Route group layout for brand v3 (matte gray + petrol green + antique gold + Nox mascot).
// Sets data-theme="brand-v3" on a wrapping <div>, scoping brand v3 CSS variables
// defined in app/globals.css to all routes nested inside app/(brand-v3)/.
// Existing (marketing) and (v3) route groups are unaffected.
//
// Wraps every brand-v3 variant in LenisProvider for hijacked smooth-scroll
// (lerp 0.08, exponential ease-out). LenisProvider passes through to native
// scroll under prefers-reduced-motion.
//
// Sibling per-variant routes:
//   v1-garden  — Immersive Garden direction (editorial 3D, full-bleed cinematic)
//   v2-linear  — Linear direction (typography-rigor minimal) — banked
//   v3-cursor  — Cursor direction (developer-tool clean) — banked

import type { ReactNode } from "react";
import { LenisProvider } from "@/components/brand-v3/LenisProvider";

export default function BrandV3Layout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="brand-v3"
      className="min-h-screen text-[#efede5] antialiased"
      style={{ backgroundColor: "#3a3b3d" }}
    >
      <LenisProvider>{children}</LenisProvider>
    </div>
  );
}
