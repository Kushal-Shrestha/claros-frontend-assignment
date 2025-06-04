/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101828", // Your primary color
        secondary: "#364153", // Your secondary color
      },
    },
  },
  plugins: [],
};
