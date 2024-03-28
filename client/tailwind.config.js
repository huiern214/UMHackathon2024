/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
  "./src/pages/**/*.{js,jsx,ts,tsx}",
  "./src/components/**/*.{js,jsx,ts,tsx}",
];

export const fontFamily = {
  sans: ["Inter", "sans-serif"],
};

export const theme = {
  extend: {
    colors: {
      primary: '#3066be',
      deep_blue: '#03045e'
    },
  },
};

export const plugins = [
  "tailwindcss", "autoprefixer",
];
