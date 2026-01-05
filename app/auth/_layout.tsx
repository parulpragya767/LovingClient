import LoadingState from '@/src/components/states/LoadingState';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { sessionUser: user, loading } = useAuth();

  if (loading) return <LoadingState text="Loading your profile..." />;

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="email-login" />
      <Stack.Screen name="email-signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="check-your-email" />
    </Stack>
  );
}
