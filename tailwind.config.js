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
        // Step 1 portfolio palette. Var-backed channel triplets: opacity
        // modifiers (bg-ink/70) resolve via <alpha-value>, and a single CSS
        // swap in globals.css re-themes the whole page for dark mode. New
        // names that never collide with the tokens above; only used in Portfolio.
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        marker: "rgb(var(--marker) / <alpha-value>)",
        indigo: "rgb(var(--indigo) / <alpha-value>)",
        // Always-dark text for use on the (always-yellow) marker highlight,
        // so the highlighted words stay legible in light and dark alike.
        "on-marker": "rgb(var(--on-marker) / <alpha-value>)",
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
