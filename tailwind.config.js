const colors = require('tailwindcss/colors');

module.exports = {
  purge: [],
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
