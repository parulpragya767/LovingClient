// src/components/states/ErrorState.tsx

import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import React from 'react';
import { Pressable } from 'react-native';

interface ErrorStateProps {
  message?: string;
  buttonMessage?: string;
  onButtonPress?: () => void;
  fullScreen?: boolean; // default: true
}

export default function ErrorState({
  message = "Something went wrong.",
  buttonMessage = "Retry",
  onButtonPress,
  fullScreen = true,
}: ErrorStateProps) {

  return (
      <ThemedView className={`items-center justify-center p-6 ${fullScreen ? "flex-1" : ""}`}>
      <ThemedText className="text-red-500 text-center mb-4">
        {message}
      </ThemedText>

      {onButtonPress && (
        <Pressable
          onPress={onButtonPress}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <ThemedText className="text-white text-base">
            {buttonMessage}
          </ThemedText>
        </Pressable>
      )}
    </ThemedView>
  );
}
