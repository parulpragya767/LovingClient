import RitualCard from '@/src/components/rituals/RitualCard';
import RitualSearchInput from '@/src/components/rituals/RitualSearchInput';
import { SelectedTags } from '@/src/components/rituals/SelectedTags';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { AppTheme } from '@/src/components/themes/AppTheme';
import { Screen } from '@/src/components/ui/Screen';
import { useKeywordFilter } from '@/src/hooks/rituals/useKeywordFilter';
import { useRitualSearch } from '@/src/hooks/rituals/useRitualSearch';
import { useTagFilter } from '@/src/hooks/rituals/useTagFilter';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';

export default function AllRitualsScreen() {
  const listRef = useRef<FlatList>(null);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const isWeb = Platform.OS === "web";

  const { filter: tagFilter, chips, removeChip, clearAll } = useTagFilter();
  const { keyword } = useKeywordFilter();

  const searchFilter = useMemo(() => ({
    ...tagFilter,
    ...(keyword.trim() ? { keyword: keyword.trim() } : {}),
  }), [tagFilter, keyword]);

  const {
    rituals,
    loading: { isLoading, isFetchingNextPage },
    meta: { hasNextPage, error },
    actions: { loadMore, refetch, refresh },
  } = useRitualSearch(searchFilter);

  useEffect(() => {
    onEndReachedCalledDuringMomentum.current = false;
  }, [searchFilter]);

  const handleEndReached = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    if (!isWeb && onEndReachedCalledDuringMomentum.current) return;

    onEndReachedCalledDuringMomentum.current = true;
    loadMore();
  };

  if (isLoading) return <LoadingState text="Loading rituals..." />;
  if (error) return <ErrorState message="Failed to load rituals." onButtonPress={() => refetch()} />;

  const handleKeywordSearch = (query: string) => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  return (
    <Screen>
      {/* Search and Filter*/}
      <View className="flex-row items-center gap-3 mb-4">
        <RitualSearchInput onSearch={handleKeywordSearch} />

        <Pressable
          onPress={() => router.push('/rituals/filter')}
          className="h-10 w-10 items-center justify-center bg-surface-sunken border border-border rounded-compactCard"
        >
          <MaterialIcons name="tune" size={20} color={AppTheme.colors.text.primary}/>
        </Pressable>
      </View>

      {/* Selected filter tags */}
      <SelectedTags chips={chips} removeChip={removeChip} clearAll={clearAll} className="mb-4"/>
      
      {/* Rituals List */}
      <FlatList
          ref={listRef}
          data={rituals}
          keyExtractor={(item) => item.id}
          renderItem={({ item: ritual }) => (
            <View className="mb-4">
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
    </Screen>
  );
}