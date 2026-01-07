import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Stack, usePathname } from 'expo-router';

export default function AuthLayout() {
  const pathname = usePathname();
  const { sessionUser: user, loading } = useAuth();

  const isCallbackRoute = pathname.startsWith('/auth/callback');
  const isResetPasswordRoute = pathname === '/auth/reset-password';

  const isTransitional = isCallbackRoute || isResetPasswordRoute;

  if (loading && !isTransitional) {
    return <LoadingState text="Loading your profile..." />;
  }

  if (user && !isTransitional) {
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
      <Stack.Screen name="callback/[flow]" />
    </Stack>
  );
}
