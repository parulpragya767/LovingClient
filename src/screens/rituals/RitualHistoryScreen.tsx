import { ThemedText } from '@/components/themed-text';
import { useRitualHistory } from '@/src/hooks/useRitualHistory';
import { useRituals } from '@/src/hooks/useRituals';
import { EmojiFeedback, RitualHistoryStatus } from '@/src/models/enums';
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

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const feedbackToEmoji = (fb?: EmojiFeedback) => {
    switch (fb) {
      case EmojiFeedback.Heart:
        return '❤️';
      case EmojiFeedback.Smile:
        return '😊';
      case EmojiFeedback.Neutral:
        return '😐';
      case EmojiFeedback.Sad:
        return '😢';
      case EmojiFeedback.Angry:
        return '😠';
      case EmojiFeedback.Fire:
        return '🔥';
      case EmojiFeedback.ThumbsUp:
        return '👍';
      case EmojiFeedback.ThumbsDown:
        return '👎';
      default:
        return '';
    }
  };

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
          const emoji = feedbackToEmoji(item.feedback);
          return (
            <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
              <View className="flex-1">
                <ThemedText className="font-medium text-gray-900">
                  {ritual?.title || 'Unknown Ritual'}
                </ThemedText>
                {!!item.createdAt && (
                  <ThemedText className="text-xs text-gray-500 mt-1">
                    {formatDate(item.createdAt)}
                  </ThemedText>
                )}
              </View>
              {!!emoji && (
                <View className="ml-4">
                  <ThemedText className="text-2xl">
                    {emoji}
                  </ThemedText>
                </View>
              )}
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}