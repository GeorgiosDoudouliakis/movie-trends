/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary': '#20ffe8',
      'secondary': '#fcfcfc',
      'lighter-black': '#0f1219',
      'card-bg': '#202336'
    },
    extend: {
      fontFamily: {
        sans: ['Noto Sans Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
