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
        // Cefalo design-system palette. Var-backed channel triplets so opacity
        // modifiers (text-ink/70, bg-white/12) resolve via <alpha-value>. Scoped
        // to .portfolio-root in globals.css; never collide with the tokens above.
        ink: "rgb(var(--ink) / <alpha-value>)",
        graphite: "rgb(var(--graphite) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        mist: "rgb(var(--mist) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        navy: "rgb(var(--navy) / <alpha-value>)",
        "navy-90": "rgb(var(--navy-90) / <alpha-value>)",
        "navy-70": "rgb(var(--navy-70) / <alpha-value>)",
        "navy-20": "rgb(var(--navy-20) / <alpha-value>)",
        "navy-tint": "rgb(var(--navy-tint) / <alpha-value>)",
        green: "rgb(var(--green) / <alpha-value>)",
        cyan: "rgb(var(--cyan) / <alpha-value>)",
        "cyan-90": "rgb(var(--cyan-90) / <alpha-value>)",
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
