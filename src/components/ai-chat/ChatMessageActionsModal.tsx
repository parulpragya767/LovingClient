import { AppText } from '@/src/components/ui/AppText';
import { useToast } from '@/src/hooks/ui/useToast';
import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Modal, Pressable, View } from 'react-native';

export type ChatMessageActionsModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  messageContent: string;
  anchor?: { x: number; y: number; width: number; height: number } | null;
};

export function ChatMessageActionsModal({
  visible,
  onRequestClose,
  messageContent,
  anchor,
}: ChatMessageActionsModalProps) {
  const { showSuccess } = useToast();
  const left = anchor?.x ?? 0;
  const top = anchor ? anchor.y + anchor.height + 6 : 0;
  const width = anchor?.width ?? 140;

  const handleCopy = async () => {
    if (!messageContent) return;

    await Clipboard.setStringAsync(messageContent);
    showSuccess('Message copied');
    onRequestClose();
  };

  return (
    <Modal 
      transparent 
      visible={visible} 
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <Pressable className="flex-1" onPress={onRequestClose}>
        <Pressable onPress={() => {}}>
          <View
            style={{
              position: 'absolute',
              left,
              top,
              width,
            }}
            className="bg-surface-elevated border border-border rounded-md shadow-card overflow-hidden"
          >
            <Pressable onPress={handleCopy} className="px-4 py-3">
              <AppText variant="small">Copy</AppText>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
