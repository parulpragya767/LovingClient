import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { Screen } from '@/src/components/ui/Screen';
import SettingsItem from '@/src/components/ui/settings/SettingsItem';
import SettingsSection from '@/src/components/ui/settings/SettingsSection';
import { useAuth } from '@/src/context/AuthContext';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const { sessionUser } = useAuth();
  const router = useRouter();

  const email = sessionUser?.email ?? '—';
  const isEmailVerified = !!sessionUser?.email_confirmed_at;

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Identity */}
        <View className="mb-8">
          <AppText variant="subtitle" className="mb-3">
            Account
          </AppText>

          <Card className="bg-surface-sunken">
            <AppText variant="small" className="opacity-60 mb-1">Email</AppText>
            <AppText variant="body">{email}</AppText>

            <AppText variant="small" className="opacity-60 mb-1 mt-3">Email status</AppText>
            <AppText
              variant="body"
              className={isEmailVerified ? 'text-state-success' : 'text-state-warning'}
              >
                {isEmailVerified ? 'Verified' : 'Not verified'}
              </AppText>
          </Card>
        </View>

        {/* Security */}
        <View className="mb-8">
          <AppText variant="subtitle" className="mb-3">
            Security
          </AppText>

          <SettingsSection>
            <SettingsItem
              label="Change password"
              icon="key"
              onPress={() => router.push('/auth/reset-password')}
              isLast
            />
          </SettingsSection>
        </View>

        <View>
          <AppText variant="body" className="opacity-50">
            Your profile is intentionally simple for now.  
            More personal options will appear as you continue using Loving.
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

