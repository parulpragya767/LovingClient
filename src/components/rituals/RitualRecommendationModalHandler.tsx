import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import { useUserRitualPackByRecommendationId } from '@/src/hooks/rituals/useRitualHistory';
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
  const {data: userRitualPack, isLoading: isLoadingUserRitualPack, error: userRitualPackError} = useUserRitualPackByRecommendationId(isActive ? ritualRecommendationId : '');

  const {showError} = useToast();

  const closeRecommendationFlow = () => {
    setIsRitualRecommendationModalVisible(false);
    setRitualRecommendationId(null);
    setRecommendationChatSessionId(null);
  };

  const isLoading = isLoadingRecommendation || isLoadingUserRitualPack;
  const hasError = recommendationError || userRitualPackError || !ritualRecommendationId;

  useEffect(() => {
    if (!isRitualRecommendationModalVisible) return;

    if (hasError) {
      showError("Couldn’t open the recommendation", "Please try again");
      closeRecommendationFlow();
    }
  }, [hasError, isRitualRecommendationModalVisible]);

  if (!isRitualRecommendationModalVisible) return null;
  if (isLoading) return null;
  if (!recommendation || !userRitualPack) return null;

  return (
    <RitualRecommendationModal
      visible={true}
      ritualRecommendationId={ritualRecommendationId!}
      chatSessionId={recommendationChatSessionId}
      userRitualPack={userRitualPack}
      closeRecommendationFlow={closeRecommendationFlow} 
    />
  );
}
