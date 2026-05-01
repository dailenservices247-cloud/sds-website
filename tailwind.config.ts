import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          light: "var(--bg-light)",
          dark: "var(--bg-dark, #0a0f0c)",
          "dark-elevated": "var(--bg-dark-elevated, #1c2422)",
        },
        ink: {
          primary: "var(--text-primary)",
          strong: "var(--text-strong, var(--text-primary))",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
          soft: "var(--text-soft, var(--text-dim))",
          "on-dark": "var(--text-on-dark, var(--text-primary))",
          "on-dark-soft": "var(--text-on-dark-soft, var(--text-dim))",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          bright: "var(--accent-bright)",
          deep: "var(--accent-deep)",
          live: "var(--accent-live, #22c55e)",
          "live-bright": "var(--accent-live-bright, #34d880)",
        },
        "border-subtle": "var(--border-subtle)",
        "border-soft": "var(--border-soft, var(--border-subtle))",
        "border-accent": "var(--border-accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // mono: existing JetBrains Mono kept for brand v2 routes; v3 routes
        // use --font-geist-mono via CSS classes (.mono-label and similar).
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        // Display — variable Bricolage Grotesque (used in [data-theme="v3"] only).
        // Replaces rb-freigeist-neue conceptually for loud-register headlines.
        display: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        bricolage: ["var(--font-bricolage)", "system-ui", "sans-serif"],
        "rounded-quiet": [
          "ui-rounded",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      maxWidth: {
        container: "72rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "drift": "drift 20s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-12px, 8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
