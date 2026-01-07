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
          onPress={() => router.push('/settings/profile')}
          disabled
          hint="Coming soon"
        />

        <SettingsItem
          label="Love Preferences"
          disabled
          hint="Coming soon"
        />

        <SettingsItem
          label="Partner Information"
          disabled
          hint="Coming soon"
        />
      </SettingsSection>

      <SettingsSection title="Privacy & Safety">
        <SettingsItem
          label="Privacy Settings"
          disabled
          hint="Coming soon"
        />
      </SettingsSection>

      <SettingsSection title="Legal">
        <SettingsItem
          label="Terms & Conditions"
          onPress={() => router.push('/settings/terms')}
        />
        <SettingsItem
          label="Privacy Policy"
          onPress={() => router.push('/settings/privacy')}
        />
      </SettingsSection>

      <SettingsSection>
        <SettingsItem
          label="Log out"
          variant="destructive"
          onPress={signOut}
        />
      </SettingsSection>
    </Screen>
  );
}
