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
        text: {
            primary: '#1F2937', // dark slate
            muted: '#6B7280', // cool gray
            inverse: '#FFFFFF',
        },
        bg: {
            screen: '#FAF9F6', // warm cream
            card: '#FFFFFF',
            subtle: '#F6F5F3', // very light tint for subtle sections
        },
        brand: {
            primary: '#6B7C6E', // muted sage
            soft: '#E6EAE6', // light sage tint
        },
        tag: {
            bg: '#F3F4F6', // neutral pill background
            text: '#374151', // dark-ish for tags
        },
        divider: '#EDEBE8',
    },
    shadow: {
        card: '0px 6px 18px rgba(31,41,55,0.06)',
    },
};