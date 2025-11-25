import RecommendedRitualCard from '@/components/rituals/RecommendedRitualCard';
import { ThemedText } from '@/components/themes/themed-text';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { useChatStore } from "@/src/store/useChatStore";
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RitualRecommendationModal() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const ritualRecommendationId = useChatStore((s) => s.ritualRecommendationId);
  const isModalVisible = useChatStore((s) => s.isRitualRecommendationModalVisible);
  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();

  const { data: recommendation, isLoading: isLoadingRecommendation } = useRitualRecommendation(ritualRecommendationId ?? '');
  const ritualPackId = recommendation?.ritualPackId;
  const { data: ritualPack, isLoading: isLoadingRitualPack } = useRitualPack(ritualPackId);

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

  const handleAdd = useCallback(() => {
    if (!canAdd) return;
    refreshRecommendationModalStates();
  }, [canAdd]);

  const handleCloseModal = useCallback(() => {
    refreshRecommendationModalStates();
  }, []);

  const handleDismiss = useCallback(() => {
    refreshRecommendationModalStates();
  }, []);

  if (isModalVisible && (isLoadingRecommendation || isLoadingRitualPack)) {
    return (
      <View className="my-1 w-full self-start p-4">
        <ThemedText>Loading recommendation...</ThemedText>
      </View>
    );
  }

  if (!recommendation || !ritualPack) {
    return (
      <View className="my-1 w-full self-start p-4">
        <ThemedText>Recommendation not found</ThemedText>
      </View>
    );
  }

  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      onRequestClose={handleCloseModal}
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        {/* Modal Header */}
        <View className="w-full px-4 pt-3 pb-2 border-b border-gray-200 bg-white flex-row items-center">
          <Pressable onPress={handleCloseModal} className="p-2 mr-2">
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
            <RecommendedRitualCard 
              ritual={item} 
              selected={!!selected[item.id]}
              onPress={() => toggle(item.id)}
            />
          )}
          ListHeaderComponent={
            <View className="px-4 pt-4 pb-2">
              {ritualPack.description ? (
                <ThemedText className="text-gray-600 mb-2">
                  {ritualPack.description}
                </ThemedText>
              ) : null}
              <ThemedText className="text-gray-600">
                Pick {ritualPack.rituals?.length > 1 ? '1–' + ritualPack.rituals.length : '1'} ritual{ritualPack.rituals?.length !== 1 ? 's' : ''} to add to your current focus.
              </ThemedText>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 96 }}
          showsVerticalScrollIndicator={false}
        />

        {/* Bottom bar */}
        <View className="absolute left-0 right-0 bottom-0 px-4 pb-6 pt-3 bg-white border-t border-gray-200">
          <View className="flex-row space-x-3">
            <Pressable
              onPress={handleDismiss}
              className="flex-1 rounded-xl py-3 items-center border border-gray-300"
            >
              <ThemedText className="text-gray-900 font-semibold">
                  Dismiss
                </ThemedText>
              </Pressable>
            <Pressable
              onPress={handleAdd}
              className={`flex-1 items-center rounded-xl py-3 border ${!canAdd ? 'bg-gray-300 border-gray-300' : 'bg-purple-600 border-purple-600'}`}
              disabled={!canAdd}
            >
              <ThemedText className={`font-semibold ${!canAdd ? 'text-gray-900' : 'text-white'}`}>
                Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
