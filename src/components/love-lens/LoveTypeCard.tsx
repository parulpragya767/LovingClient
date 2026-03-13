import { loveTypeTheme } from '@/src/components/themes/loveTypeTheme';
import { AppText } from '@/src/components/ui/AppText';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

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
    <Pressable
      onPress={handleLoveTypePress}
      className="aspect-square rounded-3xl overflow-hidden"
      style={{ aspectRatio: 1 }}
    >
      <LinearGradient
        colors={loveTypeUI.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center justify-center"
      >
        {/* Glow shapes */}
        <View className="absolute w-40 h-40 rounded-full bg-white/20 -top-10 -right-10" />
        <View className="absolute w-32 h-32 rounded-full bg-white/10 -bottom-8 -left-8" />

        {/* <View className="absolute h-28 w-28 rounded-full bg-white/20 -right-6 -top-6" />
        <View className="absolute h-24 w-24 rounded-full bg-white/10 -left-6 -bottom-6" /> */}
        
        {/* Title */}
        <AppText variant="heading" className="text-center px-3" numberOfLines={2}>
          {loveTypeDetail.title || 'Love Type'}
        </AppText>
      </LinearGradient>
    </Pressable>
  );
}
