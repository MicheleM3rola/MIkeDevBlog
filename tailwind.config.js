module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Sections/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        abel: "'Abel',sans-serif",
        montserrat: "'Montserrat',sans-serif",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
