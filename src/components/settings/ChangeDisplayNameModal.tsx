import { AppTheme } from '@/src/components/themes/AppTheme';
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { FormInput } from '@/src/components/ui/FormInput';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

type ChangeDisplayNameModalProps = {
  visible: boolean;
  initialDisplayName: string;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (displayName: string) => void;
};

export function ChangeDisplayNameModal({
  visible,
  initialDisplayName,
  isSaving = false,
  onClose,
  onSave,
}: ChangeDisplayNameModalProps) {
  const [nameDraft, setNameDraft] = useState(initialDisplayName);

  useEffect(() => {
    if (visible) setNameDraft(initialDisplayName);
  }, [visible, initialDisplayName]);

  const trimmedName = useMemo(() => nameDraft.trim(), [nameDraft]);
  const isUnchanged = trimmedName === (initialDisplayName ?? '').trim();
  const canSave = trimmedName.length > 0 && !isUnchanged && !isSaving;

  const handleSave = () => {
    onSave(trimmedName);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable className="flex-1 bg-black/55 justify-center items-center" onPress={onClose}>
        <Pressable className="bg-surface-screen rounded-card px-4 py-4 w-5/6 border border-border shadow-card" onPress={() => {}}>
          <View className="flex-row justify-between items-center mb-6">
            <AppText variant="subtitle" className="font-semibold">
              Edit display name
            </AppText>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={20} hitSlop={16} color={AppTheme.colors.text.muted} />
            </Pressable>
          </View>

          <AppText variant="small" color="text-text-muted" className="mb-2">
            Display name
          </AppText>
          <FormInput
            value={nameDraft}
            onChangeText={setNameDraft}
            autoCapitalize="words"
            placeholder="Enter your name"
            returnKeyType="done"
            editable={!isSaving}
          />

          <View className="flex-row gap-3 mt-8">
            <Button onPress={onClose} variant="ghost" className="flex-1" disabled={isSaving}>
              Cancel
            </Button>
            <Button onPress={handleSave} variant="primary" className="flex-1" disabled={!canSave}>
              {isSaving ? 'Saving…' : 'Save'}
            </Button>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
