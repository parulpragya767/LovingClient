// src/components/states/ErrorState.tsx

import { AppText } from '@/src/components/ui/AppText';
import React from 'react';
import { View } from 'react-native';
import { Button } from '../ui/Button';

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
      <View className={`items-center justify-center bg-surface-screen p-6 ${fullScreen ? "flex-1" : ""}`}>
      <AppText color="text-red-500" className="text-center mb-4">
        {message}
      </AppText>

      {onButtonPress && (
        <Button variant="secondary" onPress={onButtonPress} activeOpacity={0.8}>
          {buttonMessage}
        </Button>
      )}
    </View>
  );
}
