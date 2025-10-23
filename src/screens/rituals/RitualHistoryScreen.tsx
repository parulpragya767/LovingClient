import { ThemedText } from '@/components/themed-text';
import { useRituals } from '@/src/hooks/useRituals';
import { Ritual } from '@/src/models/rituals';
import { userCurrentOverrides } from '@/src/services/userCurrentOverrides';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

export default function RitualHistoryScreen() {
  const [completedRituals, setCompletedRituals] = useState<{
    id: string;
    ritual: Ritual | null;
    feedback?: { emoji: string; timestamp: number };
  }[]>([]);
  const { data: rituals = [] } = useRituals();

  useEffect(() => {
    const loadCompletedRituals = async () => {
      const completed = userCurrentOverrides.getAllCompleted();
      const ritualsById = new Map(rituals.map(r => [r.id, r]));
      
      const withDetails = completed
        .map(({ id, feedback }) => ({
          id,
          ritual: ritualsById.get(id) || null,
          feedback,
        }))
        .sort((a, b) => (b.feedback?.timestamp || 0) - (a.feedback?.timestamp || 0));
      
      setCompletedRituals(withDetails);
    };

    loadCompletedRituals();
  }, [rituals]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={completedRituals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <ThemedText className="text-gray-500">
              No completed rituals yet
            </ThemedText>
          </View>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
            <View className="flex-1">
              <ThemedText className="font-medium text-gray-900">
                {item.ritual?.title || 'Unknown Ritual'}
              </ThemedText>
              {item.feedback?.timestamp && (
                <ThemedText className="text-xs text-gray-500 mt-1">
                  {formatDate(item.feedback.timestamp)}
                </ThemedText>
              )}
            </View>
            {item.feedback?.emoji && (
              <View className="ml-4">
                <ThemedText className="text-2xl">
                  {item.feedback.emoji}
                </ThemedText>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}