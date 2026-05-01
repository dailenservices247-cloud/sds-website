// app/(v3)/layout.tsx
// Route group layout for brand v3 (Replicate × Ollama synthesis).
// Sets data-theme="v3" on a wrapping <div>, scoping the white-canvas synthesis
// CSS variables defined in app/globals.css to all routes nested inside
// app/(v3)/. Existing 12 brand v2 routes are completely unaffected.

import type { ReactNode } from "react";

export default function V3Layout({ children }: { children: ReactNode }) {
  return (
    <div data-theme="v3" className="bg-bg-primary text-ink-primary min-h-screen">
      {children}
    </div>
  );
}
