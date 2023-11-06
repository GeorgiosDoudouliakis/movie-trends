/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': '#20ffe8',
      'secondary': '#fcfcfc',
      'lighter-black': '#0f1219'
    },
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
}
