import { RecommendationStatus } from '@/src/api/models/recommendation-status';
import { ActionTile } from '@/src/components/ui/ActionTile';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { RitualPack } from '@/src/models/ritualPacks';
import { useChatStore } from '@/src/store/useChatStore';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

type RitualRecommendationHandlerProps = {
  recommendationId: string;
};

export function RitualRecommendationHandler({ 
  recommendationId, 
}: RitualRecommendationHandlerProps) {
  const router = useRouter();
  const { data: recommendation } = 
    useRitualRecommendation(recommendationId);
  
  const { data: ritualPack } = useRitualPack(
    recommendation?.ritualPackId || ''
  );

  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();

  const setRitualRecommendationModalStates = () => {
    setIsRitualRecommendationModalVisible(true);
    setRitualRecommendationId(recommendationId);
  };

  const navigateToRitualPackPage = (ritualPack: RitualPack) => {
    router.push(`/rituals/pack/${ritualPack.id}`);
  }
  
  if (!recommendation || !ritualPack) {
    return null;
  }

  const isSuggestedOrViewed = [
    RecommendationStatus.Suggested,
    RecommendationStatus.Viewed
  ].includes(recommendation.status as any);
  
  const isAddedOrSkipped = [
    RecommendationStatus.Added,
    RecommendationStatus.Skipped
  ].includes(recommendation.status as any);

  return (
    <View className="my-2 w-full self-start">
      {isSuggestedOrViewed && (
        <ActionTile
          title={ritualPack.title || 'Suggested Ritual Pack'}
          subtitle={`${ritualPack.rituals?.length ?? 0} rituals to strengthen your connection`}
          onPress={setRitualRecommendationModalStates}
        />
      )}
      {isAddedOrSkipped && (
        <ActionTile
          title='Suggested Ritual Pack'
          subtitle={ritualPack.title}
          onPress={() => navigateToRitualPackPage(ritualPack)}
        />
      )}
    </View>
  );
}