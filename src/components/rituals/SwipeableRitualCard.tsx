import { ThemedText } from '@/src/components/themes/themed-text';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { EmojiFeedback, RitualHistoryStatus } from '@/src/models/enums';
import { Ritual } from '@/src/models/rituals';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import EmojiFeedbackModal from './EmojiFeedbackModal';
import RitualCard from './RitualCard';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  ritual: Ritual;
  ritualHistoryId?: string;
  onRitualPress?: (id: string) => void;
  onChanged?: () => void;
};

function mapUnicodeToEmojiFeedback(emoji: string): EmojiFeedback | undefined {
  switch (emoji) {
    case '❤️':
      return EmojiFeedback.Heart;
    case '😊':
      return EmojiFeedback.Smile;
    case '😐':
      return EmojiFeedback.Neutral;
    case '😢':
      return EmojiFeedback.Sad;
    case '😠':
      return EmojiFeedback.Angry;
    case '🔥':
      return EmojiFeedback.Fire;
    case '👍':
      return EmojiFeedback.ThumbsUp;
    case '👎':
      return EmojiFeedback.ThumbsDown;
    default:
      return undefined;
  }
}

export default function SwipeableRitualCard({ ritual, ritualHistoryId, onChanged }: Props) {
  const swipeableRef = useRef<Swipeable>(null);
  const [showInlineActions, setShowInlineActions] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);
  const canAct = !!ritualHistoryId;

  const close = () => swipeableRef.current?.close();

  const handleLongPress = () => {
    setShowInlineActions(v => !v);
  };

  const handleCompletePress = () => {
    if (!canAct) return;
    setEmojiVisible(true);
  };

  const { markRitualAsCompleted, deleteRitualFromCurrent } = useRitualActions();

  const handleEmojiSelect = async (emoji: string) => {
    if (!ritualHistoryId) return;
    try {
      const feedback = mapUnicodeToEmojiFeedback(emoji);
      await markRitualAsCompleted(ritualHistoryId, {
        status: RitualHistoryStatus.Completed,
        feedback,
      });
      onChanged?.();
    } finally {
      setEmojiVisible(false);
      close();
      setShowInlineActions(false);
    }
  };

  const handleDelete = async () => {
    if (!ritualHistoryId) return;
    try {
      await deleteRitualFromCurrent(ritualHistoryId);
      onChanged?.();
    } finally {
      close();
      setShowInlineActions(false);
    }
  };

  const renderRightActions = (_: any, __: any) => (
    <View className="flex-row items-stretch my-2 mr-4">
      <Pressable onPress={handleCompletePress} className="bg-green-500 justify-center px-4 rounded-l-xl">
        <ThemedText className="text-white font-semibold">Complete</ThemedText>
      </Pressable>
      <Pressable onPress={handleDelete} className="bg-red-500 justify-center px-4 rounded-r-xl ml-px">
        <ThemedText className="text-white font-semibold">Delete</ThemedText>
      </Pressable>
    </View>
  );

  return (
    <View>
      <Swipeable
        ref={swipeableRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => setShowInlineActions(false)}
        containerStyle={{
          backgroundColor: 'transparent',
        }}
        overshootFriction={8}
      >
        <AnimatedView>
          <RitualCard ritual={ritual} onLongPress={handleLongPress} />
          {showInlineActions && (
            <View className="flex-row justify-end gap-2 px-6 -mt-2 mb-2">
              <Pressable onPress={handleCompletePress} className="bg-green-100 border border-green-200 rounded-lg px-3 py-1.5">
                <ThemedText className="text-green-700 text-sm font-medium">Mark completed</ThemedText>
              </Pressable>
              <Pressable onPress={handleDelete} className="bg-red-100 border border-red-200 rounded-lg px-3 py-1.5">
                <ThemedText className="text-red-700 text-sm font-medium">Delete</ThemedText>
              </Pressable>
            </View>
          )}
        </AnimatedView>
      </Swipeable>

      <EmojiFeedbackModal
        visible={emojiVisible}
        onClose={() => setEmojiVisible(false)}
        onSelectEmoji={handleEmojiSelect}
      />
    </View>
  );
}
