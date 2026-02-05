import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import { useRouter } from 'expo-router';
import React from 'react';

export default function FatalErrorScreen() {
  const clearError = useAppErrorStore((s) => s.clearError);
  const router = useRouter();

  const handleRetry = () => {
    clearError();
    router.replace('/');
  };

  return (
    <HeaderlessScreen className="justify-center">
      <AppText className="text-center mb-6">
        Something unexpected went wrong. Please try again.
      </AppText>

      <Button variant="secondary" onPress={handleRetry}>
        Try Again
      </Button>
    </HeaderlessScreen>
  );
}
