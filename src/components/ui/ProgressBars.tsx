import clsx from 'clsx';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export type ProgressBarsProps = {
  total: number;
  currentIndex: number;
  onPressStep?: (index: number) => void;
  className?: string;
};

export function ProgressBars({
  total,
  currentIndex,
  onPressStep,
  className,
}: ProgressBarsProps) {
  return (
    <View className={clsx('flex-row items-center gap-2', className)}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === currentIndex;
        const isCompleted = index < currentIndex;

        return (
          <TouchableOpacity
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            accessibilityRole="button"
            onPress={onPressStep ? () => onPressStep(index) : undefined}
            activeOpacity={0.8}
            className="flex-1"
          >
            <View
              className={clsx(
                'h-2 rounded-full',
                (isActive || isCompleted) ? 'bg-brand-primary' : 'bg-border'
              )}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
