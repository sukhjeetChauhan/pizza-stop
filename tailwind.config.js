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
      height: {
        'screen-minus-header': 'calc(100vh - 9rem)', // Adjust '4rem' to your header's height
      },
      inset: {
        '-full': '-100%',
      },
    },
  },
  plugins: [],
}
