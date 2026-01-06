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

export default function EmailSignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <Screen className="justify-center">
      <AppText variant="title" className="text-center mb-10">
        Create account
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
        <View
          className={clsx(
            "flex-row items-center bg-surface-sunken border border-border-default rounded-button px-4 py-3",
            passwordError ? "border-state-error" : "border-border-default"
          )}
        >
          <TextInput
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (passwordError) setPasswordError(null);
              if (confirmPasswordError) setConfirmPasswordError(null);
            }}
            placeholder="••••••••"
            placeholderTextColor={AppTheme.colors.action.secondary.text}
            secureTextEntry={!showPassword}
            textContentType="password"
            autoComplete="password"
            returnKeyType="next"
            className="flex-1 text-body text-text-primary"
          />

          <Pressable onPress={() => setShowPassword(v => !v)} hitSlop={10}>
            {showPassword ? (
              <EyeOff size={20} color={AppTheme.colors.action.secondary.text} />
            ) : (
              <Eye size={20} color={AppTheme.colors.action.secondary.text} />
            )}
          </Pressable>
        </View>

        {passwordError && (
          <AppText variant="caption" className="mt-1 text-state-error">
            {passwordError}
          </AppText>
        )}
      </View>

      <View className="mt-4">
        <AppText variant="small" className="mb-2">Confirm password</AppText>
        <View
          className={clsx(
            "flex-row items-center bg-surface-sunken border border-border-default rounded-button px-4 py-3",
            confirmPasswordError ? "border-state-error" : "border-border-default"
          )}
        >
          <TextInput
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              if (confirmPasswordError) setConfirmPasswordError(null);
            }}
            placeholder="••••••••"
            placeholderTextColor={AppTheme.colors.action.secondary.text}
            secureTextEntry={!showConfirmPassword}
            textContentType="password"
            autoComplete="password"
            returnKeyType="done"
            className="flex-1 text-body text-text-primary"
          />

          <Pressable onPress={() => setShowConfirmPassword(v => !v)} hitSlop={10}>
            {showConfirmPassword ? (
              <EyeOff size={20} color={AppTheme.colors.action.secondary.text} />
            ) : (
              <Eye size={20} color={AppTheme.colors.action.secondary.text} />
            )}
          </Pressable>
        </View>
        
        {confirmPasswordError && (
          <AppText variant="caption" className="mt-1 text-state-error">
            {confirmPasswordError}
          </AppText>
        )}
      </View>

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
    </Screen>
  );
}
