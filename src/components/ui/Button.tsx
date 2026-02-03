import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AppText, AppTextVariant } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'normal' | 'small';

export type ButtonProps = TouchableOpacityProps & {
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

const baseClasses = 'flex-row items-center justify-center gap-2';

const extraBaseClasses: Record<ButtonVariant, string> = {
  primary: 'rounded-button py-3 px-4',
  secondary: 'rounded-button py-3 px-4',
  ghost: '',
};

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

const textVariantClasses: Record<ButtonSize, AppTextVariant> = {
  normal: 'body',
  small: 'small',
};

const disabledClasses =
  'opacity-50';

export function Button({
  children,
  icon,
  variant = 'primary',
  size = 'normal',
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
        extraBaseClasses[variant],
        variantClasses[variant],
        disabled && disabledClasses,
        className
      )}
      {...rest}
    >
      {icon}
      <AppText
        variant={textVariantClasses[size]}
        color={textClasses[variant]}
        className="font-medium"
      >
        {children}
      </AppText>
    </TouchableOpacity>
  );
}