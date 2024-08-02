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
        'screen-minus-dashboard-header': 'calc(100vh - 5.5rem)', // Adjust '4rem' to your header's height
        'screen-10rem': 'calc(100vh - 6.5rem)',
      },
      inset: {
        '-full': '-100%',
      },
    },
  },
  plugins: [],
}
