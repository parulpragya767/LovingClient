import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';

export default function FatalErrorScreen() {
  const clearError = useAppErrorStore((s) => s.clearError);

  return (
    <HeaderlessScreen className="justify-center">
      <AppText className="text-center mb-6">
        Something unexpected went wrong. Please try again.
      </AppText>

      <Button variant="secondary" onPress={clearError}>
        Try Again
      </Button>
    </HeaderlessScreen>
  );
}
