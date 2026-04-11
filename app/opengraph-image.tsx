import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Synapse Dynamics — Ship AI that actually works.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0f0c",
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.18) 0%, transparent 65%)",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#F0FDF4",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <svg
            width={46}
            height={76}
            viewBox="0 0 60 100"
            style={{ marginRight: 4 }}
          >
            <path
              d="M 52 20 C 52 4, 8 4, 8 30 C 8 50, 52 50, 52 70 C 52 96, 8 96, 8 80"
              fill="none"
              stroke="#22c55e"
              strokeWidth={14}
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F0FDF4",
            }}
          >
            ynapse Dynamics
          </span>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: 24,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#22c55e",
              fontFamily: "ui-monospace, monospace",
              margin: 0,
              marginBottom: 24,
            }}
          >
            AI Agency · Est. 2026
          </p>
          <h1
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              margin: 0,
              color: "#F0FDF4",
            }}
          >
            Ship AI that
          </h1>
          <h1
            style={{
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              margin: 0,
              color: "#22c55e",
            }}
          >
            actually works.
          </h1>
        </div>

        {/* Bottom: meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 32,
            borderTop: "1px solid #242e2a",
          }}
        >
          <p
            style={{
              fontSize: 22,
              color: "#94a3a0",
              margin: 0,
            }}
          >
            Custom apps · Automation · Strategy
          </p>
          <p
            style={{
              fontSize: 18,
              color: "#5f6b66",
              fontFamily: "ui-monospace, monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            synapsedynamics.vercel.app
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
