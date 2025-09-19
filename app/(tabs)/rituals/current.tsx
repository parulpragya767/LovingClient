import EmojiFeedbackModal from '@/components/EmojiFeedbackModal';
import RitualCard from '@/components/RitualCard';
import RitualPackCard from '@/components/RitualPackCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { userCurrentOverrides } from '@/src/services/userCurrentOverrides';
import { userSelections } from '@/src/services/userSelections';
import { Ritual, RitualPack } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CurrentRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [ritualsById, setRitualsById] = useState<Record<string, Ritual>>({});
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [packs, setPacks] = useState<RitualPack[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedRitualId, setSelectedRitualId] = useState<string | null>(null);
  const swipeRefs = useRef<Record<string, Swipeable | null>>({});
  const router = useRouter();

  const fetchRituals = useCallback(async () => {
    try {
      const [ritualData, packData] = await Promise.all([
        apiService.getRituals(),
        apiService.getRitualPacks(),
      ]);

      const byId: Record<string, Ritual> = {};
      ritualData.forEach(r => { byId[r.id] = r; });
      setRitualsById(byId);

      const currentRituals = ritualData.filter((ritual) => ritual.isCurrent);
      setRituals(currentRituals);
      setPacks(packData.filter(p => p.isCurrent));
      setFilteredRituals(currentRituals);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  const handleMarkCompleted = (id: string, emoji?: string) => {
    userCurrentOverrides.markCompleted(id, emoji);
    setFilteredRituals(prev => [...prev]);
  };

  const handleCompletePress = (id: string) => {
    setSelectedRitualId(id);
    setShowFeedbackModal(true);
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedRitualId) {
      handleMarkCompleted(selectedRitualId, emoji);
      swipeRefs.current[selectedRitualId]?.close();
    }
  };

  const renderRitualCard = ({ item }: { item: Ritual }) => (
    <RitualCard ritual={item} onPress={() => handleRitualPress(item.id)} />
  );

  useEffect(() => {
    let filtered = [...rituals];

    // Apply search query filter
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter((ritual) =>
        ritual.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ritual.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredRituals(filtered);
  }, [searchQuery, rituals]);

  useFocusEffect(
    useCallback(() => {
      // refresh data and include any newly added selections
      fetchRituals();
    }, [fetchRituals])
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  // Determine ritual IDs that are part of current packs
  const currentPackRitualIds = new Set(packs.flatMap(p => p.ritualIds));

  // Merge API current rituals with user-selected additional rituals
  const selectedIds = userSelections.getAll();
  const mergedCurrentMap: Record<string, Ritual> = {};
  filteredRituals.forEach(r => { mergedCurrentMap[r.id] = r; });
  selectedIds.forEach(id => {
    const r = ritualsById[id];
    if (r) mergedCurrentMap[id] = r;
  });
  const mergedCurrent = Object.values(mergedCurrentMap);

  // Exclude rituals that are part of packs from the individual list
  let currentIndividualRituals = mergedCurrent.filter(r => !currentPackRitualIds.has(r.id));
  // Filter out any the user removed from current
  currentIndividualRituals = currentIndividualRituals.filter(r => !userCurrentOverrides.isRemoved(r.id));

  return (
    <SafeAreaView className="flex-1 bg-white">
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
                {searchQuery ? 'No matching rituals found' : 'No current individual rituals'}
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
    </SafeAreaView>
  );
}
