module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors:{
                'primary': '#c25875',
                'secondary': '#C2C058',
                'light': '#F2F2F2',
                'dark': '#2F2F2F',
                'accent': '#58C2C0',
            },
            fontFamily: {
				primary: ["var(--font-primary)"],
				secondary: ["var(--font-secondary)"],
                stylus: ["var(--font-stylus)"],
			},
        },
    },
    plugins: [],
};

// #C2585A
// #C2C058
// #58C2C0
// #585AC2