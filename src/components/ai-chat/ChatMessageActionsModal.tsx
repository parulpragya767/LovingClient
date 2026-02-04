import { AppText } from '@/src/components/ui/AppText';
import { useToast } from '@/src/hooks/ui/useToast';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';

export type ChatMessageActionsModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  messageContent: string;
  anchor?: { x: number; y: number } | null;
};

export function ChatMessageActionsModal({
  visible,
  onRequestClose,
  messageContent,
  anchor,
}: ChatMessageActionsModalProps) {
  const { showSuccess } = useToast();

  const handleCopy = async () => {
    if (!messageContent) return;

    await Clipboard.setStringAsync(messageContent);
    showSuccess('Message copied');
    onRequestClose();
  };

  if (!anchor) return null;

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      {/* Backdrop */}
      <Pressable className="flex-1" onPress={onRequestClose}>
        <View
          style={{
            position: "absolute",
            left: anchor.x,
            top: anchor.y + 8,
          }}
          className="bg-surface-elevated border border-border rounded-md shadow-card overflow-hidden"
        >
          <Pressable onPress={handleCopy} className="px-4 py-3">
            <AppText variant="small">Copy</AppText>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
