module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        sans: ['DMSans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        title: ['24px', { lineHeight: '32px' }],
        heading: ['20px', { lineHeight: '28px' }],
        subtitle: ['18px', { lineHeight: '26px' }],
        body: ['16px', { lineHeight: '24px' }],
        small: ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '16px' }],
        extraSmall: ['10px', { lineHeight: '14px' }],
      },
      colors: {
        /**
         * Brand colors
         * Identity, emphasis, and primary actions
         */
        brand: {
          primary: '#8C3A32',
          subtle: '#C98B84',
        },

        /**
         * Surfaces (background layers)
         * Used via bg-surface-*
         */
        surface: {
          screen: '#FBF7F4',
          base: '#FFFFFF',
          elevated: '#FFFCFA',
          sunken: '#F2EAE6',
        },

        /**
         * Text colors
         * Used via text-text-*
         */
        text: {
          primary: '#2A1F1D',
          secondary: '#4A3A37',
          muted: '#6F5F5B',
          disabled: '#9C8F8C',
          inverse: '#FFFFFF',
          inverseSubtle: '#F3E9E6',
        },

        /**
         * Borders & dividers
         * Used via border-border-*
         */
        border: {
          DEFAULT: '#E7DCD6',
          strong: '#D3C6BF',
          focus: '#8C3A32', // brand.primary
        },

        /**
         * Action colors (buttons & interactive elements)
         */
        action: {
          primary: {
            bg: '#8C3A32', // brand.primary
            text: '#FFFFFF', // text.inverse
          },
          secondary: {
            bg: '#F2EAE6', // surface.sunken
            text: '#2A1F1D', // text.primary
          },
          ghost: {
            text: '#8C3A32', // brand.primary
          },
        },
        /**
         * Accent colors
         * Emotional highlights, rituals, warmth
         */
        accent: {
          primary: '#D6A15C',
          subtle: '#E7C9A3',
        },

        /**
         * State & feedback colors
         */
        state: {
          success: '#5E8B6A',
          warning: '#C28B4A',
          error: '#A8483D',
          info: '#6A7F8C',
        },

        /**
         * Tags / chips
         */
        tag: {
          neutral: {
            bg: '#F2EAE6', // surface.sunken
            text: '#4A3A37', // text.secondary
          },
          highlight: {
            bg: '#D6A15C', // accent.primary
            text: '#2A1F1D', // text.primary
          },
        },
      },

      borderRadius: {
        compactCard: '12px', // rounded-xl
        card: '16px', // rounded-2xl
        button: '14px',
        pill: '9999px', // rounded-full
      },
      boxShadow: {
        card: '0 6px 18px rgba(31,41,55,0.06)',
        elevated: '0 10px 28px rgba(31,41,55,0.08)',
      },
    },
  },
  plugins: [],
}