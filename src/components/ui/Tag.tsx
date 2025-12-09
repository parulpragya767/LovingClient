import clsx from 'clsx';
import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';

export type TagProps = {
  children: React.ReactNode;
  className?: string;
};

const baseClasses = 'px-3 py-1 rounded-pill bg-tag-bg inline-flex items-center';

export function Tag({ 
  children, 
  className }: TagProps) {
  return (
    <View className={clsx(baseClasses, className)}>
      <AppText variant="small" className="text-tag-text">
        {children}
      </AppText>
    </View>
  );
}