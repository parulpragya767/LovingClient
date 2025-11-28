import RitualCard from '@/src/components/rituals/RitualCard';
import { SelectedTags } from '@/src/components/rituals/SelectedTags';
import { EmptyState } from '@/src/components/states/EmptyState';
import { useRitualSearch } from '@/src/hooks/rituals/useRitualSearch';
import { useTagSelection } from '@/src/hooks/rituals/useTagSelection';
import { useRef } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function AllRitualsScreen() {
  const listRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);

  const { filter } = useTagSelection();
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

  return (
    <View className="flex-1 bg-white mt-3 mb-6">
        <SelectedTags />
        <FlatList
          ref={listRef}
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item: ritual }) => (
            <View className="mb-4 px-4">
              <RitualCard 
                key={ritual.id}
                ritual={ritual}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
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
          ListEmptyComponent={<EmptyState message="No rituals found." />}
          refreshing={isLoading}
          onRefresh={refresh}
        />
    </View>
  );
}