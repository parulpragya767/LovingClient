import { ThemedText } from '@/src/components/themes/themed-text';
import { RitualPack } from '@/src/models/ritualPacks';
import { Pressable, View } from 'react-native';

type RitualRecommendationSelectionCardProps = {
  ritualPack: RitualPack;
  onPress?: () => void;
};

export function RitualRecommendationSelectionCard({ ritualPack, onPress }: RitualRecommendationSelectionCardProps) {
  return (
    <View className="mt-4 mb-24">
      <Pressable onPress={onPress} className="w-full">
        <View className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex-row items-center">
          <View className="flex-1 mr-3">
            <ThemedText className="text-purple-700 font-semibold text-base">{ritualPack.title || 'Suggested Ritual Pack'}</ThemedText>
            <ThemedText className="text-purple-600 text-sm mt-0.5">
              {ritualPack.rituals?.length || 0} rituals to strengthen your connection
            </ThemedText>
          </View>
          <View className="bg-white rounded-full px-3 py-1 border border-purple-200">
            <ThemedText className="text-purple-700 text-sm font-medium">Open</ThemedText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
