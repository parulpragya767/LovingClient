import clsx from 'clsx';
import React from 'react';
import { Text, TextProps } from 'react-native';


export type AppTextVariant = 'title' | 'heading' | 'subtitle' | 'body' | 'small' | 'caption' | 'extraSmall' | 'muted';

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: string;
  className?: string;
};

const FONT_BASE = 'OpenSans';

const FONT_MAP = {
  regular: FONT_BASE,
  medium: `${FONT_BASE}-Medium`,
  semibold: `${FONT_BASE}-SemiBold`,
};

const resolveFontFamily = (className?: string) => {
  if (!className) return FONT_MAP.regular;

  if (className.includes('font-semibold')) return FONT_MAP.semibold;
  if (className.includes('font-medium')) return FONT_MAP.medium;

  return FONT_MAP.regular;
};

const variantClasses: Record<AppTextVariant, string> = {
  title: 'text-title font-semibold',
  heading: 'text-heading font-semibold',
  subtitle: 'text-subtitle font-medium',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption',
  extraSmall: 'text-extraSmall',
  muted: 'text-body text-text-muted',
};

export function AppText({
  variant = 'body',
  color = 'text-text-primary',
  className,
  style,
  children,
  ...rest
}: AppTextProps) {
  const combinedClassName = clsx(variantClasses[variant], color, className);
  const fontFamily = resolveFontFamily(combinedClassName);

  return (
    <Text
      className={combinedClassName}
      style={[style, { fontFamily, fontWeight: undefined }]}
      {...rest}
    >
      {children}
    </Text>
  );
}