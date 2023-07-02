/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      'light': '#FAFAFA',
      'grey': '#BFC8CE',
      'grey-1': '#889DA8',
      'grey-2': '#527182',
      'dark-2': '#1C465C',
      'dark-1': '#15394A',
      'dark': '#0D2734'
    },
    extend: {},
  },
  plugins: [],
}
