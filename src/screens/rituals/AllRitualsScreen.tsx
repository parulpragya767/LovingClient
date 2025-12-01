import RitualCard from '@/src/components/rituals/RitualCard';
import { SelectedTags } from '@/src/components/rituals/SelectedTags';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { useRitualSearch } from '@/src/hooks/rituals/useRitualSearch';
import { useTagSelection } from '@/src/hooks/rituals/useTagSelection';
import { useEffect, useRef } from 'react';
import { FlatList, Platform, View } from 'react-native';

export default function AllRitualsScreen() {
  const listRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const isWeb = Platform.OS === "web";

  const { filter } = useTagSelection();
  const {
    rituals,
    loading: { isLoading, isFetchingNextPage },
    meta: { hasNextPage, error },
    actions: { loadMore, refetch, refresh },
  } = useRitualSearch(filter);

  useEffect(() => {
    onEndReachedCalledDuringMomentum.current = false;
  }, [filter]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (!isWeb && onEndReachedCalledDuringMomentum.current) return;

    onEndReachedCalledDuringMomentum.current = true;
    loadMore();
  };

  if (isLoading) return <LoadingState text="Loading rituals..." />;
  if (error) return <ErrorState message="Failed to load rituals." onButtonPress={() => refetch()} />;

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
          onEndReachedThreshold={0.1}
          onScrollBeginDrag={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <LoadingState text="" fullScreen={false} />
            ) : null
          }
          ListEmptyComponent={<EmptyState message="No rituals found." />}
          refreshing={isLoading}
          onRefresh={refresh}
        />
    </View>
  );
}