// src/components/states/LoadingState.tsx

import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import React from 'react';
import { ActivityIndicator } from 'react-native';

interface LoadingStateProps {
  text?: string;
  fullScreen?: boolean; // default: true
}

export default function LoadingState({
  text = "Loading...",
  fullScreen = true,
}: LoadingStateProps) {
  return (
    <ThemedView className={`items-center justify-center p-6 ${fullScreen ? "flex-1" : ""}`}>
      <ActivityIndicator size="large" />
      {text && (
        <ThemedText className="text-gray-600 mt-3">
          {text}
        </ThemedText>
      )}
    </ThemedView>
  );
}
