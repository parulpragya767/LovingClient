import { AppText } from '@/src/components/ui/AppText';
import { Button } from '@/src/components/ui/Button';
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
      <View className="rounded-card shadow-card bg-surface-elevated border border-border overflow-hidden">

        {/* Header */}
        <View className="flex-row items-center justify-between bg-brand-subtle rounded-t-card px-4 py-2">
          <AppText variant="subtitle">
            {loveTypeDetail.title || 'Love Type'}
          </AppText>

          <Button variant="ghost" onPress={handleLoveTypePress}>→</Button>
        </View>

        {/* Body */}
        <View className="px-4 py-3">
          <AppText variant="small" numberOfLines={2} ellipsizeMode="tail">
            {loveTypeDetail.subtitle}
          </AppText>
        </View>

      </View>
    </Pressable>
  );
}
