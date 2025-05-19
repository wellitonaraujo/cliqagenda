/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#00AEEF',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      transitionProperty: {
        'width': 'width',
        'transform': 'transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
    }
  },
  plugins: [],
}