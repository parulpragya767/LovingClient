import { RitualHistoryCard } from '@/src/components/rituals/RitualHistoryCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import { RitualHistoryStatus } from '@/src/models/enums';
import React, { useMemo } from 'react';
import { FlatList, View } from 'react-native';

const getTimestamp = (dateString?: string): number => 
  dateString ? new Date(dateString).getTime() : 0;

export default function RitualHistoryScreen() {
  const { data: history = [], isLoading, error, refetch } = useRitualHistory();

  const sortedHistory = useMemo(() => {
    return history
      .filter(userRitual => userRitual.ritualHistory.status === RitualHistoryStatus.Completed)
      .sort((a, b) => getTimestamp(b.ritualHistory.updatedAt) - getTimestamp(a.ritualHistory.updatedAt))
  }, [history]);

  if (isLoading) return <LoadingState text="Loading your ritual history..." />;
  if (error) return <ErrorState message="Failed to load your ritual history." onButtonPress={() => refetch()} />;

  return (
    <View className="flex-1 bg-surface-screen">
      <FlatList
        data={sortedHistory}
        keyExtractor={(item) => item.ritualHistoryId}
        renderItem={({ item }) => {
          return (
            <RitualHistoryCard
              title={item.ritual.title || 'Ritual'}
              date={item.ritualHistory.updatedAt}
              feedback={item.ritualHistory.feedback}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState message="No history yet." />}
      />
    </View>
  );
}