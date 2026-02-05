import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function NetworkErrorScreen() {
  const clearError = useAppErrorStore((s) => s.clearError);
  const router = useRouter();

  const handleRetry = () => {
    clearError();
    router.replace('/');
  };

  return (
    <View className="flex-1 items-center justify-center bg-surface-screen p-6">
      <AppText className="text-center mb-4">
        {`We’re having trouble connecting right now.\nCheck your connection and try again.`}
      </AppText>

      <Button variant="secondary" onPress={handleRetry} activeOpacity={0.8}>
        Retry
      </Button>
    </View>
  );
}
