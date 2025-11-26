import { ThemedText } from '@/src/components/themes/themed-text';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

type RitualRecommendationConsentCardProps = {
  onPress: () => void;
};

export function RitualRecommendationConsentCard({ onPress }: RitualRecommendationConsentCardProps) {
  return (
    <TouchableOpacity 
      className="bg-blue-50 p-4 rounded-lg self-start max-w-[80%] mb-4 border border-blue-100"
      onPress={onPress}
    >
      <View className="flex-row items-start">
        <View className="bg-blue-100 rounded-full w-6 h-6 items-center justify-center mr-2">
          <MaterialIcons name="check" size={16} color="#3b82f6" />
        </View>
        <View className="flex-1">
          <ThemedText className="text-sm text-gray-800">
            Would you like me to recommend a personalized ritual pack based on our conversation?
          </ThemedText>
          <ThemedText className="text-blue-500 text-sm mt-1 font-medium">
            Show me recommendations
          </ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
