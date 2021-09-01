const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      tile: '25rem',
    },
    extend: {
      colors: { ...colors },
      fontFamily: { roboto: "'Roboto',sans-serif" },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('tailwind-capitalize-first-letter'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
