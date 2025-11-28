import { ThemedText } from '@/src/components/themes/themed-text';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { Ritual } from '@/src/models/rituals';
import { Pressable, View } from 'react-native';
import RitualTag from './Tag';

interface RecommendedRitualProps {
  ritual: Ritual;
  selected?: boolean;
  onPress?: (id: string) => void;
}

export default function RecommendedRitualCard({ ritual, selected = false, onPress }: RecommendedRitualProps) {
  const { getRitualTagDisplayNames } = useRitualTags();

  const handlePress = () => {
    if (onPress) {
      onPress(ritual.id);
    }
  };

  return (
    <View className="px-4 py-3">
      <View className="flex-row items-start">
        {/* Radio */}
        <Pressable onPress={handlePress} className="mr-3 mt-1">
          <View 
            className={`w-5 h-5 rounded-full border-2 ${selected ? 'border-purple-500' : 'border-gray-300'}`}
          >
            {selected && (
              <View className="flex-1 m-0.5 rounded-full bg-purple-500" />
            )}
          </View>
        </Pressable>
        
        {/* Card */}
        <View className="flex-1">
          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <ThemedText className="text-gray-800 text-lg font-semibold mb-1">
              {ritual.title}
            </ThemedText>
            <ThemedText 
              className="text-gray-600 mb-2 text-sm" 
              numberOfLines={2} 
              ellipsizeMode="tail"
            >
              {ritual.tagLine || (ritual.description ? 
                (ritual.description.substring(0, 100) + (ritual.description.length > 100 ? '...' : '')) : 
                '')}
            </ThemedText>
            <View className="flex-row flex-wrap gap-1.5">
              {getRitualTagDisplayNames(ritual).slice(0, 3).map((label: string, idx: number) => (
                <RitualTag key={idx} label={label} size="small" />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
