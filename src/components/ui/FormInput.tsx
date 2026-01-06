import { AppTheme } from '@/src/components/themes/AppTheme';
import clsx from 'clsx';
import React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

export type FormInputProps = TextInputProps & {
  hasError?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  right?: React.ReactNode;
};

export function FormInput({
  hasError,
  containerClassName,
  inputClassName,
  right,
  placeholderTextColor = AppTheme.colors.action.secondary.text,
  style,
  ...props
}: FormInputProps) {
  return (
    <View
      className={clsx(
        'flex-row items-center bg-surface-sunken border rounded-button px-4 py-3',
        hasError ? 'border-state-error' : 'border-border-default',
        containerClassName
      )}
    >
      <TextInput
        placeholderTextColor={placeholderTextColor}
        className={clsx('flex-1 text-body text-text-primary', inputClassName)}
        {...props}
      />
      {right}
    </View>
  );
}
