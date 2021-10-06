const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: { ...colors },
      fontFamily: { roboto: "'Roboto',sans-serif" },
      screens: {
        ssm: '450px',
      },
      minHeight: {
        tile: '16rem',
        'tile-sm': '20rem',
      },
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
