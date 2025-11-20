import { ThemedText } from '@/components/themes/themed-text';
import { ThemedView } from '@/components/themes/themed-view';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { Ritual } from '@/src/models/rituals';
import { TouchableOpacity, View } from 'react-native';
import RitualTag from './RitualTags';

interface RitualCardProps {
  ritual: Ritual;
  onPress?: (id: string) => void;
  onLongPress?: () => void;
}

export default function RitualCard({ ritual, onPress, onLongPress }: RitualCardProps) {
  const { getRitualTagDisplayNames } = useRitualTags();
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
          {ritual.description}
        </ThemedText>
        <View className="flex-row flex-wrap gap-2">
          {getRitualTagDisplayNames(ritual).slice(0, 3).map((label: string, idx: number) => (
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