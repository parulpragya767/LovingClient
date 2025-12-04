import Tag from '@/src/components/rituals/Tag';
import { ThemedText } from '@/src/components/themes/themed-text';
import { ThemedView } from '@/src/components/themes/themed-view';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { Ritual } from '@/src/models/rituals';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

interface RitualCardProps {
  ritual: Ritual;
  isPressable?: boolean;
  onLongPress?: () => void;
}

export default function RitualCard({ ritual, isPressable = true, onLongPress }: RitualCardProps) {
  const router = useRouter();
  const { getRitualTagDisplayNames } = useRitualTags();

  const handleRitualPress = () => {
    if(isPressable){
      router.push(`/rituals/${ritual.id}`);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handleRitualPress} 
      onLongPress={onLongPress} 
      delayLongPress={300} 
      activeOpacity={0.8}
    >
      <ThemedView className="bg-white rounded-2xl p-4 border border-gray-200 shadow-md">
        <ThemedText className="text-gray-800 text-lg font-semibold mb-1">
          {ritual.title}
        </ThemedText>
        <ThemedText className="text-gray-600 mb-3" numberOfLines={2} ellipsizeMode="tail">
          {ritual.description}
        </ThemedText>
        <View className="flex-row flex-wrap gap-2">
          {getRitualTagDisplayNames(ritual).slice(0, 3).map((label: string, idx: number) => (
            <Tag key={idx} label={label} />
          ))}
        </View>
        
        {isPressable && <ThemedText 
          className="text-blue-500 text-sm mt-3" 
          onPress={handleRitualPress}
        >
          View details →
        </ThemedText>}
      </ThemedView>
    </TouchableOpacity>
  );
}