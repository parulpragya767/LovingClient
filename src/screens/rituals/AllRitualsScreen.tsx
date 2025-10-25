import RitualCard from '@/components/rituals/RitualCard';
import RitualTags from '@/components/rituals/RitualTags';
import { ThemedText } from '@/components/themes/themed-text';
import { useRitualSearchStore } from '@/src/hooks/useRitualSearchStore';
import { useRitualTagSelection } from '@/src/hooks/useRitualTagSelection';
import { Ritual } from '@/src/models/rituals';
import { useRouter } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';

export default function AllRitualsScreen() {
  const router = useRouter();
  const { state, actions } = useRitualSearchStore();
  const { rituals, isLoading, error, filter } = state;
  const { chips, removeChip } = useRitualTagSelection();

  const loadNext = useCallback(() => {
    actions.loadNextPage();
  }, [actions]);

  useEffect(() => {
    if (!isLoading && rituals.length === 0) {
      actions.runSearch(true);
    }
  }, [actions, isLoading, rituals.length]);

  useEffect(() => {
    // Trigger fresh search when filter changes
    actions.runSearch(true);
  }, [actions, filter]);

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

  if (isLoading && rituals.length === 0) {
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
    <View className="bg-white">
        {chips.length > 0 && (
          <ScrollView 
            horizontal 
            className="px-4 pt-3" 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {chips.map((c) => (
              <RitualTags 
                key={c}
                tag={{ displayName: c }}
                bgClassName="bg-violet-100"
                borderClassName="border-violet-200"
                colorClassName="text-violet-700"
                closable
                onClose={() => removeChip(c)}
              />
            ))}
          </ScrollView>
        )}
        <FlatList
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={renderRitualCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          onEndReached={loadNext}
          onEndReachedThreshold={0.6}
          ListFooterComponent={
            isLoading ? (
              <View className="py-4">
                <ActivityIndicator />
              </View>
            ) : null
          }
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