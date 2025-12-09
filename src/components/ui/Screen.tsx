import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

export type ScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const baseClasses = 'flex-1 bg-bg-screen px-6 py-4';

export function Screen({ 
  children,
  className }: ScreenProps) {
  return (
    <View className={clsx(baseClasses, className)}>
      {children}
    </View>
  );
}