/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: "#d1ddff",
      background: "#000517",
      primary: "#6b8cff",
      secondary: "#52009c",
      accent: "#d31bff",
    },
    fontFamily: {
      "edu-hand": ['"Edu AU VIC WA NT Hand"', "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
