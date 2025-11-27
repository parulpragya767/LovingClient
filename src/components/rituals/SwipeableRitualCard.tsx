import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { RitualHistoryStatus } from '@/src/models/enums';
import { Ritual } from '@/src/models/rituals';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeInRight } from 'react-native-reanimated';
import EmojiFeedbackModal from './EmojiFeedbackModal';
import RitualCard from './RitualCard';

type SwipeableRitualCardProps = {
  ritual: Ritual;
  ritualHistoryId?: string;
};

export default function SwipeableRitualCard({ ritual, ritualHistoryId}: SwipeableRitualCardProps) {
  const swipeableRef = useRef<any>(null);
  const canAct = !!ritualHistoryId;
  const [emojiVisible, setEmojiVisible] = useState(false);
  const { invalidateQueries: invalidateCurrentRituals } = useCurrentRituals();
  const { markRitualAsCompleted, deleteRitualFromCurrent, mapUnicodeToEmojiFeedback } = useRitualActions();

  const close = () => swipeableRef.current?.close?.();

  const handleLongPress = () => {
    swipeableRef.current?.openRight?.();
  };

  const handleCompletePress = () => {
    if (!canAct) return;
    setEmojiVisible(true);
  };

  const handleEmojiModalDismiss = () => {
    setEmojiVisible(false);
    close();
  };

  const handleEmojiSelect = async (emoji: string) => {
    if (!ritualHistoryId) return;
    try {
      const feedback = mapUnicodeToEmojiFeedback(emoji);
      await markRitualAsCompleted(ritualHistoryId, {
        status: RitualHistoryStatus.Completed,
        feedback,
      });
      invalidateCurrentRituals();
    } finally {
      setEmojiVisible(false);
      close();
    }
  };

  const handleDeletePress = async () => {
    if (!ritualHistoryId) return;
    try {
      await deleteRitualFromCurrent(ritualHistoryId);
      invalidateCurrentRituals();
    } finally {
      close();
    }
  };

  const renderRightActions = (_: any, __: any) => (
    <Animated.View 
      entering={FadeInRight.duration(150)}
      className="flex-row items-center my-2 mx-2"
    >
      <Pressable 
        onPress={handleCompletePress}
        className="bg-green-100 border border-green-200 rounded-lg p-2 mr-1"
        style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}
      >
        <MaterialIcons name="check" size={24} color="#15803d" />
      </Pressable>

      <Pressable 
        onPress={handleDeletePress}
        className="bg-red-100 border border-red-200 rounded-lg p-2"
        style={{ width: 36, height: 36, justifyContent: 'center', alignItems: 'center' }}
      >
        <MaterialIcons name="delete-outline" size={24} color="#b91c1c" />
      </Pressable>
    </Animated.View>
  );
  
  return (
    <View>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={1}
        rightThreshold={40}
        renderRightActions={renderRightActions}>
        <RitualCard ritual={ritual} onLongPress={handleLongPress} />
      </ReanimatedSwipeable>

      <EmojiFeedbackModal
        visible={emojiVisible}
        onClose={handleEmojiModalDismiss}
        onSelectEmoji={handleEmojiSelect}
      />
    </View>
  );
}