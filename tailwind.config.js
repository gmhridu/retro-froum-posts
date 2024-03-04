/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      screens: {
        xs: "370px",
        tab: "770px",
      },
    },
  },
  container: {
    center: true,
    padding: "5rem",
  },
  daisyui: {
    themes: [],
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-gradients'),
  ],
}


