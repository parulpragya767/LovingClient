import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Stack, usePathname } from 'expo-router';

export default function AuthLayout() {
  const pathname = usePathname();
  const { sessionUser: user, loading } = useAuth();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (user && pathname !== '/auth/reset-password' && pathname !== '/auth/email-verify') {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="email-login" />
      <Stack.Screen name="email-signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="check-your-email" />
      <Stack.Screen name="email-verify" />
    </Stack>
  );
}
