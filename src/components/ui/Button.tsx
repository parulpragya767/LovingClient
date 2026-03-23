import clsx from 'clsx';
import React, { useState } from 'react';
import { PressableProps } from 'react-native';
import { AnimatedPressable } from './AnimatedPressable';
import { AppText, AppTextVariant } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export type ButtonSize = 'normal' | 'small';

export type ButtonProps = PressableProps & {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const isDisabled = disabled || isProcessing;

  const handlePress = async (event: any) => {
    if (isDisabled || !onPress) return;

    setIsProcessing(true);
    try {
      await onPress(event);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      disabled={isDisabled}
      className={clsx(
        baseClasses,
        extraBaseClasses[variant],
        variantClasses[variant],
        isDisabled && 'opacity-50',
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
    </AnimatedPressable>
  );
}