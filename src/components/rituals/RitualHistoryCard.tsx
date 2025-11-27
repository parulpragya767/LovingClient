import { ThemedText } from '@/src/components/themes/themed-text';
import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { EmojiFeedback } from '@/src/models/enums';
import { View } from 'react-native';

interface RitualHistoryCardProps {
  title: string;
  date?: string;
  feedback?: EmojiFeedback;
}

export function RitualHistoryCard({ title, date, feedback }: RitualHistoryCardProps) {
  const { mapFeedbackToEmoji } = useRitualActions();
  
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const emoji = feedback ? mapFeedbackToEmoji(feedback) : undefined;

  return (
    <View className="bg-white p-4 border-b border-gray-200 flex-row items-center justify-between">
      <View className="flex-1">
        <ThemedText className="font-medium text-gray-900">
          {title}
        </ThemedText>
        {date && (
          <ThemedText className="text-xs text-gray-500 mt-1">
            {formatDate(date)}
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
}
