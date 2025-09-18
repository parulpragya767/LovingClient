import RitualCard from '@/components/RitualCard';
import RitualPackCard from '@/components/RitualPackCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { userSelections } from '@/src/services/userSelections';
import { Ritual, RitualPack } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CurrentRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [ritualsById, setRitualsById] = useState<Record<string, Ritual>>({});
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [packs, setPacks] = useState<RitualPack[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  const currentIndividualRituals = mergedCurrent.filter(r => !currentPackRitualIds.has(r.id));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full items-center bg-white">
        <View className="w-full px-4 pt-3">
          {/* Search (only on Current) */}
          <Pressable 
            className="flex-row items-center bg-gray-100 rounded-lg px-3 h-10 w-full"
            onPress={() => router.push('/(tabs)/rituals/search')}
          >
            <MaterialIcons name="search" size={20} color="#6B7280" />
            <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
          </Pressable>
          {/* Tabs */}
          <View className="flex-row border-b border-gray-200 mt-2">
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-purple-500"
              onPress={() => router.replace('/(tabs)/rituals/current')}
            >
              <ThemedText className="text-gray-600 font-semibold text-sm">Current</ThemedText>
            </Pressable>
            <Pressable 
              className="flex-1 py-3 items-center border-b-2 border-transparent"
              onPress={() => router.push('/(tabs)/rituals/all-rituals')}
            >
              <ThemedText className="text-gray-400 font-semibold text-sm">All Rituals</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex-1">
        <FlatList
          style={{ flex: 1 }}
          data={currentIndividualRituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4">
              <RitualCard ritual={item} onPress={() => handleRitualPress(item.id)} />
            </View>
          )}
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
    </SafeAreaView>
  );
}
