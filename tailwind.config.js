/** @type {import('tailwindcss').Config} */


module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#010066",
				info: "#045da6",
				success: "#1f8318",
				danger: "#d32f2f",
				error: "#d32f2f",
				warning: "#ffa000",
			},
			fontFamily: {
				outfit: ["outfit"],
			},
		},
		plugins: [],
	},
};

