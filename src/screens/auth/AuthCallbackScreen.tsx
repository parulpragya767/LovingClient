import LoadingState from '@/src/components/states/LoadingState';
import { Screen } from '@/src/components/ui/Screen';
import { AuthBackButton } from '@/src/components/ui/navigation/AuthBackButton';
import { useAuth } from '@/src/context/AuthContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const { flow } = useLocalSearchParams<{ flow?: string }>();
  const { session, loading } = useAuth();

  const [message, setMessage] = useState('Verifying your account…');

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      /**
       * Supabase implicit flow:
       * detectSessionInUrl already parsed tokens
       * session will appear via AuthContext
       */
      if (loading) return;

      if (!session) {
        Alert.alert(
          'Verification failed',
          'This link may have expired. Please try again.'
        );
        router.replace('/auth/email-login');
        return;
      }

      if (cancelled) return;

      switch (flow) {
        case 'recovery':
          setMessage('You can now reset your password');
          setTimeout(() => {
            router.replace('/auth/reset-password');
          }, 1200);
          break;

        case 'signup':
        default:
          setMessage('Welcome! Taking you to the app…');
          setTimeout(() => {
            router.replace('/');
          }, 1200);
          break;
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [loading, session, flow, router]);

  return (
    <Screen>
      <AuthBackButton />

      <View className="flex-1 justify-center">
        <LoadingState text={message} />
      </View>
    </Screen>
  );
}
