import RecommendedRitualCard from '@/src/components/rituals/RecommendedRitualCard';
import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { ModalContainer } from '@/src/components/ui/ModalContainer';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useToast } from '@/src/hooks/ui/useToast';
import { RecommendationStatus } from '@/src/models/enums';
import type { UserRitualPack } from '@/src/models/ritualHistory';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type RitualRecommendationModalProps = {
  visible: boolean;
  ritualRecommendationId: string;
  userRitualPack: UserRitualPack;
  chatSessionId: string | null;
  closeRecommendationFlow: () => void;
};

export default function RitualRecommendationModal({ 
  visible, 
  ritualRecommendationId, 
  userRitualPack, 
  chatSessionId, 
  closeRecommendationFlow 
}: RitualRecommendationModalProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const { updateRecommendationAndHistoryStatus } = useRitualActions();
  const { showSuccess, showError } = useToast();
  const insets = useSafeAreaInsets();

  const rituals = useMemo(() => {
    return userRitualPack?.rituals || [];
  }, [userRitualPack]);

  const toggle = (id: string) => {
    setSelected(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const selectedIds = useMemo(
    () => Object.keys(selected).filter(id => selected[id]),
    [selected]
  );

  const canAdd = selectedIds.length > 0;

  const handleAdd = useCallback(async () => {
    if (!canAdd || !ritualRecommendationId) return;
    
    const skippedRitualHistoryIds = rituals
      .filter(userRitual => !selected[userRitual.ritualHistoryId])
      .map(userRitual => userRitual.ritualHistoryId);
    
    try {
      await updateRecommendationAndHistoryStatus.mutateAsync({
        recommendationId: ritualRecommendationId,
        sessionId: chatSessionId,
        status: RecommendationStatus.Added,
        selectedRitualHistoryIds: selectedIds,
        skippedRitualHistoryIds: skippedRitualHistoryIds,
      });
      showSuccess("Added to your current rituals");
    } catch (error) {
      showError("Couldn’t add the rituals", "Please try again");
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, selected, rituals, updateRecommendationAndHistoryStatus, chatSessionId]);

  const handleCloseModal = useCallback(async () => {
    if (ritualRecommendationId) {
      try {
        await updateRecommendationAndHistoryStatus.mutateAsync({
          recommendationId: ritualRecommendationId,
          sessionId: chatSessionId,
          status: RecommendationStatus.Viewed,
          selectedRitualHistoryIds: [],
          skippedRitualHistoryIds: [],
        });
      } catch (error) {}
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, updateRecommendationAndHistoryStatus, chatSessionId]);

  const handleDismiss = useCallback(async () => {
    if (ritualRecommendationId) {
      try {
        // Mark all rituals as skipped when modal is dismissed
        const allRitualHistoryIds = rituals.map(userRitual => userRitual.ritualHistoryId);
        await updateRecommendationAndHistoryStatus.mutateAsync({
          recommendationId: ritualRecommendationId,
          sessionId: chatSessionId,
          status: RecommendationStatus.Skipped,
          selectedRitualHistoryIds: [],
          skippedRitualHistoryIds: allRitualHistoryIds,
        });
      } catch (error) {}
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, rituals, updateRecommendationAndHistoryStatus, chatSessionId]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={handleCloseModal}
      transparent
    >
      <ModalContainer onClose={handleCloseModal}>
          {/* Modal Header */}
        <View className="flex-row items-center p-4 border-b border-border">
          <Pressable onPress={handleCloseModal} hitSlop={12} className="mr-3">
            <MaterialIcons name="close" size={24} color={AppTheme.colors.text.primary} />
          </Pressable>

          <AppText variant="subtitle" numberOfLines={1} className="flex-1">
            {userRitualPack.ritualPack.title || 'Ritual Pack'}
          </AppText>
        </View>

        <FlatList
          data={rituals}
          keyExtractor={(item) => item.ritualHistoryId}
          renderItem={({ item }) => (
            <View className="px-4 py-2">
              <RecommendedRitualCard 
                ritual={item.ritual} 
                selected={!!selected[item.ritualHistoryId]}
                onPress={() => toggle(item.ritualHistoryId)}
              />
            </View>
          )}
          ListHeaderComponent={
            <View className="flex px-4 pt-4 pb-3 gap-2">
              <AppText variant="body">
                {userRitualPack.ritualPack.tagLine}
              </AppText>
              <AppText variant="small" className="font-semibold">
                Select rituals you'd like to practice next.
              </AppText>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 80 + insets.bottom }}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom bar */}
        <View className="flex-row gap-3 p-4 border-t border-border">
          <Button variant="secondary" onPress={handleDismiss} className="flex-1">
            Not now
          </Button>
          <Button variant="primary" onPress={handleAdd} disabled={!canAdd} className="flex-1">
            Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'}
          </Button>
        </View>
      </ModalContainer>
    </Modal>
  );
}
