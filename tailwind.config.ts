import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151212",
        "ink-soft": "#1D1818",
        paper: "#F7F4F1",
        "paper-dim": "#EDE6E1",
        line: "rgba(247, 244, 241, 0.14)",
        "line-dark": "rgba(21, 18, 18, 0.12)",
        muted: "#9C8E8B",
        accent: "#7A1F2B",
        "accent-bright": "#A6293A",
        "accent-deep": "#4A1017",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [],
};

export default config;
