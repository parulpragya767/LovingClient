import { AppText } from '@/src/components/ui/AppText';
import { Card } from '@/src/components/ui/Card';
import Tag from '@/src/components/ui/Tag';
import { useRitualTags } from '@/src/hooks/rituals/useRitualTags';
import { Ritual } from '@/src/models/rituals';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Button } from '../ui/Button';

interface RitualCardProps {
  ritual: Ritual;
  isCompact?: boolean;
  isPressable?: boolean;
  onLongPress?: () => void;
}

export default function RitualCard({ 
  ritual, 
  isCompact = false, 
  isPressable = true, 
  onLongPress 
}: RitualCardProps) {
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
      <Card className="border border-border">
        <AppText variant="subtitle" className="mb-1">
          {ritual.title}
        </AppText>
        <AppText variant="small" className="mb-3" numberOfLines={2} ellipsizeMode="tail">
          {ritual.description}
        </AppText>
        <View className="flex-row flex-wrap gap-2 mb-3">
          {getRitualTagDisplayNames(ritual).slice(0, 3).map((label: string, idx: number) => (
            <Tag key={idx} label={label} size={isCompact ? "small" : "regular"}/>
          ))}
        </View>
        
        {isPressable && !isCompact && 
          <View className="flex-row justify-start">
            <Button variant="ghost" onPress={handleRitualPress}>
              View details →
            </Button>
          </View>
        }
      </Card>
    </TouchableOpacity>
  );
}