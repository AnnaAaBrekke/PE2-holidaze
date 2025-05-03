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
        "color-secondary": "#5C6A52",
        "color-accent": "#AFCDA2",
        "color-accent-hover": "#7C9670",
        "color-background": "#E0F9F6",
        "color-tag": "#DBEAFE66",
        "color-text-primary": "#0832a3B",
        "color-text-secondary": "6A6773",
        "color-text-body": "#666666",
        "color-error": "#E85757",
        "color-error-accent": "#991B1B",
      },
    },
  },
  plugins: [],
};
