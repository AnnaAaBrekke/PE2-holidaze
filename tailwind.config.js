/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        podkova: ["Podkova", "serif"],
      },
    },
  },
  plugins: [],
};
