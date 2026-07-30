import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E16",
        inkdeep: "#05070C",
        panel: "#141B28",
        panelraised: "#1B2436",
        amber: "#F0A94E",
        amberdeep: "#E0922E",
        cyan: "#4FD9E8",
        cyandeep: "#2BB8C9",
        muted: "#8792A3",
        body: "#C7CFDA",
        heading: "#F3F5F8",
        paper: "#141B28",
        paperdim: "#1B2436",
        slate: "#8792A3",
        moss: "#4C7A6B",
        rule: "#25314A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        inkReveal: {
          "0%": { opacity: "0", filter: "blur(6px)", transform: "translateY(6px)" },
          "100%": { opacity: "1", filter: "blur(0px)", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        tick: {
          "0%": { transform: "scale(0.4)", opacity: "0" },
          "60%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(240,169,78,0.5)" },
          "50%": { opacity: "0.6", boxShadow: "0 0 0 4px rgba(240,169,78,0)" },
        },
      },
      animation: {
        inkReveal: "inkReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        blink: "blink 1s step-end infinite",
        tick: "tick 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        glowPulse: "glowPulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
