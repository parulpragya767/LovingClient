import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchTags, setSearchTags] = useState<string[]>([]);

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      setRituals(data);
      setFilteredRituals(data);
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRituals();
    }, [fetchRituals])
  );

  // Apply filtering when tags or rituals change
  useEffect(() => {
    let data = rituals;
    if (searchTags.length > 0) {
      data = data.filter(r => searchTags.every(t => r.tags.includes(t)));
    }
    setFilteredRituals(data);
  }, [rituals, searchTags]);

  // Read tags from route params
  useEffect(() => {
    if (params?.searchTags) {
      try {
        const tags = JSON.parse(String(params.searchTags)) as string[];
        setSearchTags(Array.isArray(tags) ? tags : []);
      } catch (e) {
        setSearchTags([]);
      }
    } else {
      setSearchTags([]);
    }
  }, [params?.searchTags]);

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  const renderRitualCard = useCallback(({ item }: { item: Ritual }) => (
    <RitualCard 
      key={item.id}
      ritual={item}
      onPress={() => handleRitualPress(item.id)}
    />
  ), [handleRitualPress]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* In-screen header with back + search (no tabs on All Rituals) */}
      <View className="w-full items-center bg-white"> 
        <View className="w-full px-4 pt-3">
          <View className="flex-row items-center gap-2">
            <Pressable onPress={() => router.back()} className="py-2 pr-2 mr-2">
              <MaterialIcons name="arrow-back" size={24} color="#4B5563" />
            </Pressable>
            <Pressable 
              className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 h-10"
              onPress={() => router.push('/(tabs)/rituals/search')}
            >
              <MaterialIcons name="search" size={20} color="#6B7280" />
              <ThemedText className="text-gray-500 ml-2">Search rituals...</ThemedText>
            </Pressable>
          </View>
        </View>
      </View>

      <View className="flex-1 p-4">
        <View className="mb-6">
          <ThemedText className="text-2xl font-bold mb-1 text-gray-900">All Rituals</ThemedText>
          <ThemedText className="text-sm text-gray-500">
            Browse all available rituals
          </ThemedText>
        </View>

        <FlatList
          data={filteredRituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-10">
              <ThemedText className="text-gray-500">
                No rituals found
              </ThemedText>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
