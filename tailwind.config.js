/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        limeGreen: '#70a401',
      },
      fontFamily: {
        caveat: ['"Caveat Brush"', 'cursive'],
      },
    },
  },
  plugins: [],
}
