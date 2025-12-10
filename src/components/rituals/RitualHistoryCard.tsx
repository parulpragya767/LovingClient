import { useRitualActions } from '@/src/hooks/rituals/useRitualActions';
import { EmojiFeedback } from '@/src/models/enums';
import { View } from 'react-native';
import { AppText } from '../ui/AppText';

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
    <View className="bg-surface-elevated p-4 border-b border-border flex-row items-center justify-between">
      <View className="flex-1">
        <AppText variant="body" className="font-medium">
          {title}
        </AppText>
        {date && (
          <AppText variant="caption" className="mt-1">
            {formatDate(date)}
          </AppText>
        )}
      </View>
      {!!emoji && (
        <View className="ml-4">
          <AppText variant="title">
            {emoji}
          </AppText>
        </View>
      )}
    </View>
  );
}
