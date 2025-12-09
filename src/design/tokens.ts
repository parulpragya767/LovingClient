export const tokens = {
    spacing: {
        base: 8,
        screenX: 24,
        screenY: 16,
        section: 24,
        card: 16,
        gapSmall: 8,
        gapMedium: 16,
        gapLarge: 24,
    },
    radius: {
        card: 16,
        button: 14,
        pill: 9999,
    },
    font: {
        family: 'DMSans',
        weights: {
            regular: '400',
            medium: '500',
            semibold: '600',
        },
    },
    type: {
        title: { size: 24, lineHeight: 32 },
        subtitle: { size: 18, lineHeight: 26 },
        body: { size: 16, lineHeight: 24 },
        small: { size: 14, lineHeight: 20 },
        caption: { size: 12, lineHeight: 16 },
    },
    color: {
        /**
   * Brand colors
   * Used for identity, primary actions, and key highlights
   */
        brand: {
            primary: '#8C3A32', // muted maroon-red (core identity color)
            subtle: '#C98B84',  // softer version for gentle emphasis
        },

        /**
         * Surfaces
         * These define background layers across the app
         */
        surface: {
            screen: '#FBF7F4',   // main app background (warm, calming base)
            base: '#FFFFFF',    // primary content surface (cards, sheets, modals)
            elevated: '#FFFCFA',// subtle lift for grouped sections or highlights
            sunken: '#F2EAE6',  // recessed areas (inputs, inactive blocks)
        },

        /**
         * Text colors
         * Ordered by importance and emphasis
         */
        text: {
            primary: '#2A1F1D',      // main reading text (high contrast, warm)
            secondary: '#4A3A37',    // supporting text, descriptions
            muted: '#6F5F5B',        // hints, captions, low emphasis
            disabled: '#9C8F8C',     // disabled or inactive text

            inverse: '#FFFFFF',      // text on dark / brand-colored surfaces
            inverseMuted: '#F3E9E6', // softer inverse text for subtitles
        },

        /**
         * Borders & dividers
         * Used for structure without visual noise
         */
        border: {
            default: '#E7DCD6', // standard dividers and outlines
            strong: '#D3C6BF',  // higher-contrast borders (sections)
            focus: '#8C3A32',   // focused inputs / active outlines
        },

        /**
         * Actions
         * Semantic definitions for interactive elements
         */
        action: {
            primary: {
                bg: '#8C3A32',    // main call-to-action background
                text: '#FFFFFF', // text on primary buttons
            },
            secondary: {
                bg: '#F2EAE6',    // softer, secondary actions
                text: '#2A1F1D',
            },
            ghost: {
                text: '#8C3A32',  // text-only or minimal actions
            },
        },

        /**
         * Accents
         * Used sparingly for warmth, rituals, moments of joy
         */
        accent: {
            warm: '#D6A15C', // harvest gold — highlights & emotional cues
            soft: '#E7C9A3', // calmer accent for subtle emphasis
        },

        /**
         * State & feedback colors
         * Informational, not alarming
         */
        state: {
            success: '#5E8B6A', // calm green for completion or affirmation
            warning: '#C28B4A', // gentle amber for caution
            error: '#A8483D',   // muted red for errors
            info: '#6A7F8C',    // neutral blue for info
        },

        /**
         * Tags / chips (optional)
         * Lightweight categorization or status markers
         */
        tag: {
            neutral: {
                bg: '#F2EAE6',    // quiet background for neutral tags
                text: '#4A3A37',
            },
            highlight: {
                bg: '#D6A15C',    // highlighted or special tags
                text: '#2A1F1D',
            },
        },


        // text: {
        //     primary: '#1F2937', // dark slate
        //     muted: '#6B7280', // cool gray
        //     inverse: '#FFFFFF',
        // },
        // bg: {
        //     screen: '#FAF9F6', // warm cream
        //     card: '#FFFFFF',
        //     subtle: '#F6F5F3', // very light tint for subtle sections
        // },
        // brand: {
        //     primary: '#6B7C6E', // muted sage
        //     soft: '#E6EAE6', // light sage tint
        // },
        // tag: {
        //     bg: '#F3F4F6', // neutral pill background
        //     text: '#374151', // dark-ish for tags
        // },
        // divider: '#EDEBE8',
    },
    shadow: {
        card: '0px 6px 18px rgba(31,41,55,0.06)',
    },
};