import RitualCard from '@/components/rituals/RitualCard';
import RitualTags from '@/components/rituals/RitualTags';
import { ThemedText } from '@/components/themes/themed-text';
import { useRitualSearch } from '@/src/hooks/useRitualSearch';
import { useTagSelection } from '@/src/hooks/useTagSelection';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { ActivityIndicator, FlatList, Pressable, ScrollView, View } from 'react-native';

export default function AllRitualsScreen() {
  const router = useRouter();

  const listRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const { filter, chips, removeChip, clearAll } = useTagSelection();

  const {
    rituals,
    loading: { isLoading, isFetchingNextPage },
    meta: { hasNextPage },
    actions: { loadMore, refresh },
  } = useRitualSearch(filter);

  const handleEndReached = () => {
    if (
      !hasNextPage ||
      isFetchingNextPage ||
      onEndReachedCalledDuringMomentum.current
    ) {
      return;
    }

    onEndReachedCalledDuringMomentum.current = true;
    loadMore();
  };

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  const handleRitualPress = (id: string) => {
    router.push(`/(tabs)/rituals/${id}`);
  };

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
                key={c.key}
                tag={{ displayName: c.displayName }}
                bgClassName="bg-violet-100"
                borderClassName="border-violet-200"
                colorClassName="text-violet-700"
                closable
                onClose={() => removeChip(c)}
              />
            ))}
            {chips.length > 0 && (
              <Pressable onPress={clearAll}>
                <RitualTags 
                  key="clear-all"
                  tag={{ displayName: 'Clear All' }}
                  bgClassName="bg-gray-100"
                  borderClassName="border-gray-200"
                  colorClassName="text-gray-600"
                />
              </Pressable>
            )}
          </ScrollView>
        )}
        <FlatList
          ref={listRef}
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RitualCard 
              key={item.id}
              ritual={item}
              onPress={() => handleRitualPress(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.6}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 20 }} />
            ) : null
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-10">
              <ThemedText className="text-gray-500">
                No rituals found
              </ThemedText>
            </View>
          }
          refreshing={isLoading}
          onRefresh={refresh}
        />
    </View>
  );
}