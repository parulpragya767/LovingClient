/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}","./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#ffffff", // gray-50
          dark: "#111827", // gray-900
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