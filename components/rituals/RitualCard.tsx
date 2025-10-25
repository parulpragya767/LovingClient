import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { Ritual } from '@/src/models/rituals';
import { TouchableOpacity, View } from 'react-native';
import RitualTag from './RitualTags';

interface RitualCardProps {
  ritual: Ritual;
  onPress?: (id: string) => void;
  onLongPress?: () => void;
}

export default function RitualCard({ ritual, onPress, onLongPress }: RitualCardProps) {
  const titleizeEnum = (value?: string): string | null => {
    if (!value) return null;
    return value
      .split('_')
      .map((w: string) => (w ? w[0] + w.slice(1).toLowerCase() : w))
      .join(' ');
  };

  const getRitualTags = (r: Ritual): string[] => {
    const labels: string[] = [];
    if (r.estimatedDurationMinutes) labels.push(`${r.estimatedDurationMinutes}m`);
    if (Array.isArray(r.loveTypesSupported)) {
      r.loveTypesSupported.forEach((lt) => {
        const t = titleizeEnum(String(lt));
        if (t) labels.push(t);
      });
    }
    if (r.ritualMode) {
      const t = titleizeEnum(String(r.ritualMode));
      if (t) labels.push(t);
    }
    if (Array.isArray(r.ritualTypes)) {
      r.ritualTypes.forEach((rt) => {
        const t = titleizeEnum(String(rt));
        if (t) labels.push(t);
      });
    }
    return labels;
  };
  const handlePress = () => {
    if (onPress) {
      onPress(ritual.id);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      onLongPress={onLongPress} 
      delayLongPress={300} 
      activeOpacity={0.8}
    >
      <ThemedView className="bg-white rounded-xl p-4 mx-4 my-2 border border-gray-200 shadow-md">
        <ThemedText className="text-gray-800 text-lg font-semibold mb-2">
          {ritual.title}
        </ThemedText>
        <ThemedText 
          className="text-gray-600 mb-3" 
          numberOfLines={2} 
          ellipsizeMode="tail"
        >
          {ritual.shortDescription}
        </ThemedText>
        <View className="flex-row flex-wrap gap-2">
          {getRitualTags(ritual).slice(0, 3).map((label: string, idx: number) => (
            <RitualTag key={idx} label={label} />
          ))}
        </View>
        
        <ThemedText 
          className="text-blue-500 text-sm mt-3" 
          onPress={handlePress}
        >
          View details →
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}