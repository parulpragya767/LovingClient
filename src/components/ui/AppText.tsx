import clsx from 'clsx';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';


export type AppTextVariant = 'title' | 'heading' | 'subtitle' | 'body' | 'small' | 'caption' | 'extraSmall' | 'muted';

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  color?: string;
  className?: string;
};

const baseClasses = 'font-sans';

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
  return (
    <Text
      className={clsx(baseClasses, color, variantClasses[variant], className)}
      style={style as TextStyle}
      {...rest}
    >
      {children}
    </Text>
  );
}