 import { AppTheme } from '@/src/components/themes/AppTheme';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { FormField } from '@/src/components/ui/FormField';
import { FormInput } from '@/src/components/ui/FormInput';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { resetPasswordForEmail } = useAuth();
  
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const onSendResetLink = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
      setEmailError('Enter your email');
      return;
    }
    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setEmailError('Enter a valid email address');
      return;
    }

    setLoading(true);
    const { error } = await resetPasswordForEmail({ email: normalizedEmail });
    setLoading(false);

    if (error) {
      Alert.alert('Request failed', error);
      return;
    }

    router.push('/auth/check-your-email');
  };

  return (
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-3">
        Reset password
      </AppText>
      <AppText variant="body" className="text-center mb-10">
        Enter your email and we'll send you a reset link.
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
          returnKeyType="done"
          onSubmitEditing={onSendResetLink}
          editable={!loading}
          hasError={!!emailError}
        />
      </FormField>

      <Button onPress={onSendResetLink} disabled={loading} className="mt-6">
        {loading ? <ActivityIndicator color={AppTheme.colors.action.primary.text} /> : 'Send reset link'}
      </Button>

      <Button variant="ghost" onPress={() => router.back()} className="mt-4">
        Back
      </Button>
    </Screen>
  );
}
