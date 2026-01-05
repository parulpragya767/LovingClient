 import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import clsx from "clsx";
import { useRouter } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, TextInput, View } from 'react-native';

export default function EmailLoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-10">
        Welcome to Loving
      </AppText>

      <View>
        <AppText variant="small" className="mb-2">Email</AppText>
        <TextInput
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (emailError) setEmailError(null);
          }}
          placeholder="you@example.com"
          placeholderTextColor={AppTheme.colors.action.secondary.text}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          autoComplete="email"
          returnKeyType="next"
          className={clsx(
            "bg-surface-sunken text-body text-text-primary rounded-button px-4 py-3 border",
            emailError ? "border-state-error" : "border-border-default"
          )}
        />
        {emailError && (
          <AppText variant="caption" className="mt-1 text-state-error">
            {emailError}
          </AppText>
        )}
      </View>

      <View className="mt-4">
        <AppText variant="small" className="mb-2">Password</AppText>
        <View className={clsx(
          "flex-row items-center bg-surface-sunken border border-border-default rounded-button px-4 py-3",
          passwordError ? "border-state-error" : "border-border-default"
        )}>
          <TextInput
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
            }}
            placeholder="••••••••"
            placeholderTextColor={AppTheme.colors.action.secondary.text}
            secureTextEntry={!showPassword}
            textContentType="password"
            autoComplete="password"
            returnKeyType="done"
            className="flex-1 text-body text-text-primary"
          />

          <Pressable onPress={() => setShowPassword(v => !v)} hitSlop={10}>
            {showPassword ? (
              <EyeOff size={20} color={AppTheme.colors.action.secondary.text}/>
            ) : (
              <Eye size={20} color={AppTheme.colors.action.secondary.text}/>
            )}
          </Pressable>
        </View>
        

        {passwordError && (
          <AppText variant="caption" className="mt-1 text-state-error">
            {passwordError}
          </AppText>
        )}
      </View>

      <Button variant="ghost" onPress={() => router.push('/auth/forgot-password')} className="mt-3 self-end">
        Forgot password?
      </Button>

      <Button onPress={onLogin} disabled={loading} className="mt-6">
        {loading ? <ActivityIndicator color={AppTheme.colors.action.primary.text} /> : 'Sign In'}
      </Button>

      <Button variant="ghost" onPress={() => router.push('/auth/email-signup')} className="mt-4">
        New here? Create an account
      </Button>
    </Screen>
  );
}
