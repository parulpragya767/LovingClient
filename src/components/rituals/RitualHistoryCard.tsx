import { ThemedText } from '@/src/components/themes/themed-text';
import { EmojiFeedback } from '@/src/models/enums';
import { View } from 'react-native';

interface RitualHistoryCardProps {
  title: string;
  date?: string;
  feedback?: EmojiFeedback;
}

export function RitualHistoryCard({ title, date, feedback }: RitualHistoryCardProps) {
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
  
  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const emoji = feedback ? feedbackToEmoji(feedback) : undefined;

  return (
    <View className="bg-white rounded-xl p-4 mb-3 flex-row items-center justify-between">
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
