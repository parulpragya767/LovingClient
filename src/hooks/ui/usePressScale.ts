import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function usePressScale(scaleTo = 0.94) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(scaleTo, { duration: 90 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  return {
    animatedStyle,
    onPressIn,
    onPressOut,
  };
}
