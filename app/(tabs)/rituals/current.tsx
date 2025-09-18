import RitualCard from '@/components/RitualCard';
import { ThemedText } from '@/components/themed-text';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/types/data-model';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';

export default function CurrentRitualsScreen() {
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRituals = useCallback(async () => {
    try {
      const data = await apiService.getRituals();
      setRituals(data.filter(ritual => ritual.isCurrent));
    } catch (error) {
      console.error('Failed to fetch rituals:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const router = useRouter();

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

  useFocusEffect(
    useCallback(() => {
      fetchRituals();
    }, [fetchRituals])
  );

  const renderRitualCard = useCallback(({ item }: { item: Ritual }) => (
    <RitualCard 
      key={item.id}
      ritual={item}
      onPress={() => handleRitualPress(item.id)}
    />
  ), [handleRitualPress]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Tab Navigation */}
      <View className="flex-row bg-white border-b border-gray-200">
        <Pressable 
          className="flex-1 py-4 items-center border-b-2 border-purple-500"
          onPress={() => {}}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-purple-500 font-medium`}>
              Current
            </ThemedText>
          )}
        </Pressable>
        <Pressable 
          className="flex-1 py-4 items-center"
          onPress={() => router.push('/(tabs)/rituals/all-rituals')}
        >
          {({ pressed }) => (
            <ThemedText className={`${pressed ? 'opacity-70' : ''} text-gray-500`}>
              All Rituals
            </ThemedText>
          )}
        </Pressable>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 pt-4">
        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-5"
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-10">
              <ThemedText className="text-gray-500">No current rituals</ThemedText>
            </View>
          }
        />
      </View>
    </View>
  );
}
