import { ThemedText } from '@/components/themes/themed-text';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, View } from 'react-native';

type RitualRecommendationViewCardProps = {
  recommendationId: string;
};

export function RitualRecommendationViewCard({ recommendationId }: RitualRecommendationViewCardProps) {

  const router = useRouter();
  const { data: recommendation, isLoading } = useRitualRecommendation(recommendationId);

  const handlePress = () => {
    if (recommendation?.ritualPackId) {
      router.push(`/rituals/pack/${recommendation.ritualPackId}`);
    }
  };

  return (
    <View className="mt-4 mb-24">
      {isLoading ? (
        <View className="items-center justify-center p-4">
          <ActivityIndicator size="small" color="#7C3AED" />
        </View>
      ) : (
        <Pressable 
          onPress={handlePress} 
          className="w-full"
          disabled={!recommendation?.ritualPackId}
        >
        <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
          <View className="flex-1 mr-3">
            <ThemedText className="text-purple-700 font-semibold text-base">Suggested Ritual Pack</ThemedText>
          </View>
          <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
            <ThemedText className="text-purple-700 text-sm font-medium">Open</ThemedText>
          </View>
        </View>
        </Pressable>
      )}
    </View>
  );
}
