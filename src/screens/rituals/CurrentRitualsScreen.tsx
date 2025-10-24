import SwipeableRitualCard from '@/components/SwipeableRitualCard';
import RitualPackCard from '@/components/RitualPackCard';
import { ThemedText } from '@/components/themed-text';
import { useCurrentRituals } from '@/src/hooks/useRitualHistory';
import { RitualPack } from '@/src/models/ritualPacks';
import { Ritual } from '@/src/models/rituals';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

export default function CurrentRitualsScreen() {
  const { data: currentData, isLoading, refetch } = useCurrentRituals();
  const router = useRouter();

  const rituals: Ritual[] = useMemo(() => currentData?.rituals ?? [], [currentData]);
  const packs: RitualPack[] = useMemo(() => currentData?.ritualPacks ?? [], [currentData]);

  const ritualHistoryByRitualId = useMemo(() => {
    const entries = (currentData?.ritualHistory ?? [])
      .filter(h => !!h.ritualId && !!h.id)
      .map(h => [h.ritualId as string, h.id as string] as const);
    return new Map<string, string>(entries);
  }, [currentData]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const packRitualIds = useMemo(
    () => new Set(packs.flatMap(p => p.rituals.map(r => r.id))), 
    [packs]
  );

  const individualRituals = useMemo(
    () => rituals.filter(r => !packRitualIds.has(r.id)),
    [rituals, packRitualIds]
  );

  const handleRitualPress = (id: string) => {
    router.push(`/rituals/${id}`);
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ThemedText>Loading rituals...</ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1">
        <FlatList
          style={{ flex: 1 }}
          data={individualRituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-4">
              <SwipeableRitualCard
                ritual={item}
                ritualHistoryId={ritualHistoryByRitualId.get(item.id)}
                onRitualPress={() => handleRitualPress(item.id)}
                onChanged={() => { refetch(); }}
              />
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
                      onRitualPress={handleRitualPress}
                      ritualHistoryIdByRitualId={ritualHistoryByRitualId}
                      onChanged={() => { refetch(); }}
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
    </View>
  );
}