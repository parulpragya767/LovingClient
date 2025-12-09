import clsx from 'clsx';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';


export type AppTextVariant = 'title' | 'subtitle' | 'body' | 'small' | 'caption' | 'muted';

export type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  className?: string;
};

const baseClasses = 'font-sans text-text-primary';

const variantClasses: Record<AppTextVariant, string> = {
  title: 'text-title font-semibold',
  subtitle: 'text-subtitle font-medium',
  body: 'text-body',
  small: 'text-small',
  caption: 'text-caption',
  muted: 'text-body text-text-muted',
};

export function AppText({
  variant = 'body',
  className,
  style,
  children,
  ...rest
}: AppTextProps) {
  return (
    <Text
      className={clsx(baseClasses, variantClasses[variant], className)}
      style={style as TextStyle}
      {...rest}
    >
      {children}
    </Text>
  );
}