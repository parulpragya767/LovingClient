import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { useToast } from '@/src/hooks/ui/useToast';
import { useChatStore } from '@/src/store/useChatStore';
import { useEffect } from 'react';

export default function RitualRecommendationModalHandler() {
  const {
    ritualRecommendationId,
    isRitualRecommendationModalVisible,
    recommendationChatSessionId,
    setIsRitualRecommendationModalVisible,
    setRitualRecommendationId,
    setRecommendationChatSessionId,
  } = useChatStore();

  const isActive = isRitualRecommendationModalVisible && !!ritualRecommendationId;

  const {data: recommendation, isLoading: isLoadingRecommendation, error: recommendationError} = useRitualRecommendation(isActive ? ritualRecommendationId : '');
  const {data: ritualPack, isLoading: isLoadingRitualPack, error: ritualPackError} = useRitualPack(recommendation?.ritualPackId ?? '');

  const {showError} = useToast();

  const closeRecommendationFlow = () => {
    setIsRitualRecommendationModalVisible(false);
    setRitualRecommendationId(null);
    setRecommendationChatSessionId(null);
  };

  const isLoading = isLoadingRecommendation || isLoadingRitualPack;
  const hasError = recommendationError || ritualPackError || !ritualRecommendationId;

  useEffect(() => {
    if (!isRitualRecommendationModalVisible) return;

    if (hasError) {
      showError("Couldn’t open the recommendation", "Please try again");
      closeRecommendationFlow();
    }
  }, [hasError, isRitualRecommendationModalVisible]);

  if (!isRitualRecommendationModalVisible) return null;
  if (isLoading) return null;
  if (!recommendation || !ritualPack) return null;

  return (
    <RitualRecommendationModal
      visible={true}
      ritualRecommendationId={ritualRecommendationId!}
      chatSessionId={recommendationChatSessionId}
      ritualPack={ritualPack}
      closeRecommendationFlow={closeRecommendationFlow} 
    />
  );
}
