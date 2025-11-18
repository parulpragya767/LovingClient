import RitualCard from '@/components/rituals/RitualCard';
import { ThemedText } from '@/components/themes/themed-text';
import { useRitualSearch } from '@/src/hooks/useRitualSearch';
import { Ritual } from '@/src/models/rituals';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';

export default function AllRitualsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { results, isLoading, error, runSearch, loadNext, clearResults } = useRitualSearch();

  // Parse filter passed from search screen (if any)
  const initialFilter = useMemo(() => {
    try {
      if (params?.filter && typeof params.filter === 'string') {
        return JSON.parse(params.filter as string);
      }
    } catch {}
    return undefined;
  }, [params]);

  // Kick off search when filter arrives/changes
  useEffect(() => {
    if (initialFilter) {
      runSearch(initialFilter);
    }
  }, [initialFilter, runSearch]);

  const onClear = useCallback(() => {
    clearResults();
    router.setParams({ filter: undefined as unknown as string });
  }, [clearResults, router]);

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

  if (isLoading && results.length === 0) {
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
    <View className="bg-white flex-1">
        <View className="flex-row justify-between items-center px-4 pt-3 pb-2">
          <ThemedText className="font-semibold">All rituals</ThemedText>
          <Pressable onPress={onClear} className="px-3 py-1 rounded bg-gray-100">
            <ThemedText className="text-gray-600">Clear</ThemedText>
          </Pressable>
        </View>
        <FlatList
          data={results}
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