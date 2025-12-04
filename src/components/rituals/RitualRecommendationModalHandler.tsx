import RitualRecommendationModal from '@/src/components/rituals/RitualRecommendationModal';
import ErrorState from '@/src/components/states/ErrorState';
import LoadingState from '@/src/components/states/LoadingState';
import { useRitualPack } from '@/src/hooks/rituals/useRitualPack';
import { useRitualRecommendation } from '@/src/hooks/rituals/useRitualRecommendation';
import { useChatStore } from '@/src/store/useChatStore';

export default function RitualRecommendationModalHandler() {
  const ritualRecommendationId = useChatStore((s) => s.ritualRecommendationId);
  const isRitualRecommendationModalVisible = useChatStore((s) => s.isRitualRecommendationModalVisible);
  const { setIsRitualRecommendationModalVisible, setRitualRecommendationId } = useChatStore();

  const { data: recommendation, isLoading: isLoadingRecommendation, error: recommendationError } = useRitualRecommendation(
    isRitualRecommendationModalVisible ? (ritualRecommendationId ?? undefined) : undefined
  );
  const { data: ritualPack, isLoading: isLoadingRitualPack, error: ritualPackError } = useRitualPack(
    isRitualRecommendationModalVisible ? recommendation?.ritualPackId : undefined
  );

  const isRecommendationFlowLoading = isRitualRecommendationModalVisible && (isLoadingRecommendation || isLoadingRitualPack);
  const isRecommendationFlowError = isRitualRecommendationModalVisible && (
    !!recommendationError || !!ritualPackError || !ritualRecommendationId
  );

  const closeRecommendationFlow = () => {
    setIsRitualRecommendationModalVisible(false);
    setRitualRecommendationId(null);
  };

  if (!isRitualRecommendationModalVisible) return null;

  if (isRecommendationFlowLoading) {
    return <LoadingState text="Loading recommendation..." />;
  }

  if (isRecommendationFlowError || !recommendation || !ritualPack) {
    return <ErrorState message="Recommendation not found." onButtonPress={closeRecommendationFlow} />;
  }

  return (
    <RitualRecommendationModal
      visible={true}
      ritualRecommendationId={ritualRecommendationId!}
      ritualPack={ritualPack}
      closeRecommendationFlow={closeRecommendationFlow}
    />
  );
}
