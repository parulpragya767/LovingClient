import { ChangeDisplayNameModal } from '@/src/components/settings/ChangeDisplayNameModal';
import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import { Screen } from '@/src/components/ui/Screen';
import SettingsItem from '@/src/components/ui/settings/SettingsItem';
import SettingsSection from '@/src/components/ui/settings/SettingsSection';
import { useAuth } from '@/src/context/AuthContext';
import { useToast } from '@/src/hooks/ui/useToast';
import { useUserActions } from '@/src/hooks/user/useUserActions';
import { useUserStore } from '@/src/store/useUserStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const { sessionUser } = useAuth();
  const router = useRouter();
  const { showSuccess, showError } = useToast();

  const email = sessionUser?.email ?? '—';
  const isEmailVerified = !!sessionUser?.email_confirmed_at;
  const displayName = useUserStore(s => s.displayName);
  const { updateDisplayName } = useUserActions();

  const [isNameModalVisible, setIsNameModalVisible] = useState(false);

  const handleSaveDisplayName = (nextDisplayName: string) => {
    updateDisplayName.mutate(nextDisplayName, {
      onSuccess: () => {
        showSuccess('Saved', 'Your display name has been updated.');
        setIsNameModalVisible(false);
      },
      onError: () => {
        showError('Update failed', 'Something went wrong. Please try again.');
      },
    });
  };

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>

        <ChangeDisplayNameModal
          visible={isNameModalVisible}
          initialDisplayName={displayName ?? ''}
          isSaving={updateDisplayName.isPending}
          onClose={() => setIsNameModalVisible(false)}
          onSave={handleSaveDisplayName}
        />

        {/* Identity */}
        <View className="mb-8">
          <AppText variant="subtitle" className="mb-3">
            Account
          </AppText>

          <Card className="bg-surface-sunken">
            {/* Display name row */}
            <Pressable className="py-2" onPress={() => setIsNameModalVisible(true)} disabled={updateDisplayName.isPending}>
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <AppText variant="small" color="text-text-muted" className="mb-1">Display name</AppText>
                  <AppText variant="body">{displayName?.trim() ? displayName : '—'}</AppText>
                </View>
                <MaterialIcons name="edit" size={18} color={AppTheme.colors.text.muted} />
              </View>
            </Pressable>

            <AppText variant="small" color="text-text-muted" className="mb-1 mt-3">Email</AppText>
            <AppText variant="body">{email}</AppText>

            <AppText variant="small" color="text-text-muted" className="mb-1 mt-3">Email status</AppText>
            <AppText variant="body" color={isEmailVerified ? 'text-state-success' : 'text-state-warning'}>
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
          <AppText variant="small" color="text-text-muted">
            Your profile is intentionally simple for now.  
            More personal options will appear as you continue using Loving.
          </AppText>
        </View>
      </ScrollView>
    </Screen>
  );
}

