 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSendResetLink = async () => {
    if (!email) {
      Alert.alert('Missing info', 'Please enter your email');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);

    if (error) {
      Alert.alert('Request failed', error.message);
      return;
    }

    router.push('/auth/check-your-email');
  };

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <AppText variant="title" className="text-center mb-3">
          Reset password
        </AppText>
        <AppText variant="body" color="text-text-secondary" className="text-center mb-10">
          Enter your email and we'll send you a reset link.
        </AppText>

        <View>
          <AppText variant="small" className="mb-2">Email</AppText>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor="#9C8F8C"
            keyboardType="email-address"
            autoCapitalize="none"
            className="bg-surface-base text-text-primary rounded-button px-4 py-3 border border-border-default"
          />
        </View>

        <Button
          onPress={onSendResetLink}
          disabled={loading}
          className="mt-6"
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            'Send reset link'
          )}
        </Button>

        <Button
          variant="ghost"
          onPress={() => router.back()}
          className="mt-4"
        >
          Back
        </Button>
      </View>
    </Screen>
  );
}
