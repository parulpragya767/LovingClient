import clsx from 'clsx';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { AppText } from './AppText';

export type PrimaryButtonProps = PressableProps & {
  children: React.ReactNode;
  className?: string;
};

const baseClasses = 'bg-brand-primary rounded-button py-3 px-4 items-center';

export function PrimaryButton({ 
  children,
  className = '',
  onPress,
  ...rest 
}: PrimaryButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      className={clsx(baseClasses, className)} 
      {...rest}
    >
      <AppText variant="body" className="text-white font-medium">
        {children}
      </AppText>
    </Pressable>
  );
}