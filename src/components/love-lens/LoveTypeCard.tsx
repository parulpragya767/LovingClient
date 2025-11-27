import { ThemedText } from '@/src/components/themes/themed-text';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

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
      className="bg-white rounded-xl px-4 py-3 mb-3 shadow-sm"
    >
      <View className="flex-column items-left">
        <ThemedText className="text-blue-600 text-lg font-bold">
          {loveTypeDetail.title || 'Love Type'}
        </ThemedText>   
        <ThemedText className="text-gray-800 text-base" numberOfLines={2} ellipsizeMode="tail">
          {loveTypeDetail.description}
        </ThemedText>
      <ThemedText className="text-blue-500 text-sm mt-2">
        Learn more →
      </ThemedText>
      </View>
    </Pressable>
  );
}
