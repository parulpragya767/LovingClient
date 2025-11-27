import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type EmojiFeedbackModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
};

export default function EmojiFeedbackModal({ visible, onClose, onSelectEmoji }: EmojiFeedbackModalProps) {
  const { EMOJIS } = useRitualActions();
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiPress = (emoji: string) => {
    setSelectedEmoji(emoji);
    setTimeout(() => {
      onSelectEmoji(emoji);
      onClose();
    }, 300);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={onClose}
      >
        <ThemedView className="bg-white rounded-2xl p-6 mx-4 w-5/6">
          <View className="flex-row justify-between items-center mb-6">
            <ThemedText className="text-lg font-semibold">
              How did this ritual feel?
            </ThemedText>
            <Pressable onPress={onClose} className="p-2 -mr-2">
              <MaterialIcons name="close" size={24} color="#6B7280" />
            </Pressable>
          </View>
          <View className="flex-row flex-wrap justify-start mb-10">
            {EMOJIS.map((emoji) => (
              <Pressable
                key={emoji}
                onPress={() => handleEmojiPress(emoji)}
                className={`p-3 rounded-lg ${selectedEmoji === emoji ? 'bg-gray-100' : ''}`}
              >
                <Text className="text-3xl">{emoji}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            onPress={onClose}
            className="py-3 px-6 bg-gray-100 rounded-xl items-center"
          >
            <ThemedText className="text-gray-700 font-medium">Cancel</ThemedText>
          </Pressable>
        </ThemedView>
      </Pressable>
    </Modal>
  );
}

