import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

const baseClasses = 'rounded-button py-3 px-4 items-center justify-center';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-action-primary-bg',
  secondary: 'bg-action-secondary-bg',
  ghost: 'bg-transparent',
};

const textClasses: Record<ButtonVariant, string> = {
  primary: 'text-action-primary-text',
  secondary: 'text-action-secondary-text',
  ghost: 'text-action-ghost-text',
};

const disabledClasses =
  'opacity-50';

export function Button({
  children,
  variant = 'primary',
  disabled,
  className,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        disabled && disabledClasses,
        className
      )}
      {...rest}
    >
      <AppText
        variant="body"
        className={clsx('font-medium', textClasses[variant])}
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
}