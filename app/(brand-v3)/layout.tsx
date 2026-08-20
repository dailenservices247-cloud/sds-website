// app/(brand-v3)/layout.tsx
// The single route group. Sets data-theme="brand-v3" on a wrapping <div>, scoping the
// brand v3 CSS variables defined in app/globals.css to every route.
//
// The (marketing) group was dissolved into this one 2026-08-20 (1b125cd) — it had no
// layout of its own, so its routes never received this wrapper or LenisProvider, which
// is why the site rendered in two visually divergent registers.
//
// <Stage /> mounts HERE, not in a page. That is the whole point: an App Router layout
// does not remount on navigation within its segment, so the cosmos canvas and the worm
// persist across route changes instead of tearing down and rebuilding. Content routes
// render over it.
//
// Scroll stays NATIVE. Lenis smooths it; it does not replace it. Immersive Garden runs
// overflow:hidden with a fully virtual scroll — do not copy that here. IG is found via
// awards and referral and can afford to be uncrawlable; SDS sells on search. See the
// redesign PRD §4 warning.

import type { ReactNode } from "react";
import { LenisProvider } from "@/components/brand-v3/LenisProvider";
import { Stage } from "@/components/brand-v3/nox/Stage";

export default function BrandV3Layout({ children }: { children: ReactNode }) {
  return (
    <div
      data-theme="brand-v3"
      className="min-h-screen text-[#efede5] antialiased"
      style={{
        backgroundColor: "#3a3b3d",
        // Stacking context so the fixed cosmos canvas (z-index -1) paints ABOVE this
        // background but BELOW content.
        position: "relative",
        zIndex: 0,
      }}
    >
      <Stage />
      <LenisProvider>{children}</LenisProvider>
    </div>
  );
}
