 import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, TextInput, View } from 'react-native';

export default function EmailSignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Missing info', 'Please enter email and password');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please confirm your password');
      return;
    }

    setLoading(true);
    const { error } = await signUp({ email: email.trim(), password });
    setLoading(false);

    if (error) {
      Alert.alert('Sign up failed', error);
      return;
    }

    router.replace('/auth/check-your-email');
  };

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <AppText variant="title" className="text-center mb-10">
          Create account
        </AppText>

        <View className="space-y-4">
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

          <View className="mt-4">
            <AppText variant="small" className="mb-2">Password</AppText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#9C8F8C"
              secureTextEntry
              className="bg-surface-base text-text-primary rounded-button px-4 py-3 border border-border-default"
            />
          </View>

          <View className="mt-4">
            <AppText variant="small" className="mb-2">Confirm password</AppText>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor="#9C8F8C"
              secureTextEntry
              className="bg-surface-base text-text-primary rounded-button px-4 py-3 border border-border-default"
            />
          </View>

          <Button
            onPress={onSignUp}
            disabled={loading}
            className="mt-6"
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              'Create Account'
            )}
          </Button>

          <Button
            variant="ghost"
            onPress={() => router.replace('/auth/login')}
            className="mt-4"
          >
            Already have an account? Sign in
          </Button>
        </View>
      </View>
    </Screen>
  );
}
