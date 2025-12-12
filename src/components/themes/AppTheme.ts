import tailwindConfig from '@/tailwind.config';

type TailwindConfig = typeof tailwindConfig;

const colors = (tailwindConfig.theme?.extend?.colors ?? tailwindConfig.theme?.colors) as any;
const fontFamily = (tailwindConfig.theme?.extend?.fontFamily ?? tailwindConfig.theme?.fontFamily) as any;
const fontSize = (tailwindConfig.theme?.extend?.fontSize ?? tailwindConfig.theme?.fontSize) as any;
const borderRadius = (tailwindConfig.theme?.extend?.borderRadius ?? tailwindConfig.theme?.borderRadius) as any;
const boxShadow = (tailwindConfig.theme?.extend?.boxShadow ?? tailwindConfig.theme?.boxShadow) as any;

type FontSizeKey = 'title' | 'subtitle' | 'body' | 'small' | 'caption';
type FontSizeValue = [string, { lineHeight: string }];

export const AppTheme = {
  colors: {
    // Brand colors
    brand: {
      primary: colors.brand.primary,
      subtle: colors.brand.subtle,
    },
    
    // Surface colors
    surface: {
      screen: colors.surface.screen,
      base: colors.surface.base,
      elevated: colors.surface.elevated,
      sunken: colors.surface.sunken,
    },
    
    // Text colors
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
      muted: colors.text.muted,
      disabled: colors.text.disabled,
      inverse: colors.text.inverse,
      inverseSubtle: colors.text.inverseSubtle,
    },
    
    // Border colors
    border: {
      DEFAULT: colors.border.DEFAULT,
      strong: colors.border.strong,
      focus: colors.border.focus,
    },
    
    // Action colors
    action: {
      primary: {
        bg: colors.action.primary.bg,
        text: colors.action.primary.text,
      },
      secondary: {
        bg: colors.action.secondary.bg,
        text: colors.action.secondary.text,
      },
      ghost: {
        text: colors.action.ghost.text,
      },
    },
    
    // Accent colors
    accent: {
      primary: colors.accent.primary,
      subtle: colors.accent.subtle,
    },
    
    // State colors
    state: {
      success: colors.state.success,
      warning: colors.state.warning,
      error: colors.state.error,
      info: colors.state.info,
    },
    
    // Tag colors
    tag: {
      neutral: {
        bg: colors.tag.neutral.bg,
        text: colors.tag.neutral.text,
      },
      highlight: {
        bg: colors.tag.highlight.bg,
        text: colors.tag.highlight.text,
      },
    },
  },

  // Typography
  typography: {
    fontFamily: {
      sans: Array.isArray(fontFamily.sans) ? fontFamily.sans[0] : fontFamily.sans,
    },
    fontSize: {
      title: fontSize.title as FontSizeValue,
      subtitle: fontSize.subtitle as FontSizeValue,
      body: fontSize.body as FontSizeValue,
      small: fontSize.small as FontSizeValue,
      caption: fontSize.caption as FontSizeValue,
      extraSmall: fontSize.extraSmall as FontSizeValue,
    },
  },
  
  // Border radius
  borderRadius: {
    compactCard: borderRadius.compactCard,
    card: borderRadius.card,
    button: borderRadius.button,
    pill: borderRadius.pill,
  },
  
  // Shadows
  shadow: {
    card: boxShadow.card,
    elevated: boxShadow.elevated,
  },
} as const;