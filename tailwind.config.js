/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./src/styles/**/*.css"],
  safelist: ["button-primary-style", "button-secondary-style"],
  theme: {
    extend: {
      fontFamily: {
        podkova: ["Podkova", "serif"],
      },
      colors: {
        "color-primary": "#0F6474",
        "color-secondary": "#96A88E",
        "color-accent": "#AFCDA2",
        "color-background": "#E0F9F6",
        "color-text-primary": "#08323B",
        "color-text-secondary": "#6A6773",
        "color-error": "#E85757",
      },
    },
  },
  plugins: [],
};

// do i need this or no????
// const withMT = require("@material-tailwind/react/utils/withMT");

// module.exports = withMT({
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// });
