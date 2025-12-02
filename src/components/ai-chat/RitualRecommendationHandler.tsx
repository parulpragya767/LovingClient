import { RecommendationStatus } from '@/src/api/models/recommendation-status';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { useChatStore } from '@/src/store/useChatStore';
import { View } from 'react-native';
import { RitualRecommendationSelectionCard } from './RitualRecommendationSelectionCard';
import { RitualRecommendationViewCard } from './RitualRecommendationViewCard';

type RitualRecommendationHandlerProps = {
  recommendationId: string;
};

export function RitualRecommendationHandler({ 
  recommendationId, 
}: RitualRecommendationHandlerProps) {
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
        <RitualRecommendationSelectionCard 
          ritualPack={ritualPack} 
          onPress={setRitualRecommendationModalStates} 
        />
      )}
      {isAddedOrSkipped && (
        <RitualRecommendationViewCard ritualPack={ritualPack} />
      )}
    </View>
  );
}