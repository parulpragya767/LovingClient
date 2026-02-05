import { useAuth } from '@/src/context/AuthContext';
import { router } from 'expo-router';
import React, { useState } from 'react';

import LoadingState from '@/src/components/states/LoadingState';
import { ConfirmationModal } from '@/src/components/ui/ConfirmationModal';
import { Screen } from '@/src/components/ui/Screen';
import SettingsItem from '@/src/components/ui/settings/SettingsItem';
import SettingsSection from '@/src/components/ui/settings/SettingsSection';
import { Alert, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    const { error } = await signOut();

    if(error) {
      Alert.alert('Logout failed', 'Something went wrong. Please try again.');
      setIsLoggingOut(false);
      return;
    }
    
    setIsLoggingOut(false);
    router.replace('/');
  };

  if (isLoggingOut) return <LoadingState text="Logging out..." />

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

        <SettingsSection title="Support">
          <SettingsItem
            label="Terms & Conditions"
            icon="document-text"
            onPress={() => router.push('/settings/terms')}
          />
          <SettingsItem
            label="Privacy Policy"
            icon="shield-checkmark"
            onPress={() => router.push('/settings/privacy')}
          />
          <SettingsItem
            label="About Us"
            icon="information-circle"
            onPress={() => router.push('/settings/about')}
          />
          <SettingsItem
            label="Get in touch"
            icon="mail"
            onPress={() => router.push('/settings/contact-us')}
            isLast
          />
        </SettingsSection>

        <SettingsSection title="Logout">
          <SettingsItem
            label="Log out"
            icon="log-out"
            onPress={() => setShowLogoutModal(true)}
          />
        </SettingsSection>
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="Log out"
        message="Are you sure you want to log out?"
        confirmText="Log out"
      />
    </Screen>
  );
}
