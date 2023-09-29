const withMT = require("@material-tailwind/react/utils/withMT")
/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--clr-primary))",
        white: {
          blue: "rgb(var(--clr-white-blue))",
          default: "rgb(var(--clr-white))",
        },
        black: {
          dark: "rgb(var(--clr-black-dark))",
          default: "rgb(var(--clr-black))",
        },
      },
    },
  },
  plugins: [],
})
