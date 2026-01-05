 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function CheckYourEmailScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <AppText variant="title" className="text-center mb-3">
          Check your email
        </AppText>
        <AppText variant="body" color="text-text-secondary" className="text-center mb-10">
          If the address exists, you'll receive an email with next steps.
        </AppText>

        <Button
          onPress={() => router.replace('/auth/login')}
        >
          Back to Sign In
        </Button>

        <Button
          variant="ghost"
          onPress={() => router.back()}
          className="mt-4"
        >
          Go back
        </Button>
      </View>
    </Screen>
  );
}
