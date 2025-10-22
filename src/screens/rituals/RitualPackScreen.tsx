import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import RitualCard from '@/components/RitualCard';
import { useCallback, useEffect, useState } from 'react';
import { apiService } from '@/src/services/api';
import { Ritual } from '@/src/models/ritual';
import { RitualPack } from '@/src/types/data-model';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function RitualPackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [pack, setPack] = useState<RitualPack | null>(null);
  const [rituals, setRituals] = useState<Ritual[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPack = useCallback(async () => {
    if (!id) return;
    
    try {
      const [packData, allRituals] = await Promise.all([
        apiService.getRitualPackById(id),
        apiService.getRituals(),
      ]);

      if (!packData) {
        console.error('Ritual pack not found');
        return;
      }

      // Filter rituals that belong to this pack
      const packRituals = allRituals.filter((r: Ritual) =>
        packData.ritualIds.includes(r.id)
      );

      setPack(packData);
      setRituals(packRituals);
    } catch (error) {
      console.error('Failed to load ritual pack:', error);
      // Handle error appropriately in your UI
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadPack();
  }, [loadPack]);

  const handleRitualPress = (ritualId: string) => {
    router.push(`/rituals/${ritualId}`);
  };

  if (isLoading || !pack) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <View className="p-4">
        <ThemedText className="text-2xl font-bold mb-2">
          {pack.title}
        </ThemedText>
        {pack.description && (
          <ThemedText className="text-gray-600 mb-4">
            {pack.description}
          </ThemedText>
        )}
        {pack.tags && pack.tags.length > 0 && (
          <View className="flex-row flex-wrap mb-4">
            {pack.tags.map((tag, index) => (
              <View key={index} className="bg-gray-100 rounded-full px-2 py-1 mr-2 mb-1">
                <ThemedText className="text-gray-600 text-xs">
                  {tag}
                </ThemedText>
              </View>
            ))}
          </View>
        )}
        <ThemedText className="text-lg font-semibold mb-2">
          Rituals in this pack ({rituals.length})
        </ThemedText>
      </View>

      <FlatList
        data={rituals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="px-4 mb-4">
            <RitualCard 
              ritual={item} 
              onPress={() => handleRitualPress(item.id)} 
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <ThemedText className="text-gray-500">No rituals in this pack.</ThemedText>
          </View>
        }
        refreshing={isLoading}
        onRefresh={loadPack}
      />
    </ThemedView>
  );
}
