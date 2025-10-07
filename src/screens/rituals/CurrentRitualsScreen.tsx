import EmojiFeedbackModal from '@/components/EmojiFeedbackModal';
import RitualCard from '@/components/RitualCard';
import RitualPackCard from '@/components/RitualPackCard';
import { ThemedText } from '@/components/themed-text';
import { useRitualPacks } from '@/src/hooks/useRitualPacks';
import { useRituals } from '@/src/hooks/useRituals';
import { userCurrentOverrides } from '@/src/services/userCurrentOverrides';
import { userSelections } from '@/src/services/userSelections';
import { Ritual, RitualPack } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default function CurrentRitualsScreen() {
  const { data: ritualsData, isLoading: isLoadingRituals } = useRituals();
  const { data: packsData, isLoading: isLoadingPacks } = useRitualPacks();
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRitualId, setSelectedRitualId] = useState<string | null>(null);
  const swipeRefs = useRef<Record<string, Swipeable | null>>({});
  const router = useRouter();

  const isLoading = isLoadingRituals || isLoadingPacks;
  // Process rituals data
  const { rituals, ritualsById }: { rituals: Ritual[], ritualsById: Record<string, Ritual> } = useMemo(() => {
    if (!ritualsData) return { rituals: [], ritualsById: {} };
    
    const byId: Record<string, Ritual> = {};
    
    // Map RitualDTO to Ritual
    const currentRituals = ritualsData
      .filter((ritual) => ritual.status === 'PUBLISHED') // Filter published rituals
      .map((r): Ritual => ({
        id: r.id || '',
        name: r.title || 'Unnamed Ritual',
        title: r.title || '',
        description: r.fullDescription || r.shortDescription || '',
        howTo: '', // Not available in DTO
        benefits: '', // Not available in DTO
        tags: [], // Not available in DTO
        isCurrent: true // Assuming all returned rituals are current for now
      }));
      
    // Populate the byId map
    currentRituals.forEach(r => {
      byId[r.id] = r;
    });
      
    return { rituals: currentRituals, ritualsById: byId };
  }, [ritualsData]);
  
  // Process packs data
  const packs: RitualPack[] = useMemo(() => {
    if (!packsData) return [];
    
    // Map RitualPackDTO to RitualPack
    return packsData
      .filter((p) => p.status === 'PUBLISHED') // Filter published packs
      .map((p): RitualPack => ({
        id: p.id || '',
        title: p.title || 'Unnamed Pack',
        description: p.fullDescription || p.shortDescription || '',
        tags: [], // Not available in DTO
        ritualIds: p.ritualIds || [],
        isCurrent: true // Assuming all returned packs are current for now
      }));
  }, [packsData]);
  
  const handleMarkCompleted = (id: string, emoji?: string) => {
    if (selectedRitualId) {
      userCurrentOverrides.markCompleted(selectedRitualId, emoji);
      setFilteredRituals(prev => [...prev]);
      swipeRefs.current[selectedRitualId]?.close();
    }
  };

  const renderRitualItem = ({ item }: { item: Ritual }) => (
    <RitualCard ritual={item} onPress={() => handleRitualPress(item.id)} />
  );

  useFocusEffect(
    useCallback(() => {
      setFilteredRituals(rituals);
      // Remove any existing swipeable refs when refocusing
      swipeRefs.current = {};
    }, [rituals])
  );

  const handleRitualPress = (id: string) => {
    router.push(`/rituals/${id}`);
  };

  const handleCompletePress = (id: string) => {
    setSelectedRitualId(id);
    setShowFeedbackModal(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedRitualId) {
      handleMarkCompleted(selectedRitualId, emoji);
      setShowFeedbackModal(false);
      setSelectedRitualId(null);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  const currentPackRitualIds = new Set(packs.flatMap(p => p.ritualIds));

  const selectedIds = userSelections.getAll();
  const mergedCurrentMap: Record<string, Ritual> = {};
  filteredRituals.forEach(r => { mergedCurrentMap[r.id] = r; });
  selectedIds.forEach(id => {
    const r = ritualsById[id];
    if (r) mergedCurrentMap[id] = r;
  });
  const mergedCurrent = Object.values(mergedCurrentMap);

  let currentIndividualRituals = mergedCurrent.filter(r => !currentPackRitualIds.has(r.id));
  currentIndividualRituals = currentIndividualRituals.filter(r => !userCurrentOverrides.isRemoved(r.id));

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          style={{ flex: 1 }}
          data={currentIndividualRituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const completed = userCurrentOverrides.isCompleted(item.id);

            const renderRightActions = () => (
              <View className="flex-row h-full items-stretch">
                <RectButton
                  onPress={() => handleCompletePress(item.id)}
                  style={{ justifyContent: 'center' }}
                >
                  <View className="bg-green-100 h-full w-14 justify-center items-center">
                    <MaterialIcons name="check-circle" size={24} color="#15803D" />
                  </View>
                </RectButton>
                <RectButton
                  onPress={() => {
                    userCurrentOverrides.removeFromCurrent(item.id);
                    setFilteredRituals(prev => prev.filter(r => r.id !== item.id));
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
              <View className="px-4">
                <Swipeable
                  ref={(ref) => { swipeRefs.current[item.id] = ref; }}
                  renderRightActions={renderRightActions}
                  overshootRight={false}
                >
                  <View className={completed ? 'opacity-60' : ''}>
                    <RitualCard 
                      ritual={item} 
                      onPress={() => handleRitualPress(item.id)}
                      onLongPress={() => swipeRefs.current[item.id]?.openRight?.()}
                    />
                  </View>
                </Swipeable>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16, paddingTop: 0 }}
          ListHeaderComponent={
            <View className="px-4 pt-4 pb-3">
              <View className="mb-4">
                <ThemedText className="text-2xl font-bold mb-1 text-gray-900">Your Current Rituals</ThemedText>
                <ThemedText className="text-sm text-gray-500">Keep track of your daily practices</ThemedText>
              </View>
              {packs.length > 0 && (
                <View className="mb-4">
                  {packs.map(pack => (
                    <RitualPackCard
                      key={pack.id}
                      pack={pack}
                      ritualsById={ritualsById}
                      onRitualPress={handleRitualPress}
                      onPressPack={(id) => router.push(`/(tabs)/rituals/pack/${id}`)}
                    />
                  ))}
                </View>
              )}
            </View>
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-10">
              <ThemedText className="text-gray-500">
                No current individual rituals
              </ThemedText>
            </View>
          }
        />
      </View>
      <EmojiFeedbackModal
        visible={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        onSelectEmoji={handleEmojiSelect}
      />
    </View>
  );
}
