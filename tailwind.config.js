/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#d11919ff", // gray-50
          dark: "#1a4cb7ff", // gray-900
        },
        surface: {
          light: "#ffffff",
          dark: "#1f2937", // gray-800
        },
        border: {
          light: "#e5e7eb",
          dark: "#374151",
        },
        textPrimary: {
          light: "#111827",
          dark: "#f9fafb",
        },
        textSecondary: {
          light: "#6b7280",
          dark: "#d1d5db",
        },
        accent: {
          light: "#3b82f6",
          dark: "#60a5fa",
        },
      },
    },
  },
  plugins: [],
  // darkMode: "class", // or "media" or "class"
}