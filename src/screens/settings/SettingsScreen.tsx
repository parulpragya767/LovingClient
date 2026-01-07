import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';

import { Screen } from '@/src/components/ui/Screen';
import SettingsItem from '@/src/components/ui/settings/SettingsItem';
import SettingsSection from '@/src/components/ui/settings/SettingsSection';
import { ScrollView } from 'react-native';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SettingsSection title="Account">
          <SettingsItem
            label="Profile"
            icon="person"
            onPress={() => router.push('/settings/profile')}
            isLast
          />

          <SettingsItem
            label="Love Preferences"
            icon="heart"
            disabled
          />

          <SettingsItem
            label="Partner Information"
            icon="people"
            disabled
          />
        </SettingsSection>

        <SettingsSection title="Subscription">
          <SettingsItem
            label="Try Loving Premium"
            icon="star"
            onPress={() => router.push('/settings/subscription')}
            isLast
          />

          <SettingsItem
            label="Manage subscription"
            icon="card"
            disabled
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Preferences" disabled>
          <SettingsItem
            label="Privacy Settings"
            icon="shield"
            disabled
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsItem
            label="Terms & Conditions"
            icon="document-text"
            onPress={() => router.push('/settings/terms')}
          />
          <SettingsItem
            label="About Us"
            icon="information-circle"
            onPress={() => router.push('/settings/about')}
            disabled
          />
          <SettingsItem
            label="Frequently Asked Questions"
            icon="help-circle"
            disabled
          />
          <SettingsItem
            label="Privacy Policy"
            icon="shield-checkmark"
            onPress={() => router.push('/settings/privacy')}
          />
          <SettingsItem
            label="Get in touch"
            icon="mail"
            onPress={() => router.push('/settings/contact-us')}
            isLast
          />
          <SettingsItem
            label="Review"
            icon="star-outline"
            disabled
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Logout">
          <SettingsItem
            label="Log out"
            icon="log-out"
            onPress={signOut}
          />
          <SettingsItem
            label="Delete account"
            icon="trash"
            onPress={signOut}
            isLast
          />
        </SettingsSection>
      </ScrollView>
    </Screen>
  );
}
