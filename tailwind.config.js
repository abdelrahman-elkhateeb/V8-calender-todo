/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      text: "#0e1415",
      background: "#eaf4f6",
      primary: "#206674",
      secondary: "#63d5e9",
      accent: "#08bee2",
    },
    fontFamily: {
      "edu-hand": ['"Edu AU VIC WA NT Hand"', "cursive"],
    },
    extend: {},
  },
  plugins: [],
};
