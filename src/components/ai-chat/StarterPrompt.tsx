import { AnimatedPressable } from '@/src/components/ui/AnimatedPressable';
import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { View } from 'react-native';

type StarterPromptProps = {
  prompt: string;
  onPress: (prompt: string) => void;
};

export function StarterPrompt({ prompt, onPress }: StarterPromptProps) {
  return (
    <AnimatedPressable onPress={() => onPress(prompt)} className="w-full">
      <View className="px-4 py-3 rounded-card bg-surface-sunken border border-border">
        <AppText>{prompt}</AppText>
      </View>
    </AnimatedPressable>
  );
}
