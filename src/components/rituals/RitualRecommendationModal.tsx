import RecommendedRitualCard from '@/src/components/rituals/RecommendedRitualCard';
import { AppTheme } from "@/src/components/themes/AppTheme";
import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { ModalContainer } from '@/src/components/ui/ModalContainer';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { RecommendationStatus } from '@/src/models/enums';
import type { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from "@/src/store/useChatStore";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

type Props = {
  visible: boolean;
  ritualRecommendationId: string;
  ritualPack: RitualPack;
  closeRecommendationFlow: () => void;
};

export default function RitualRecommendationModal({ visible, ritualRecommendationId, ritualPack, closeRecommendationFlow }: Props) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();
  const { updateRecommendationAndHistoryStatus } = useRitualActions();

  const rituals = useMemo(() => {
    return ritualPack?.rituals || [];
  }, [ritualPack]);

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
    
    const skippedRitualIds = rituals
      .filter(ritual => !selected[ritual.id])
      .map(ritual => ritual.id);
    
    try {
      await updateRecommendationAndHistoryStatus(
        ritualRecommendationId,
        RecommendationStatus.Added,
        selectedIds,
        skippedRitualIds
      );
      Toast.show({
        type: "info", 
        text1: "Rituals added successfully",
      });
    } catch (error) {
      console.error('Failed to update recommendation and ritual statuses:', error);
      Toast.show({
        type: "error", 
        text1: "Failed to add rituals to current",
      });
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, selected, rituals, updateRecommendationAndHistoryStatus]);

  const handleCloseModal = useCallback(async () => {
    if (ritualRecommendationId) {
      try {
        await updateRecommendationAndHistoryStatus(
          ritualRecommendationId,
          RecommendationStatus.Viewed,
          [],
          []
        );
      } catch (error) {
        console.error('Failed to update recommendation statuses on close:', error);
      }
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, updateRecommendationAndHistoryStatus]);

  const handleDismiss = useCallback(async () => {
    if (ritualRecommendationId) {
      try {
        // Mark all rituals as skipped when modal is dismissed
        const allRitualIds = rituals.map(ritual => ritual.id);
        await updateRecommendationAndHistoryStatus(
          ritualRecommendationId,
          RecommendationStatus.Skipped,
          [],
          allRitualIds
        );
      } catch (error) {
        console.error('Failed to update recommendation and ritual statuses on dismiss:', error);
      }
    }
    closeRecommendationFlow();
  }, [ritualRecommendationId, rituals, updateRecommendationAndHistoryStatus]);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={handleCloseModal}
      presentationStyle="pageSheet"
      transparent
    >
      <ModalContainer>
        {/* Modal Header */}
        <View className="flex-row items-center px-4 pt-3 pb-2 border-b border-border">
          <Pressable onPress={handleCloseModal} className="py-2 mr-4">
            <MaterialIcons name="close" size={24} color={AppTheme.colors.text.primary} />
          </Pressable>
          <AppText variant="subtitle">
            {ritualPack.title || 'Ritual Pack'}
          </AppText>
        </View>

        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4 py-2">
              <RecommendedRitualCard 
                ritual={item} 
                selected={!!selected[item.id]}
                onPress={() => toggle(item.id)}
              />
            </View>
          )}
          ListHeaderComponent={
            <View className="px-4 pt-4 pb-2">
              <AppText variant="body" className="mb-2">
                {ritualPack.description}
              </AppText>
              <AppText variant="small" className="font-semibold">
                Pick {ritualPack.rituals?.length > 1 ? '1–' + ritualPack.rituals.length : '1'} ritual{ritualPack.rituals?.length !== 1 ? 's' : ''} to add to your current focus.
              </AppText>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom bar */}
        <SafeAreaView edges={['bottom']} className="absolute left-0 right-0 bottom-0 bg-surface-screen border-t border-border-strong">
          <View className="flex-row gap-4 px-4 pb-4 pt-4">
            <Button
              variant="secondary"
              onPress={handleDismiss}
              className="flex-1"
            >
              Dismiss
            </Button>
            <Button
              variant="primary"
              onPress={handleAdd}
              disabled={!canAdd}
              className="flex-1"
            >
              Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
            </Button>
          </View>
        </SafeAreaView>
      </ModalContainer>
    </Modal>
  );
}
