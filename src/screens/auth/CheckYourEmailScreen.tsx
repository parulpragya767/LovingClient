 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function CheckYourEmailScreen() {
  const router = useRouter();

  return (
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-3">
        Check your email
      </AppText>
      <AppText variant="body" className="text-center mb-10">
        We’ve sent you a link. Open it to continue.
      </AppText>

      <Button onPress={() => router.replace('/auth/email-login')}>
        Back to Sign In
      </Button>

      <Button variant="ghost" onPress={() => router.back()} className="mt-4">
        Go back
      </Button>
    </Screen>
  );
}
