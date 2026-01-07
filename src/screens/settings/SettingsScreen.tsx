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

      <SettingsSection title="Subscription">
        <SettingsItem
          label="Try Loving Premium"
          icon="person"
          onPress={() => router.push('/settings/profile')}
        />

        <SettingsItem
          label="Manage subscription"
          icon="heart"
          disabled
          hint="Coming soon"
        />
      </SettingsSection>

      <SettingsSection title="Preferences">
        <SettingsItem
          label="Privacy Settings"
          icon="shield"
          disabled
          hint="Coming soon"
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
          icon="document-text"
          onPress={() => router.push('/settings/about')}
          isLast
        />
        <SettingsItem
          label="Frequently Asked Questions"
          icon="document-text"
          onPress={() => router.push('/settings/faqs')}
          isLast
        />
        <SettingsItem
          label="Privacy Policy"
          icon="document-text"
          onPress={() => router.push('/settings/privacy')}
          isLast
        />
        <SettingsItem
          label="Get in touch"
          icon="document-text"
          onPress={() => router.push('/settings/contact-us')}
          isLast
        />
        <SettingsItem
          label="Review"
          icon="document-text"
          onPress={() => router.push('/settings/review')}
          isLast
        />
      </SettingsSection>

      <SettingsSection title="Logout">
        <SettingsItem
          label="Log out"
          icon="log-out"
          onPress={signOut}
          isLast
        />
        <SettingsItem
          label="Delete account"
          icon="log-out"
          onPress={signOut}
          isLast
        />
      </SettingsSection>
    </Screen>
  );
}
