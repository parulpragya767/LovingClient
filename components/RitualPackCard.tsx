import React, { useRef, useState, Fragment } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from './themed-text';
import RitualCard from './RitualCard';
import { Ritual } from '@/src/models/ritual';
import { RitualPack } from '@/src/types/data-model';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { userCurrentOverrides } from '@/src/services/userCurrentOverrides';
import EmojiFeedbackModal from './EmojiFeedbackModal';

type Props = {
  pack: RitualPack;
  ritualsById: Record<string, Ritual>;
  onRitualPress: (id: string) => void;
  onPressPack?: (id: string) => void;
};

export default function RitualPackCard({ pack, ritualsById, onRitualPress, onPressPack }: Props) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRitualId, setSelectedRitualId] = useState<string | null>(null);
  const swipeRefs = useRef<Record<string, Swipeable | null>>({});
  
  const rituals = pack.ritualIds
    .map(id => ritualsById[id])
    .filter((r): r is Ritual => Boolean(r))
    .filter(r => !userCurrentOverrides.isRemoved(r.id));

  const handleMarkCompleted = (id: string, emoji?: string) => {
    userCurrentOverrides.markCompleted(id, emoji);
  };

  const handleCompletePress = (id: string) => {
    setSelectedRitualId(id);
    setShowFeedbackModal(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedRitualId) {
      handleMarkCompleted(selectedRitualId, emoji);
      swipeRefs.current[selectedRitualId]?.close();
    }
  };

  return (
    <View className="mb-4 rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <Pressable onPress={() => onPressPack?.(pack.id)} className="px-4 pt-4 pb-2">
        <ThemedText className="text-base font-semibold text-gray-900">{pack.title}</ThemedText>
        {pack.description ? (
          <ThemedText className="text-sm text-gray-500 mt-1">{pack.description}</ThemedText>
        ) : null}
        {pack.tags?.length ? (
          <View className="flex-row flex-wrap mt-2">
            {pack.tags.map(tag => (
              <View key={tag} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-2">
                <ThemedText className="text-xs text-gray-600">{tag}</ThemedText>
              </View>
            ))}
          </View>
        ) : null}
      </Pressable>

      <View className="px-4 pb-4">
        {rituals.map(r => {
          const completed = userCurrentOverrides.isCompleted(r.id);

          const renderRightActions = () => (
            <View className="flex-row h-full items-stretch">
              <RectButton
                onPress={() => handleCompletePress(r.id)}
                style={{ justifyContent: 'center' }}
              >
                <View className="bg-green-100 h-full w-14 justify-center items-center">
                  <MaterialIcons name="check-circle" size={24} color="#15803D" />
                </View>
              </RectButton>
              <RectButton
                onPress={() => {
                  userCurrentOverrides.removeFromCurrent(r.id);
                }}
                style={{ justifyContent: 'center' }}
              >
                <View className="bg-rose-100 h-full w-14 justify-center items-center">
                  <MaterialIcons name="delete" size={24} color="#BE123C" />
                </View>
              </RectButton>
            </View>
          );

          return (
            <View key={r.id} className="mb-3">
              <Swipeable
                ref={(ref) => { swipeRefs.current[r.id] = ref; }}
                renderRightActions={renderRightActions}
                overshootRight={false}
              >
                <View className={completed ? 'opacity-60' : ''}>
                  <RitualCard 
                    ritual={r} 
                    onPress={() => onRitualPress(r.id)}
                    onLongPress={() => swipeRefs.current[r.id]?.openRight?.()}
                  />
                </View>
              </Swipeable>
            </View>
          );
        })}
      </View>
      
      <EmojiFeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSelectEmoji={handleEmojiSelect}
      />
    </View>
  );
}
