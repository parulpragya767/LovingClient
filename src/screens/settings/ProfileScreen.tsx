import { AppText } from '@/src/components/ui/AppText';
import { Screen } from '@/src/components/ui/Screen';
import { useAuth } from '@/src/context/AuthContext';
import { View } from 'react-native';

export default function ProfileScreen() {
  const { sessionUser } = useAuth();

  return (
    <Screen>
      <AppText variant="title" className="mb-6">
        Profile
      </AppText>

      <View className="mb-4">
        <AppText variant="subtitle">Email</AppText>
        <AppText variant="body" className="opacity-70">
          {sessionUser?.email ?? '—'}
        </AppText>
      </View>

      <View>
        <AppText variant="body" className="opacity-50">
          More profile options will be available soon.
        </AppText>
      </View>
    </Screen>
  );
}
