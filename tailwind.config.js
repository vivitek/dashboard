const defaults = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["montserrat", ...defaults.fontFamily.sans],
        itc: ["itc-avant-garde-gothic-pro", "sans-serif"],
      },
    },
    colors: {
      ...defaults.colors,
      darkBlue: {
        DEFAULT: "#1A1F32"
      },
      viviBlue: {
        DEFAULT: "#3c65ac"
      },
      grayBlue: {
        DEFAULT: "#292E41"
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
