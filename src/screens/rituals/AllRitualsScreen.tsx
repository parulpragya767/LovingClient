import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { useRituals } from '@/src/hooks/useRituals';
import { Ritual } from '@/src/models/ritual';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function AllRitualsScreen() {
  const { data: ritualsData, isLoading, error } = useRituals();
  const [filteredRituals, setFilteredRituals] = useState<Ritual[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchTags, setSearchTags] = useState<string[]>([]);

  // Use rituals data directly from the hook
  const rituals = useMemo(() => ritualsData || [], [ritualsData]);

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
        <ActivityIndicator size="large" />
        <ThemedText className="mt-2">Loading rituals...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <ThemedText className="text-red-500 text-center">
          Error loading rituals: {error.message}
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
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
  );
}
