import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';

import { Screen } from '@/src/components/ui/Screen';
import SettingsItem from '@/src/components/ui/settings/SettingsItem';
import SettingsSection from '@/src/components/ui/settings/SettingsSection';

export default function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <Screen>
      <SettingsSection title="Account">
        <SettingsItem
          label="Profile"
          icon="person"
          onPress={() => router.push('/settings/profile')}
          disabled
          hint="Coming soon"
        />

        <SettingsItem
          label="Love Preferences"
          icon="heart"
          disabled
          hint="Coming soon"
        />

        <SettingsItem
          label="Partner Information"
          icon="heart"
          disabled
          hint="Coming soon"
          isLast
        />
      </SettingsSection>

      <SettingsSection title="Privacy & Safety">
        <SettingsItem
          label="Privacy Settings"
          icon="shield"
          disabled
          hint="Coming soon"
          isLast
        />
      </SettingsSection>

      <SettingsSection title="Legal">
        <SettingsItem
          label="Terms & Conditions"
          icon="document-text"
          onPress={() => router.push('/settings/terms')}
        />
        <SettingsItem
          label="Privacy Policy"
          icon="document-text"
          onPress={() => router.push('/settings/privacy')}
          isLast
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsItem
          label="Log out"
          icon="log-out"
          onPress={signOut}
          isLast
        />
      </SettingsSection>
    </Screen>
  );
}
