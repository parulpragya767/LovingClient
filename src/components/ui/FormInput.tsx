import { AppTheme } from '@/src/components/themes/AppTheme';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

export type FormInputProps = TextInputProps & {
  hasError?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  rightElement?: React.ReactNode;
};

export const FormInput = forwardRef<React.ElementRef<typeof TextInput>, FormInputProps>(({
  hasError,
  containerClassName,
  inputClassName,
  rightElement,
  placeholderTextColor = AppTheme.colors.text.muted,
  style,
  ...props
}, ref) => {
  return (
    <View
      className={clsx(
        'flex-row items-center h-10 bg-surface-sunken border rounded-button px-4',
        hasError ? 'border-state-error' : 'border-border',
        containerClassName
      )}
    >
      <TextInput
        ref={ref}
        placeholderTextColor={placeholderTextColor}
        className={clsx('flex-1 text-body text-text-primary', inputClassName)}
        style={style}
        {...props}
      />
      {rightElement}
    </View>
  );
});
