import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SuggestedRitual from '@/components/rituals/SuggestedRitual';
import { ThemedText } from '@/components/themes/themed-text';
import { RitualPack } from '@/src/models/ritualPacks';

type RitualPackSuggestionModalProps = {
  isVisible: boolean;
  ritualPack: RitualPack;
  onClose: () => void;
  onAddRituals?: (selectedIds: string[]) => void;
};

export default function RitualPackSuggestionModal({
  isVisible,
  ritualPack,
  onClose,
  onAddRituals,
}: RitualPackSuggestionModalProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  
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

  const handleAdd = () => {
    if (!canAdd || !onAddRituals) return;
    onAddRituals(selectedIds);
    onClose();
  };

  if (!isVisible || !ritualPack) {
    return null;
  }

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        {/* Modal Header */}
        <View className="w-full px-4 pt-3 pb-2 border-b border-gray-200 bg-white flex-row items-center">
          <Pressable onPress={onClose} className="p-2 mr-2">
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
          <Pressable
            onPress={handleAdd}
            className={`rounded-xl py-3 items-center ${canAdd ? 'bg-purple-600' : 'bg-gray-300'}`}
            disabled={!canAdd}
          >
            <ThemedText className="text-white font-semibold">
              Add {selectedIds.length} ritual{selectedIds.length === 1 ? '' : 's'} to Current
            </ThemedText>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
