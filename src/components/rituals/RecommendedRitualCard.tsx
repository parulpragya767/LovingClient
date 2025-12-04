import RitualCard from '@/src/components/rituals/RitualCard';
import { Ritual } from '@/src/models/rituals';
import { Pressable, View } from 'react-native';

interface RecommendedRitualProps {
  ritual: Ritual;
  selected?: boolean;
  onPress?: (id: string) => void;
}

export default function RecommendedRitualCard({ ritual, selected = false, onPress }: RecommendedRitualProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(ritual.id);
    }
  };

  return (
    <View className="flex-row items-center">
      <Pressable onPress={handlePress} className={`mr-3 w-5 h-5 rounded-full border-2 ${selected ? 'border-purple-500' : 'border-gray-300'}`}>
        {selected && (
          <View className="flex-1 m-0.5 rounded-full bg-purple-500" />
        )}
      </Pressable>
      <View className="flex-1">
        <RitualCard ritual={ritual} isPressable={false} />
      </View>
    </View>
  );
}
