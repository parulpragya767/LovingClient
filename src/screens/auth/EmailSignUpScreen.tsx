 import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { FormField } from '@/src/components/ui/FormField';
import { FormInput } from '@/src/components/ui/FormInput';
import { HeaderlessScreen } from '@/src/components/ui/HeaderlessScreen';
import { KeyboardSafeScreen } from '@/src/components/ui/KeyboardSafeScreen';
import { AuthBackButton } from '@/src/components/ui/navigation/AuthBackButton';
import { PasswordInput } from '@/src/components/ui/PasswordInput';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, View } from 'react-native';

export default function EmailSignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSignUp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    let hasError = false;

    if (!normalizedEmail) {
      setEmailError('Enter your email');
      hasError = true;
    } else if (!EMAIL_REGEX.test(normalizedEmail)) {
      setEmailError('Enter a valid email address');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Enter your password');
      hasError = true;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm your password');
      hasError = true;
    } else if (password && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    const { error } = await signUp({ email: normalizedEmail, password });
    setLoading(false);

    if (error) {
      setPassword('');
      setConfirmPassword('');
      console.log(error);
      
      if (error.toLowerCase().includes('password')) {
        Alert.alert(
          'Password not accepted',
          'Please choose a stronger password.'
        );
      } else {
        Alert.alert(
          'Sign up failed',
          'Something went wrong. Please try again.'
        );
      }
      return;
    }

    router.replace('/auth/check-your-email');
  };

  return (
    <HeaderlessScreen>
      <KeyboardSafeScreen>
        <View className="flex-1">
          <AuthBackButton />

          <View className="flex-1 justify-center">
            <AppText variant="title" className="text-center mb-10">
              Create account
            </AppText>

            <FormField label="Email" error={emailError}>
              <FormInput
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (emailError) setEmailError(null);
                }}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                autoComplete="email"
                returnKeyType="next"
                hasError={!!emailError}
              />
            </FormField>

            <FormField label="Password" error={passwordError} className="mt-4">
              <PasswordInput
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (passwordError) setPasswordError(null);
                  if (confirmPasswordError) setConfirmPasswordError(null);
                }}
                placeholder="••••••••"
                returnKeyType="next"
                hasError={!!passwordError}
              />
            </FormField>

            <FormField label="Confirm password" error={confirmPasswordError} className="mt-4">
              <PasswordInput
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  if (confirmPasswordError) setConfirmPasswordError(null);
                }}
                placeholder="••••••••"
                returnKeyType="done"
                hasError={!!confirmPasswordError}
              />
            </FormField>

            <Button onPress={onSignUp} disabled={loading} className="mt-6">
              {loading ? <ActivityIndicator color={AppTheme.colors.action.primary.text} /> : 'Create Account'}
            </Button>

            <View className="flex-row justify-center mt-4 gap-1">
              <AppText variant="body">
                Already have an account?
              </AppText>
              <Button variant="ghost" onPress={() => router.push('/auth/email-login')}>
                Log in
              </Button>
            </View>
          </View>
        </View>
      </KeyboardSafeScreen>
    </HeaderlessScreen>
  );
}
