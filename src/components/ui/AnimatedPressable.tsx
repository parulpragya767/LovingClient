import { usePressScale } from '@/src/hooks/ui/usePressScale';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  scaleTo?: number;
  containerClassName?: string; // layout (flex, width, etc.)
  contentClassName?: string; // visual (rounded, overflow, aspect, etc.)
}

export function AnimatedPressable({ children, scaleTo, containerClassName, contentClassName, ...props }: AnimatedPressableProps) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(scaleTo);

  return (
    <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut} className={containerClassName}>
      <Animated.View style={animatedStyle} className={contentClassName}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
