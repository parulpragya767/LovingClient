import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';
import { View } from 'react-native';

export default function AuthErrorScreen() {
  const clearError = useAppErrorStore((s) => s.clearError);

  return (
    <View className="flex-1 items-center justify-center bg-surface-screen p-6">
      <AppText className="text-center mb-4">
        Your session is no longer valid. Please sign in again.
      </AppText>

      <Button variant="secondary" onPress={clearError} activeOpacity={0.8}>
        Continue
      </Button>
    </View>
  );
}
