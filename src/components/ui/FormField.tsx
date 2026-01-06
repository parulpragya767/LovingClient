import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

export type FormFieldProps = {
  label: string;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <View className={className}>
      <AppText variant="small" className="mb-2">
        {label}
      </AppText>
      
      {children}
      
      {error && (
        <AppText variant="caption" className="mt-1 text-state-error">
          {error}
        </AppText>
      )}
    </View>
  );
}
