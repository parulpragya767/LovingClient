import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import { EmojiFeedback, RecommendationStatus, RitualHistoryStatus } from '@/src/models/enums';
import type { RitualHistory, RitualHistoryUpdate } from '@/src/models/ritualHistory';
import type { RitualRecommendationUpdate, RitualStatusUpdate } from '@/src/models/ritualRecommendation';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { ritualRecommendationService } from '@/src/services/ritualRecommendationService';

export const EMOJIS = ['❤️', '😊', '😐', '😢', '😠', '🔥', '👍', '👎'] as const;

export const useRitualActions = () => {
  const { invalidateQueries: invalidateHistory } = useRitualHistory();
  const { data: currentRituals, invalidateQueries: invalidateCurrentRituals } = useCurrentRituals();

  const isCurrentRitual = (id: string): boolean => {
    if (!currentRituals) return false;
    
    // Check in individual rituals
    const isInIndividualRituals = currentRituals.rituals.some(ritual => ritual.ritualId === id);
    if (isInIndividualRituals) return true;
    
    // Check in ritual packs
    return currentRituals.ritualPacks.some(pack => 
      pack.rituals.some(ritual => ritual.ritualId === id)
    );
  };

  const addRitualToCurrent = async (payload: RitualHistory) => {
    await ritualHistoryService.create(payload);
    await Promise.all([invalidateCurrentRituals()]);
  };

  const deleteRitualFromCurrent = async (id: string) => {
    await ritualHistoryService.delete(id);
    await Promise.all([invalidateCurrentRituals()]);
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
    await Promise.all([invalidateCurrentRituals()]);
  };

  const mapUnicodeToEmojiFeedback = (emoji: string): EmojiFeedback | undefined => {
    switch (emoji) {
      case '❤️':
        return EmojiFeedback.Heart;
      case '😊':
        return EmojiFeedback.Smile;
      case '😐':
        return EmojiFeedback.Neutral;
      case '😢':
        return EmojiFeedback.Sad;
      case '😠':
        return EmojiFeedback.Angry;
      case '🔥':
        return EmojiFeedback.Fire;
      case '👍':
        return EmojiFeedback.ThumbsUp;
      case '👎':
        return EmojiFeedback.ThumbsDown;
      default:
        return undefined;
    }
  };

  return {
    EMOJIS,
    mapUnicodeToEmojiFeedback,
    isCurrentRitual,
    addRitualToCurrent,
    deleteRitualFromCurrent,
    markRitualAsCompleted,
    updateRecommendationAndHistoryStatus,
  };
};
