import RitualPackCard from '@/components/rituals/RitualPackCard';
import SwipeableRitualCard from '@/components/rituals/SwipeableRitualCard';
import { ThemedText } from '@/components/themes/themed-text';
import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { CurrentRitual, CurrentRitualPack } from '@/src/models/ritualHistory';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

export default function CurrentRitualsScreen() {
  const { data: currentData, isLoading, refetch } = useCurrentRituals();
  const router = useRouter();

  const rituals: CurrentRitual[] = useMemo(() => currentData?.rituals ?? [], [currentData]);
  const packs: CurrentRitualPack[] = useMemo(() => currentData?.ritualPacks ?? [], [currentData]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
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
          data={rituals}
          keyExtractor={(item) => item.ritual.id}
          renderItem={({ item }) => (
            <View className="px-4">
              <SwipeableRitualCard
                ritual={item.ritual}
                ritualHistoryId={item.ritualHistoryId}
                onRitualPress={() => handleRitualPress(item.ritual.id)}
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
                      key={pack.ritualPack.id}
                      pack={pack.ritualPack}
                      rituals={pack.rituals}
                      onRitualPress={handleRitualPress}
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