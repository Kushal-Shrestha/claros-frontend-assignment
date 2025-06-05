/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A", // Darker primary color
        secondary: "#1E293B", // Darker secondary color
        accent: "#3B82F6", // Blue accent color
        background: {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          lighter: "#334155",
        },
        text: {
          DEFAULT: "#F8FAFC",
          muted: "#94A3B8",
          dark: "#475569",
        },
        border: {
          DEFAULT: "#334155",
          light: "#475569",
        },
      },
    },
  },
  plugins: [],
};
