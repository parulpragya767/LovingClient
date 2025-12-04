import RecommendedRitualCard from '@/src/components/rituals/RecommendedRitualCard';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { ThemedText } from '@/src/components/themes/themed-text';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { RecommendationStatus } from '@/src/models/enums';
import { useChatStore } from "@/src/store/useChatStore";
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";

export default function RitualRecommendationModal() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const ritualRecommendationId = useChatStore((s) => s.ritualRecommendationId);
  const isModalVisible = useChatStore((s) => s.isRitualRecommendationModalVisible);
  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();

  const { data: recommendation, isLoading: isLoadingRecommendation, error: recommendationError } = useRitualRecommendation(ritualRecommendationId ?? '');
  const { data: ritualPack, isLoading: isLoadingRitualPack, error: ritualPackError } = useRitualPack(recommendation?.ritualPackId);
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

  const refreshRecommendationModalStates = () => {
    setIsRitualRecommendationModalVisible(false);
    setRitualRecommendationId(null);
  };

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
    refreshRecommendationModalStates();
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
    refreshRecommendationModalStates();
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
    refreshRecommendationModalStates();
  }, [ritualRecommendationId, rituals, updateRecommendationAndHistoryStatus]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}
      presentationStyle="pageSheet"
    >
      {(isLoadingRecommendation || isLoadingRitualPack) ? (
        <LoadingState text="Loading recommendation..." />
      ) : (recommendationError || ritualPackError ||!recommendation || !ritualPack) ? (
        <ErrorState message="Recommendation not found." />
      ) : (
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom', 'left', 'right']}>
        {/* Modal Header */}
        <View className="flex-row items-center px-4 pt-3 pb-2 border-b border-gray-200">
          <Pressable onPress={handleCloseModal} className="py-2 mr-4">
            <MaterialIcons name="close" size={24} color="#4B5563" />
          </Pressable>
          <ThemedText className="text-base font-semibold text-gray-900">
            {ritualPack.title || 'Ritual Pack'}
          </ThemedText>
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
              <ThemedText className="text-md text-gray-900 mb-2">
                {ritualPack.description}
              </ThemedText>
              <ThemedText className="text-sm text-gray-600 font-semibold">
                Pick {ritualPack.rituals?.length > 1 ? '1–' + ritualPack.rituals.length : '1'} ritual{ritualPack.rituals?.length !== 1 ? 's' : ''} to add to your current focus.
              </ThemedText>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom bar */}
        <SafeAreaView edges={['bottom']} className="absolute left-0 right-0 bottom-0 bg-gray-100 shadow-md shadow-black/5 border-t border-gray-200">
          <View className="flex-row gap-4 px-4 pb-4 pt-4">
            <TouchableOpacity
              onPress={handleDismiss}
              className="flex-1 rounded-xl py-3 items-center border border-gray-300"
            >
              <ThemedText className="text-gray-900 font-semibold">
                Dismiss
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleAdd}
              className={`flex-1 items-center rounded-xl py-3 border ${!canAdd ? 'bg-gray-300 border-gray-400' : 'bg-purple-600 border-purple-700'}`}
              disabled={!canAdd}
            >
              <ThemedText className={`font-semibold ${!canAdd ? 'text-gray-900' : 'text-white'}`}>
                Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
              </ThemedText>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </SafeAreaView>
      )}
    </Modal>
  );
}
