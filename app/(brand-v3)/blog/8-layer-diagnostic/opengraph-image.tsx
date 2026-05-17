// app/(brand-v3)/blog/8-layer-diagnostic/opengraph-image.tsx
//
// Dynamically generates the OpenGraph image for the 8-Layer Diagnostic blog
// post via Next.js ImageResponse. Replaces the static /og/8-layer-diagnostic.png
// referenced in metadata.openGraph.images (which was never actually created
// as a static asset; this dynamic route is what serves it).
//
// Next.js automatically routes this file to `/blog/8-layer-diagnostic/opengraph-image`
// at the size specified in `size`. LinkedIn, X, etc. will pull this image when
// rendering link previews.

import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The 8-Layer Diagnostic — Synapse Dynamics Segmented";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background: "#3a3b3d",
          color: "#efede5",
          fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c8a23e",
            fontWeight: 600,
          }}
        >
          <span>METHODOLOGY</span>
          <span style={{ color: "#efede5", opacity: 0.4 }}>·</span>
          <span style={{ color: "#efede5" }}>FREE DIAGNOSTIC</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 1.0,
              fontWeight: 700,
              color: "#efede5",
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            The 8-Layer Diagnostic
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.2,
              color: "#efede5",
              opacity: 0.78,
              maxWidth: 900,
            }}
          >
            Score your agent stack across 8 layers in 20 minutes.
            Surface the one bottleneck actually slowing you down.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#efede5",
            opacity: 0.65,
          }}
        >
          <span>Dailen Huntley · Synapse Dynamics Segmented</span>
          <span style={{ color: "#c8a23e", fontWeight: 600 }}>
            synapsedynamics.io
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
