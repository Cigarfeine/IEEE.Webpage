export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #0B0F0E)",
        foreground: "var(--foreground, #F7F7F5)",
        primary: {
          DEFAULT: "var(--primary, #CBEB3A)",
          foreground: "var(--primary-foreground, #0B0F0E)",
        },
        muted: {
          DEFAULT: "var(--muted, #141A19)",
          foreground: "var(--muted-foreground, #8A9491)",
        },
        accent: {
          DEFAULT: "var(--accent, #111615)",
          foreground: "var(--accent-foreground, #F7F7F5)",
        },
        border: "var(--border, rgba(255, 255, 255, 0.12))",
        ring: "var(--ring, #CBEB3A)",
        obsidian: {
          DEFAULT: "#0B0F0E",
          pure: "#050707",
          surface: "#111615",
          card: "#141A19",
        },
        petrol: {
          DEFAULT: "#01565B",
          dark: "#003E42",
          light: "#02777E",
        },
        paper: {
          DEFAULT: "#F7F7F5",
          pure: "#FFFFFF",
          muted: "#EAEAE6",
          dark: "#D6D6D0",
        },
        lime: {
          DEFAULT: "#CBEB3A",
          hover: "#D7F648",
          glow: "rgba(203, 235, 58, 0.4)",
          subtle: "rgba(203, 235, 58, 0.12)",
        },
        scrim: "#181818",
        ink: "#111111",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        serif: ["var(--font-instrument-serif)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tightest: "-0.06em",
        ultra: "0.15em",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
