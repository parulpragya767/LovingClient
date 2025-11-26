import { RecommendationStatus } from '@/src/api/models/recommendation-status';
import { ThemedText } from '@/src/components/themes/themed-text';
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
  const { data: recommendation, isLoading: isLoadingRecommendation } = 
    useRitualRecommendation(recommendationId);
  
  const { data: ritualPack, isLoading: isLoadingRitualPack } = useRitualPack(
    recommendation?.ritualPackId || ''
  );

  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();

  const setRitualRecommendationModalStates = () => {
    setIsRitualRecommendationModalVisible(true);
    setRitualRecommendationId(recommendationId);
  };

  if (isLoadingRecommendation || isLoadingRitualPack) {
    return (
      <View className="my-1 w-full self-start p-4">
        <ThemedText>Loading recommendation...</ThemedText>
      </View>
    );
  }

  if (!recommendation || !ritualPack) {
    return (
      <View className="my-1 w-full self-start p-4">
        <ThemedText>Recommendation not found</ThemedText>
      </View>
    );
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
    <View className="my-1 w-full self-start">
      {isSuggestedOrViewed && (
        <RitualRecommendationSelectionCard 
          ritualPack={ritualPack} 
          onPress={setRitualRecommendationModalStates} 
        />
      )}
      {isAddedOrSkipped && (
        <RitualRecommendationViewCard ritualPackId={ritualPack.id} />
      )}
    </View>
  );
}