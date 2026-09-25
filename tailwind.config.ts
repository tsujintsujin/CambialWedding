import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Template palette — restored exactly.
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
        // The couple's five motif tones. Used by the Colour Motif swatches.
        burgundy: "#641428",
        "burgundy-deep": "#420C1A",
        wine: "#8C2B3A",
        terracotta: "#B55B4C",
        sand: "#D8A98B",
        ivory: "#F7EFE6",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
        widest3: "0.42em",
      },
      maxWidth: {
        shell: "1400px",
      },
      screens: {
        // Most Android phones are 360px wide. The raw `desktop` screen below
        // turns off Tailwind's arbitrary min-[...] variants, so this needs a
        // name. Extended screens are emitted after sm/md, so never pair an
        // xs: class with an sm:/md: class on the same property.
        xs: "360px",
        // The Hero collage needs both real width and a mouse. Width alone lets
        // a landscape iPad through (1080-1366px), and pointer alone lets one
        // through with a trackpad attached, which reports a fine pointer — so
        // this asks for both. Anything else takes the mobile treatment.
        desktop: { raw: "(min-width: 1280px) and (pointer: fine)" },
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
