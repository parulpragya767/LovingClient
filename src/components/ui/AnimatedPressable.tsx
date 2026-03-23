import { usePressScale } from '@/src/hooks/ui/usePressScale';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  scaleTo?: number;
  className?: string;
}

export function AnimatedPressable({ children, scaleTo, className, ...props }: AnimatedPressableProps) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(scaleTo);

  return (
    <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={animatedStyle} className={className}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
