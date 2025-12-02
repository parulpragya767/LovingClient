import { ThemedText } from '@/src/components/themes/themed-text';
import { RitualPack } from '@/src/models/ritualPacks';
import { useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

type RitualRecommendationViewCardProps = {
  ritualPack: RitualPack;
};

export function RitualRecommendationViewCard({ ritualPack }: RitualRecommendationViewCardProps) {

  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/rituals/pack/${ritualPack.id}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="w-full">
      <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
        <View className="flex-1 mr-3">
          <ThemedText className="text-purple-700 font-semibold text-base">
            Suggested Ritual Pack
          </ThemedText>
          <ThemedText className="text-purple-600 text-sm mt-0.5">
            {ritualPack.title}
          </ThemedText>
        </View>
        <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
          <ThemedText className="text-purple-700 text-sm font-medium">Open</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
