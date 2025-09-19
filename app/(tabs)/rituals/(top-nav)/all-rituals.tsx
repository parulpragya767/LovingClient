import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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
    </SafeAreaView>
  );
}
