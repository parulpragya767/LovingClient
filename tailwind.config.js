/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DMSans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        title: ['24px', { lineHeight: '32px' }],
        subtitle: ['18px', { lineHeight: '26px' }],
        body: ['16px', { lineHeight: '24px' }],
        small: ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '16px' }],
      },
      colors: {
        text: {
          primary: '#1F2937',
          muted: '#6B7280',
        },
        bg: {
          screen: '#FAF9F6',
          card: '#FFFFFF',
          subtle: '#F6F5F3',
        },
        brand: {
          primary: '#6B7C6E',
          soft: '#E6EAE6',
        },
        tag: {
          bg: '#F3F4F6',
          text: '#374151',
        },
        divider: '#EDEBE8',
      },
      borderRadius: {
        card: '16px',
        button: '14px',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 6px 18px rgba(31,41,55,0.06)',
      },
    },
  },
  plugins: [],
  // darkMode: "class", // or "media" or "class"
}