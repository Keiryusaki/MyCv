import type { Config } from "tailwindcss";

/**
 * "Cyber-Enterprise Glassmorphism" — colors are wired to CSS variables defined
 * in globals.css as space-separated RGB triples, so every Tailwind color can be
 * used with an opacity modifier (e.g. `bg-primary/20`, `text-accent`).
 */
const rgb = (v: string) => `rgb(var(${v}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        app: rgb("--bg-app"),
        surface: rgb("--bg-surface"),
        muted: rgb("--bg-muted"),
        line: rgb("--border-subtle"),
        primary: rgb("--color-primary"),
        accent: rgb("--color-accent"),
        success: rgb("--color-success"),
        ink: rgb("--text-main"),
        "ink-muted": rgb("--text-muted"),
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--color-primary) / 0.25), 0 0 32px -4px rgb(var(--color-primary) / 0.45)",
        "glow-lg": "0 0 0 1px rgb(var(--color-primary) / 0.3), 0 0 56px -2px rgb(var(--color-primary) / 0.55)",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow:
              "0 0 0 1px rgb(var(--color-primary) / 0.4), 0 0 22px -6px rgb(var(--color-primary) / 0.5)",
          },
          "50%": {
            boxShadow:
              "0 0 0 1px rgb(var(--color-primary) / 0.7), 0 0 40px -2px rgb(var(--color-primary) / 0.9)",
          },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Opacity-only entrance. WARNING: still NOT safe on an ANCESTOR of a
        // glass card. Empirically (verified via headless screenshots), Chromium
        // promotes any element with a completed `animation` (fill-mode `both`) to
        // a composited backdrop-root layer, which kills descendant cards'
        // backdrop-filter frost even after the opacity settles at 1. Only apply
        // fade-in/fade-up to elements that contain NO `.glass` cards (e.g. a bare
        // heading), never to a Section/decor wrapper. See Section.tsx.
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-in": "fade-in 0.6s ease both",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
