import { HeaderIconButton } from '@/src/components/ui/navigation/HeaderIconButton';
import { DefaultHeaderOptions } from '@/src/components/ui/navigation/HeaderOptions';
import { Stack, useRouter } from 'expo-router';

export default function SettingsLayout() {
  const router = useRouter();
  const screenOptions = {
    ...DefaultHeaderOptions,
    headerLeft: (props: { tintColor?: string }) => (
      <HeaderIconButton
        name="chevron-back"
        color={props.tintColor}
        onPress={() => router.back()}
      />
    ),
    gestureEnabled: false
  } as const;

  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="profile" 
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen 
        name="subscription" 
        options={{
          title: 'Subscription',
        }}
      />
      <Stack.Screen 
        name="about" 
        options={{
          title: 'About Us',
        }}
      />
      <Stack.Screen 
        name="contact-us" 
        options={{
          title: 'Contact Us',
        }}
      />
      <Stack.Screen 
        name="privacy" 
        options={{
          title: 'Privacy Policy',
        }}
      />
      <Stack.Screen 
        name="terms" 
        options={{
          title: 'Terms of Service',
        }}
      />
    </Stack>
  );
}
