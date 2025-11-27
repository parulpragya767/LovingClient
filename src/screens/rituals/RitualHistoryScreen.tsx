import { RitualHistoryCard } from '@/src/components/rituals/RitualHistoryCard';
import { EmptyState } from '@/src/components/states/EmptyState';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import { useRituals } from '@/src/hooks/rituals/useRituals';
import { RitualHistoryStatus } from '@/src/models/enums';
import { Ritual } from '@/src/models/rituals';
import { FlatList, View } from 'react-native';

const getTimestamp = (dateString?: string): number => 
  dateString ? new Date(dateString).getTime() : 0;

export default function RitualHistoryScreen() {
  const { data: history = [], isLoading, error, refetch } = useRitualHistory();
  const { data: rituals = [] } = useRituals();

  if (isLoading) return <LoadingState text="Loading your ritual history..." />;
  if (error) return <ErrorState message="Failed to load your ritual history." onButtonPress={() => refetch()} />;
    
  // const ritualsById = useMemo(() => 
  //   new Map<string, Ritual>(rituals.map(r => [r.id, r])),
  //   [rituals]
  // );

  // const sortedHistory = useMemo(() => 
  //   history
  //     .filter(ritual => ritual.status === RitualHistoryStatus.Completed)
  //     .sort((a, b) => getTimestamp(b.updatedAt) - getTimestamp(a.updatedAt)),
  //   [history]
  // );

  const ritualsById = new Map<string, Ritual>(rituals.map(r => [r.id, r]));

  const sortedHistory = 
    history
      .filter(ritual => ritual.status === RitualHistoryStatus.Completed)
      .sort((a, b) => getTimestamp(b.updatedAt) - getTimestamp(a.updatedAt));


  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={sortedHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const ritual = item.ritualId ? ritualsById.get(item.ritualId) : undefined;
          return (
            <RitualHistoryCard
              title={ritual?.title || 'Ritual'}
              date={item.updatedAt}
              feedback={item.feedback}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState message="No history yet." />}
      />
    </View>
  );
}