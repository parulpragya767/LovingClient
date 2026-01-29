import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';

export type CardProps = {
  children: React.ReactNode;
  className?: string;
  color?: string;
};

const baseClasses = 'rounded-card p-4 shadow-card';

export function Card({ 
  children,
  className,
  color = 'bg-surface-elevated'
}: CardProps) {
  return (
    <View className={clsx(baseClasses, color, className)}>
      {children}
    </View>
  );
}