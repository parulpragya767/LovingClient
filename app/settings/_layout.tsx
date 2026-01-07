import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack, useRouter } from 'expo-router';

export default function SettingsLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={DefaultHeaderOptions}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Settings',
          gestureEnabled: false,
          headerLeft: ({ tintColor }) => (
            <HeaderIconButton
              name="chevron-back"
              color={tintColor}
              onPress={() => router.back()}
            />
          ),
          ...DefaultHeaderOptions,
        }}
      />
    </Stack>
  );
}
