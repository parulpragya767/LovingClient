import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

interface LoveTypeCardProps {
  loveTypeDetail: LoveTypeDetail;
}

export default function LoveTypeCard({ 
  loveTypeDetail, 
}: LoveTypeCardProps) {
  const router = useRouter();

  const handleLoveTypePress = () => {
    router.push(`/love-lens/${loveTypeDetail.loveType}`);
  };

  return (
    <Pressable onPress={handleLoveTypePress}>
      <Card className="border border-border">
        {/* Title row */}
        <View className="flex-row items-center justify-between mb-1">
          <AppText variant="subtitle">
            {loveTypeDetail.title || 'Love Type'}
          </AppText>

          <Button variant="ghost" onPress={handleLoveTypePress}>→</Button>
        </View>

        {/* Description */}
        <AppText variant="small" numberOfLines={2} ellipsizeMode="tail">
          {loveTypeDetail.description}
        </AppText>
      </Card>
    </Pressable>
  );
}
