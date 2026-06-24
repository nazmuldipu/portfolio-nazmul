module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c25875",
        secondary: "#C2C058",
        light: "#F2F2F2",
        dark: "#2F2F2F",
        accent: "#58C2C0",
        "text-primary": "#374151",
        "text-secondary": "#4b5563",
        // Emerald + gold jewel palette. Var-backed channel triplets so opacity
        // modifiers (text-ink/70, bg-white/12) resolve via <alpha-value>. Scoped
        // to .portfolio-root in globals.css; never collide with the tokens above.
        ink: "rgb(var(--ink) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        mint: "rgb(var(--mint) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        emerald: "rgb(var(--emerald) / <alpha-value>)",
        "emerald-90": "rgb(var(--emerald-90) / <alpha-value>)",
        "emerald-70": "rgb(var(--emerald-70) / <alpha-value>)",
        "emerald-20": "rgb(var(--emerald-20) / <alpha-value>)",
        "emerald-tint": "rgb(var(--emerald-tint) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        "gold-bright": "rgb(var(--gold-bright) / <alpha-value>)",
      },
      fontFamily: {
        primary: ["var(--font-primary)"],
        secondary: ["var(--font-secondary)"],
        stylus: ["var(--font-stylus)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
