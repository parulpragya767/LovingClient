import { AppTheme } from '@/src/components/themes/AppTheme';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { FormInput, FormInputProps } from './FormInput';

export type PasswordInputProps = Omit<FormInputProps, 'right'>;

export function PasswordInput({
  hasError,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <FormInput
      secureTextEntry={!visible}
      textContentType='password'
      autoComplete='password'
      hasError={hasError}
      right={
        <Pressable onPress={() => setVisible(v => !v)} hitSlop={10}>
          {visible ? (
            <EyeOff size={20} color={AppTheme.colors.action.secondary.text} />
          ) : (
            <Eye size={20} color={AppTheme.colors.action.secondary.text} />
          )}
        </Pressable>
      }
      {...props}
    />
  );
}
