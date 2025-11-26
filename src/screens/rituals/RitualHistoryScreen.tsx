import { RitualHistoryCard } from '@/src/components/rituals/RitualHistoryCard';
import { ThemedText } from '@/src/components/themes/themed-text';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import { useRituals } from '@/src/hooks/rituals/useRituals';
import { RitualHistoryStatus } from '@/src/models/enums';
import { Ritual } from '@/src/models/rituals';
import { ActivityIndicator, FlatList, View } from 'react-native';

export default function RitualHistoryScreen() {
  const { data: history = [], isLoading, error } = useRitualHistory();
  const { data: rituals = [] } = useRituals();

  const ritualsById = new Map<string, Ritual>(rituals.map(r => [r.id, r]));

  const sortedHistory = [...history]
    .filter(ritual => ritual.status === RitualHistoryStatus.Completed)
    .sort((a, b) => {
      const ad = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bd = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bd - ad;
    });


  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
        <ThemedText className="mt-2">Loading history...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <ThemedText className="text-red-500 text-center">
          Error loading history: {error.message}
        </ThemedText>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={sortedHistory}
        keyExtractor={(item) => item.id || `${item.ritualId}-${item.createdAt}`}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <ThemedText className="text-gray-500">
              No history yet
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => {
          const ritual = item.ritualId ? ritualsById.get(item.ritualId) : undefined;
          return (
            <RitualHistoryCard
              title={ritual?.title || 'Unknown Ritual'}
              date={item.createdAt}
              feedback={item.feedback}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}