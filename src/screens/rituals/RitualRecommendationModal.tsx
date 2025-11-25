import SuggestedRitual from '@/components/rituals/SuggestedRitual';
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

  const { data: ritualRecommendation, isLoading: isLoadingRecommendation } = useRitualRecommendation(ritualRecommendationId ?? '');
  const ritualPackId = ritualRecommendation?.ritualPackId;
  const { data: ritualPack, isLoading: isLoadingRitualPack } = useRitualPack(ritualPackId);

  const suggestions = useMemo(() => {
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

  const refreshModalStates = () => {
    setIsRitualRecommendationModalVisible(false);
    setRitualRecommendationId(null);
  };

  const handleAdd = useCallback(() => {
    if (!canAdd) return;
    refreshModalStates();
  }, [canAdd]);

  const handleCloseModal = useCallback(() => {
    refreshModalStates();
  }, []);

  const handleDismiss = useCallback(() => {
    refreshModalStates();
  }, []);

  if (!isModalVisible || !ritualPack) {
    return null;
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
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SuggestedRitual 
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
              className={`flex-1 rounded-xl py-3 items-center ${canAdd ? 'bg-purple-600' : 'bg-gray-300'}`}
              disabled={!canAdd}
            >
              <ThemedText className="text-white font-semibold">
                Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
