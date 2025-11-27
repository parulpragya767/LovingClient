import { ThemedText } from '@/src/components/themes/themed-text';
import { LoveLensInfo } from '@/src/models/loveLens';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

interface LoveTypeCardProps {
  loveType: LoveLensInfo;
}

export default function LoveTypeCard({ loveType }: LoveTypeCardProps) {
  const router = useRouter();

  const handleLoveTypePress = () => {
    router.push(`/love-lens/${loveType.loveType}`);
  };

  return (
    <Pressable 
      onPress={handleLoveTypePress}
      className="bg-white rounded-xl px-4 py-3 mb-3 shadow-sm"
    >
      <View className="flex-column items-left">
        <ThemedText className="text-blue-600 text-lg font-bold">
          {loveType.title || 'Love Type'}
        </ThemedText>   
        <ThemedText className="text-gray-800 text-base" numberOfLines={2} ellipsizeMode="tail">
          {loveType.description}
        </ThemedText>
      <ThemedText className="text-blue-500 text-sm mt-2">
        Learn more →
      </ThemedText>
      </View>
    </Pressable>
  );
}
