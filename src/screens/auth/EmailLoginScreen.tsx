import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { DismissKeyboardScreen } from "@/src/components/ui/DismissKeyboardScreen";
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

export default function EmailLoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onLogin = async () => {
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
    }
    if (hasError) return;

    setLoading(true);

    const { error } = await signIn({
      email: normalizedEmail,
      password,
    });

    setLoading(false);

    if (error) {
      setPassword('');
      Alert.alert('Login failed', 'The email or password you entered is incorrect.');
    }
  };

  return (
    <HeaderlessScreen>
      <KeyboardSafeScreen>
        <DismissKeyboardScreen>
          <AuthBackButton />

          <View className="flex-1 justify-center">
            <AppText variant="title" className="text-center mb-10">
            Welcome to Loving
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
                }}
                placeholder="••••••••"
                returnKeyType="done"
                hasError={!!passwordError}
              />
            </FormField>

            <Button variant="ghost" onPress={() => router.push('/auth/forgot-password')} className="mt-3 self-end">
              Forgot password?
            </Button>

            <Button onPress={onLogin} disabled={loading} className="mt-6">
              {loading ? <ActivityIndicator color={AppTheme.colors.action.primary.text} /> : 'Sign In'}
            </Button>

            <View className="flex-row justify-center mt-4 gap-1">
              <AppText variant="body">
                New here?
              </AppText>
              <Button variant="ghost" onPress={() => router.push('/auth/email-signup')}>
                Create an account
              </Button>
            </View>
          </View>
        </DismissKeyboardScreen>
      </KeyboardSafeScreen>
    </HeaderlessScreen>
  );
}
