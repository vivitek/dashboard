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
      borderColor: ["active"],
      colors: {
        ...defaults.colors,
        viviBlue: {
          DEFAULT: "#303e67",
          900: "#303e67e6",
          800: "#303e67cc",
          700: "#303e67b3",
          600: "#303e6799",
          500: "#303e6780",
          400: "#303e6766",
          300: "#303e674d",
          200: "#303e6733",
          100: "#303e671a"
        },
        viviRed: {
          DEFAULT: "#68313f",
          900: "#68313fe6",
          800: "#68313fcc",
          700: "#68313fb3",
          600: "#68313f99",
          500: "#68313f80",
          400: "#68313f66",
          300: "#68313f4d",
          200: "#68313f33",
          100: "#68313f1a"
        },
        viviGreen: {
          DEFAULT: "#3f6831",
          900: "#3f6831e6",
          800: "#3f6831cc",
          700: "#3f6831b3",
          600: "#3f683199",
          500: "#3f683180",
          400: "#3f683166",
          300: "#3f68314d",
          200: "#3f683133",
          100: "#3f68311a"
        },
        viviYellOrange: {
          DEFAULT: "#FF9420",
          900: "#ff9420e6",
          800: "#ff9420cc",
          700: "#ff9420b3",
          600: "#ff942099",
          500: "#ff942080",
          400: "#ff942066",
          300: "#ff94204d",
          200: "#ff942033",
          100: "#ff94201a"
        },
        viviPinple: {
          DEFAULT: "#b35794",
          900: "#b35794e6",
          800: "#b35794cc",
          700: "#b35794b3",
          600: "#b3579499",
          500: "#b3579480",
          400: "#b3579466",
          300: "#b357944d",
          200: "#b3579433",
          100: "#b357941a"
        },
        darkBlue: {
          "DEFAULT": "#1a1f32",
          900: "#1a1f32e6",
          800: "#1a1f32cc",
          700: "#1a1f32b3",
          600: "#1a1f3299",
          500: "#1a1f3280",
          400: "#1a1f3266",
          300: "#1a1f324d",
          200: "#1a1f3233",
          100: "#1a1f321a"
        },
        grayBlue: {
          DEFAULT: "#292e40",
          900: "#292e40e6",
          800: "#292e40cc",
          700: "#292e40b3",
          600: "#292e4099",
          500: "#292e4080",
          400: "#292e4066",
          300: "#292e404d",
          200: "#292e4033",
          100: "#292e401a"
        }
      },
      height: {
        "9/20": "45%"
      },
      width: {
        "9/20": "45%"
      },
    },
    screen: {
      'xl': '1000px'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
