const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    enabled: false,
    content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: ['dark'],
    },
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      white: 'white',
      black: 'black',
      gray: colors.trueGray,
      purple: colors.purple,
    },
    extend: {
      animation: {
        'spin-once': 'spinOnce .75s ease-in-out',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
