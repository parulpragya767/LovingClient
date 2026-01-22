 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { AuthBackButton } from '@/src/components/ui/navigation/AuthBackButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function CheckYourEmailScreen() {
  const router = useRouter();

  return (
    <HeaderlessScreen>
      <AuthBackButton />

      <View className="flex-1 justify-center">
        <AppText variant="title" className="text-center mb-3">
          Check your email
        </AppText>
        <AppText variant="body" className="text-center mb-10">
          We’ve sent you a link. Open it to continue.
        </AppText>

        <Button onPress={() => router.replace('/auth/email-login')}>
          Back to Sign In
        </Button>
      </View>
    </HeaderlessScreen>
  );
}
