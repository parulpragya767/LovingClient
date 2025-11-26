import RitualCard from '@/src/components/rituals/RitualCard';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { Ritual } from '@/src/models/rituals';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function RitualPackScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pack, isLoading, error, refetch, isRefetching } = useRitualPack(id);
  const rituals: Ritual[] = useMemo(() => pack?.rituals ?? [], [pack]);

  if (isLoading) {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#8B5CF6" />
      </ThemedView>
    );
  }

  if (error || !pack) {
    return (
      <ThemedView className="flex-1 items-center justify-center p-4">
        <ThemedText>{error?.message || 'Failed to load ritual pack'}</ThemedText>
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
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <ThemedText className="text-gray-500">No rituals in this pack.</ThemedText>
          </View>
        }
        refreshing={isRefetching}
        onRefresh={refetch}
      />
    </ThemedView>
  );
}
