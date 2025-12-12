import { Card } from '@/src/components/ui/Card';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { AppText } from '../ui/AppText';

interface LoveTypeCardProps {
  loveTypeDetail: LoveTypeDetail;
}

export default function LoveTypeCard({ loveTypeDetail }: LoveTypeCardProps) {
  const router = useRouter();

  const handleLoveTypePress = () => {
    router.push(`/love-lens/${loveTypeDetail.loveType}`);
  };

  return (
    <Pressable 
      onPress={handleLoveTypePress}
    >
      <Card className="border border-border">
        <View className="flex-column items-left">
          <AppText variant="subtitle" className="mb-1">
            {loveTypeDetail.title || 'Love Type'}
          </AppText>   
          <AppText variant="small" className="mb-2" numberOfLines={2} ellipsizeMode="tail">
            {loveTypeDetail.description}
          </AppText>
          <AppText variant="small" className="text-action-ghost-text">
            Learn more →
          </AppText>
        </View>
      </Card>
    </Pressable>
  );
}
