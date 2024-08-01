/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,md}"],
  theme: {
    extend: {
      colors: {
        sepia: "#f5e6c4", // Sepia color
        brown: "#a52a2a",
        lightbrown: "#be1111",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
