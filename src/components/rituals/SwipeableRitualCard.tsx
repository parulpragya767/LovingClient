import { AppTheme } from "@/src/components/themes/AppTheme";
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { emojiToFeedback, RitualHistoryStatus } from '@/src/models/enums';
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
  const { markRitualAsCompleted, deleteRitualFromCurrent } = useRitualActions();

  const close = () => swipeableRef.current?.close?.();

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
      const feedback = emojiToFeedback(emoji);
      await markRitualAsCompleted.mutate({
        id: ritualHistoryId,
        payload: {
          status: RitualHistoryStatus.Completed,
          feedback,
        },
      });
    } finally {
      setEmojiVisible(false);
      close();
    }
  };

  const handleDeletePress = async () => {
    if (!ritualHistoryId) return;
    try {
      await deleteRitualFromCurrent.mutate(ritualHistoryId);
    } finally {
      close();
    }
  };

  const renderRightActions = (_: any, __: any) => (
    <Animated.View 
      entering={FadeInRight.duration(200)}
      className="flex-row items-center gap-2 m-2"
    >
      <Pressable 
        onPress={handleCompletePress}
        className="w-14 h-14 p-2 items-center justify-center bg-surface-sunken border border-border rounded-compactCard"
      >
        <MaterialIcons name="check" size={24} color={AppTheme.colors.state.success} />
      </Pressable>

      <Pressable 
        onPress={handleDeletePress}
        className="w-14 h-14 p-2 items-center justify-center bg-surface-sunken border border-border rounded-compactCard"
      >
        <MaterialIcons name="delete-outline" size={24} color={AppTheme.colors.state.error} />
      </Pressable>
    </Animated.View>
  );
  
  return (
    <View>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={2}
        rightThreshold={72}
        renderRightActions={renderRightActions}>
        <RitualCard ritual={ritual} />
      </ReanimatedSwipeable>

      <EmojiFeedbackModal
        visible={emojiVisible}
        onClose={handleEmojiModalDismiss}
        onSelectEmoji={handleEmojiSelect}
      />
    </View>
  );
}