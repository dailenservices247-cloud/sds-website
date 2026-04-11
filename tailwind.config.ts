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
        },
        ink: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          bright: "var(--accent-bright)",
          deep: "var(--accent-deep)",
        },
        "border-subtle": "var(--border-subtle)",
        "border-accent": "var(--border-accent)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
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
