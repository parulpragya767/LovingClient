import { Button } from '@/src/components/ui/Button';
import { Screen } from '@/src/components/ui/Screen';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack, useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
    <Stack.Screen 
      options={{
        title: 'Oops! Not Found',
        gestureEnabled: false,
        ...DefaultHeaderOptions,
      }}
    />
      <Screen className="flex-1 items-center justify-center">
        <Button onPress={() => router.replace('/')}>
          Go back to Home!
        </Button>
      </Screen>
    </>
  );
}
