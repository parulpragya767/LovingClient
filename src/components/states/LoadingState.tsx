// src/components/states/LoadingState.tsx

import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingStateProps {
  text?: string;
  fullScreen?: boolean; // default: true
}

export default function LoadingState({
  text = "Loading...",
  fullScreen = true,
}: LoadingStateProps) {
  return (
    <View className={`items-center justify-center bg-surface-screen p-6 ${fullScreen ? "flex-1" : ""}`}>
      <ActivityIndicator size="large" />
      {text && (
        <AppText className="mt-3">
          {text}
        </AppText>
      )}
    </View>
  );
}
