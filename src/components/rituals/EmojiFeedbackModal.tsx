import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from "@/src/components/ui/Button";
import { FEEDBACK_CONFIG } from '@/src/models/enums';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';

type EmojiFeedbackModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
  onSkip?: () => void;
};

export default function EmojiFeedbackModal({ visible, onClose, onSelectEmoji, onSkip }: EmojiFeedbackModalProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);

    setTimeout(() => {
      onSelectEmoji(emoji);
      onClose();
    }, 250);
  };

  const handleSkip = () => {
    onSkip?.();
    onClose();
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 bg-black/55 justify-center items-center"
        onPress={onClose}
      >
        <View className="bg-surface-screen rounded-card p-6 w-5/6 border border-border shadow-card">
          <View className="flex-row justify-between items-center mb-6">
            <AppText variant="body" className="font-semibold">
              How did this ritual feel?
            </AppText>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color={AppTheme.colors.text.muted} />
            </Pressable>
          </View>
          <View className="flex-row flex-wrap justify-start gap-2 mb-10">
            {Object.values(FEEDBACK_CONFIG).map((emoji) => (
              <Pressable
                key={emoji}
                onPress={() => handleEmojiPress(emoji)}
                className={clsx(
                  'w-14 h-14 rounded-xl items-center justify-center',
                  selectedEmoji === emoji
                    ? 'bg-brand-primary/30 border border-strong'
                    : 'bg-surface-sunken'
                )}
              >
                <AppText variant="title">{emoji}</AppText>
              </Pressable>
            ))}
          </View>
          <Button onPress={handleSkip} variant="ghost">
            Skip for now
          </Button>
        </View>
      </Pressable>
    </Modal>
  );
}

