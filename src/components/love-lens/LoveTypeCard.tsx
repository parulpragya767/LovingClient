import { loveTypeTheme } from '@/src/components/themes/loveTypeTheme';
import { AnimatedPressable } from '@/src/components/ui/AnimatedPressable';
import { AppText } from '@/src/components/ui/AppText';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

interface LoveTypeCardProps {
  loveTypeDetail: LoveTypeDetail;
}

export default function LoveTypeCard({ 
  loveTypeDetail, 
}: LoveTypeCardProps) {
  const router = useRouter();
  const loveTypeUI = loveTypeTheme[loveTypeDetail.loveType];

  const handleLoveTypePress = () => {
    router.push(`/love-lens/${loveTypeDetail.loveType}`);
  };

  return (
    <AnimatedPressable
      onPress={handleLoveTypePress}
      contentClassName="aspect-square rounded-3xl overflow-hidden shadow-sm"
    >
      <LinearGradient
        colors={loveTypeUI.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center px-3">
          <AppText variant="heading" className="text-center">
            {loveTypeDetail.title}
          </AppText>
        </View>
      </LinearGradient>
    </AnimatedPressable>
  );
}
