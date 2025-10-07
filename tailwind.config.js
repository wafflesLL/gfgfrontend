/** @type {import('tailwindcss').Config} */
const colors = require("./lib/colors");

module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}'
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
