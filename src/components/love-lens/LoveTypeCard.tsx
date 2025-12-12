import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

interface LoveTypeCardProps {
  loveTypeDetail: LoveTypeDetail;
  isCompact?: boolean;
}

export default function LoveTypeCard({ 
  loveTypeDetail, 
  isCompact = false
}: LoveTypeCardProps) {
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
          {!isCompact && (
            <Button variant="ghost" onPress={handleLoveTypePress}>
              Learn more →
            </Button>
          )}
        </View>
      </Card>
    </Pressable>
  );
}
