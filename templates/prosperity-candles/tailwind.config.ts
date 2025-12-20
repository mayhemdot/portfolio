/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],

	theme: {
		screens: {
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
			"3xl": "1720px",
		},

		container: {
			center: true,
			padding: {
				DEFAULT: "10px",
				lg: "1rem",
				xl: "1rem",
				"2xl": "1rem",
			},
			screens: {
				sm: "576px",
				md: "720px",
				lg: "1000px",
				xl: "1280px",
				"3xl": "1720px",
			},
		},
	},

	// plugins: [require("@tailwindcss/typography")],

	blocklist: ["table", "h1", "h2", "h3", "h4", "h5", "h6"],
};
