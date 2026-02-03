import RitualCard from '@/src/components/rituals/RitualCard';
import { Ritual } from '@/src/models/rituals';
import { Pressable, View } from 'react-native';

interface RecommendedRitualProps {
  ritual: Ritual;
  selected?: boolean;
  onPress: (id: string) => void;
}

export default function RecommendedRitualCard({ 
  ritual, 
  selected = false, 
  onPress 
}: RecommendedRitualProps) {
  return (
    <Pressable onPress={() => onPress(ritual.id)} hitSlop={6} className="flex-row items-center" >
      <View className={`mr-3 w-6 h-6 rounded-full border-2 ${selected ? 'border-brand-primary' : 'border-text-disabled'}`}>
        {selected && (
          <View className="flex-1 m-0.5 rounded-full bg-brand-primary" />
        )}
      </View>
      <View className="flex-1" pointerEvents="none">
        <RitualCard ritual={ritual} isNavigable={false} />
      </View>
    </Pressable>
  );
}
