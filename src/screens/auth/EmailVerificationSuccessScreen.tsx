import LoadingState from '@/src/components/states/LoadingState';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';

export default function EmailVerificationSuccessScreen() {
  const router = useRouter();
  const { loading: loadingAuthState, session } = useAuth();

  const sessionExists = !!session;

  useEffect(() => {
    if (loadingAuthState) return;

    if (sessionExists) {
      router.replace('/');
    }
  }, [loadingAuthState, sessionExists, router]);

  if (loadingAuthState) {
    return <LoadingState text="Verifying your account..." />;
  }

  if (sessionExists) {
    return <LoadingState text="Taking you to the app..." />;
  }

  return (
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-3">
        Email verified
      </AppText>
      <AppText variant="body" className="text-center mb-10">
        Your email has been verified. Log in to continue.
      </AppText>

      <Button onPress={() => router.replace('/auth/email-login')}>
        Go to Sign In
      </Button>
    </Screen>
  );
}
