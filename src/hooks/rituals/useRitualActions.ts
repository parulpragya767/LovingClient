import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import { RecommendationStatus, RitualHistoryStatus } from '@/src/models/enums';
import type { RitualHistory, RitualHistoryUpdate } from '@/src/models/ritualHistory';
import type { RitualRecommendationUpdate, RitualStatusUpdate } from '@/src/models/ritualRecommendation';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { ritualRecommendationService } from '@/src/services/ritualRecommendationService';

export const useRitualActions = () => {
  const { invalidateQueries: invalidateHistory } = useRitualHistory();
  const { invalidateQueries: invalidateCurrentRituals } = useCurrentRituals();

  const addRitualToCurrent = async (payload: RitualHistory) => {
    await ritualHistoryService.create(payload);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  const deleteRitualFromCurrent = async (id: string) => {
    await ritualHistoryService.delete(id);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  const markRitualAsCompleted = async (id: string, payload: RitualHistoryUpdate) => {
    await ritualHistoryService.complete(id, payload);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  const updateRecommendationAndHistoryStatus = async (
    recommendationId: string,
    status: RecommendationStatus,
    selectedRitualIds: string[],
    skippedRitualIds: string[]
  ) => {
    const selectedUpdates: RitualStatusUpdate[] = selectedRitualIds.map(ritualId => ({
      ritualId,
      status: RitualHistoryStatus.Active,
    }));

    const skippedUpdates: RitualStatusUpdate[] = skippedRitualIds.map(ritualId => ({
      ritualId,
      status: RitualHistoryStatus.Skipped,
    }));

    const recommendationUpdate: RitualRecommendationUpdate = {
      status,
      ritualStatusUpdates: [...selectedUpdates, ...skippedUpdates],
    };

    await ritualRecommendationService.update(recommendationId, recommendationUpdate);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  return {
    addRitualToCurrent,
    deleteRitualFromCurrent,
    markRitualAsCompleted,
    updateRecommendationAndHistoryStatus,
  };
};
