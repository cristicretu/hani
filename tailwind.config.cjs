/** @type {import('tailwindcss').Config}*/
const { createThemes } = require('tw-colors');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      light: {
        primary: "#0a0a0a",
        secondary: "#262626",
        tertiary: "#525252",
        quaternary: "#a3a3a3",
        bg: "#fafafa",
        bg2: "#f5f5f5",
        bg3: "#e5e5e5",
        brand: "#fb923c",
      },
      hani: {
        primary: "#451a03",
        secondary: "#92400e",
        tertiary: "#d97706",
        quaternary: "#fbbf24",
        bg: "#fffbeb",
        bg2: "#fef3c7",
        bg3: "#fde68a",
        brand: "#fb923c", 
      },
      dark: {
        primary: "#fafafa",
        secondary: "#e5e5e5",
        tertiary: "#a3a3a3",
        quaternary: "#525252",
        bg: "#0a0a0a",
        bg2: "#171717",
        bg3: "#262626",
        brand: "#fb923c",
      }
    })
  ],
};

module.exports = config;
