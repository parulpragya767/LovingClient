import clsx from 'clsx';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export type HeaderlessScreenProps = {
  children: React.ReactNode;
  className?: string;
};

const baseClasses = 'flex-1 bg-surface-screen px-6 py-4';

export function HeaderlessScreen({ 
  children,
  className }: HeaderlessScreenProps) {
  return (
    <SafeAreaView className={clsx(baseClasses, className)}>
      {children}
    </SafeAreaView>
  );
}
