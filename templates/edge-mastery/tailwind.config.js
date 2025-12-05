// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(accordion|alert|breadcrumbs|card|checkbox|chip|drawer|input|pagination|select|skeleton|slider|table|divider|button|ripple|spinner|form|modal|listbox|popover|scroll-shadow|spacer).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
