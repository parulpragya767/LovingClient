import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { LoveLensInfo } from '@/src/models/loveLens';
import { TouchableOpacity } from 'react-native';

interface LoveTypeCardProps {
  loveType: LoveLensInfo;
  onPress: (id: number) => void;
}

export default function LoveTypeCard({ loveType, onPress }: LoveTypeCardProps) {
  return (
    <TouchableOpacity 
      onPress={() => loveType.id !== undefined && onPress(loveType.id)} 
      activeOpacity={0.8}
      testID={`love-type-${loveType.id}`}
    >
      <ThemedView className="bg-white rounded-xl p-4 mx-4 my-2 border border-gray-200 shadow-md">
        <ThemedText className="text-gray-800 text-lg font-semibold mb-2">
          {loveType.title}
        </ThemedText>
        <ThemedText 
          className="text-gray-600 mb-1"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {loveType.description}
        </ThemedText>
        <ThemedText className="text-blue-500 text-sm mt-2">
          Learn more →
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}