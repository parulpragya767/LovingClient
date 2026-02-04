import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { useRouter } from 'expo-router';
import React from 'react';

export default function AuthErrorScreen() {
  const clearError = useAppErrorStore((s) => s.clearError);
  const router = useRouter();

  const handlePress = () => {
    clearError();
    router.replace('/auth');
  };

  return (
    <HeaderlessScreen className="justify-center">
      <AppText className="text-center mb-4">
        Your session is no longer valid. Please sign in again.
      </AppText>

      <Button variant="secondary" onPress={handlePress} activeOpacity={0.8}>
        Continue
      </Button>
    </HeaderlessScreen>
  );
}
