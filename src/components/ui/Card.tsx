import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const baseClasses = 'bg-bg-card rounded-card p-4 shadow-card';

export function Card({ 
  children,
  className 
}: CardProps) {
  return (
    <View className={clsx(baseClasses, className)}>
      {children}
    </View>
  );
}