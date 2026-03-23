import { usePressScale } from '@/src/hooks/ui/usePressScale';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import Animated from 'react-native-reanimated';

interface AnimatedPressableProps extends PressableProps {
  children: React.ReactNode;
  scaleTo?: number;
}

export function AnimatedPressable({ children, scaleTo, ...props }: AnimatedPressableProps) {
  const { animatedStyle, onPressIn, onPressOut } = usePressScale(scaleTo);

  return (
    <Pressable {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
}
