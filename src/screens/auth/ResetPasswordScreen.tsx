import { AppTheme } from '@/src/components/themes/AppTheme';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { FormField } from '@/src/components/ui/FormField';
import { PasswordInput } from '@/src/components/ui/PasswordInput';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { updateUser, signOut, establishSession } = useAuth();
  const params = useLocalSearchParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.code) return;

    const fetchSession = async () => {
      const { error } = await establishSession({ authCode: params.code as string });

      if (error) {
        Alert.alert(
          'Link expired',
          'Please request a new password reset.'
        );
      }
    };

    fetchSession();
  }, [params.code]);

  const onResetPassword = async () => {
    let hasError = false;

    if (!password) {
      setPasswordError('Enter your new password');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm your new password');
      hasError = true;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    const { error } = await updateUser({ password });

    if (error) {
      setLoading(false);
      console.log('Error updating user', error);
      Alert.alert('Password reset failed', 'Something went wrong. Please try again.');
      return;
    }

    await signOut();
    setLoading(false);

    console.log('Password updated');
    Alert.alert('Password updated', 'Please log in with your new password.');
    router.replace('/auth/email-login');
  };

  return (
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-3">
        Set a new password
      </AppText>
      <AppText variant="body" className="text-center mb-10">
        Choose a strong password you haven’t used before.
      </AppText>

      <FormField label="New password" error={passwordError}>
        <PasswordInput
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (passwordError) setPasswordError(null);
            if (confirmPasswordError) setConfirmPasswordError(null);
          }}
          placeholder="••••••••"
          returnKeyType="next"
          editable={!loading}
          hasError={!!passwordError}
        />
      </FormField>

      <FormField label="Confirm new password" error={confirmPasswordError} className="mt-4">
        <PasswordInput
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
            if (confirmPasswordError) setConfirmPasswordError(null);
          }}
          placeholder="••••••••"
          returnKeyType="done"
          editable={!loading}
          hasError={!!confirmPasswordError}
          onSubmitEditing={onResetPassword}
        />
      </FormField>

      <Button onPress={onResetPassword} disabled={loading} className="mt-6">
        {loading ? <ActivityIndicator color={AppTheme.colors.action.primary.text} /> : 'Update password'}
      </Button>

      <Button variant="ghost" onPress={() => router.back()} className="mt-4">
        Back
      </Button>
    </Screen>
  );
}
