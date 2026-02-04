 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { useRouter } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function AuthEntryScreen() {
  const router = useRouter();

  return (
    <HeaderlessScreen className="justify-center">
      <AppText variant="title" className="text-center mb-3">
        Welcome to Loving
      </AppText>
      <AppText variant="body" className="text-center mb-10">
        A gentle space to build love, together.
      </AppText>

      {/* Add these social login options when ready
        <Button variant="secondary" onPress={() => router.push('/auth/email-signup')} className="mb-3">
          Continue with Apple
        </Button>

        <Button variant="secondary" onPress={() => router.push('/auth/email-signup')} className="mb-3">
          Continue with Google
        </Button> 
      */}

      <Button variant="secondary" onPress={() => router.push('/auth/email-signup')} className="mb-8">
        Continue with Email
      </Button>
    
      <View className="flex-row justify-center gap-3">
        <AppText variant="body">
          Already have an account?
        </AppText>
        <Button variant="ghost" onPress={() => router.push('/auth/email-login')} className="mb-3">
          Log in
        </Button>
      </View>
    </HeaderlessScreen>
  );
}
