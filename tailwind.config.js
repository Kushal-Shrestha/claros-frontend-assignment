/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#101828", // Primary Color
        secondary: "#364153", // Secondary Color
      },
    },
  },
  plugins: [],
};
