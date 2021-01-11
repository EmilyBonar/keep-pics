module.exports = {
	purge: ["./pages/**/*.js", "./components/**/*.js"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: { ringWidth: ["hover"], fontWeight: ["hover", "focus"] },
	},
	plugins: [],
};
