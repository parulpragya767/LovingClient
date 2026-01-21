import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { chatKeys, ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import { RecommendationStatus, RitualHistoryStatus } from '@/src/models/enums';
import type { RitualHistoryCreateRequest, RitualHistoryUpdate } from '@/src/models/ritualHistory';
import type { RitualRecommendationUpdate, RitualStatusUpdate } from '@/src/models/ritualRecommendation';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { ritualRecommendationService } from '@/src/services/ritualRecommendationService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRitualActions = () => {
  const queryClient = useQueryClient();

  const { data: currentRituals } = useCurrentRituals();

  const isCurrentRitual = (id: string): boolean => {
    if (!currentRituals) return false;
    
    // Check in individual rituals
    const isInIndividualRituals = currentRituals.individualRituals.some(ritual => ritual.ritualId === id);
    if (isInIndividualRituals) return true;
    
    // Check in ritual packs
    return currentRituals.ritualPacks.some(pack => 
      pack.rituals.some(ritual => ritual.ritualId === id)
    );
  };

  const addRitualToCurrent = useMutation({
    mutationFn: (ritualId: string) => {
      const ritualHistory: RitualHistoryCreateRequest = {
        ritualId,
        status: RitualHistoryStatus.Active
      }
      return ritualHistoryService.create(ritualHistory);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ritualKeys.current() });
    },

    onError: (error) => {
      console.error('Failed to add ritual to current', error);
    },
  });

  const deleteRitualFromCurrent = useMutation({
    mutationFn: (id: string) => ritualHistoryService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ritualKeys.current() });
    },

    onError: (error) => {
      console.error('Failed to delete ritual', error);
    },
  });

  const markRitualAsCompleted = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RitualHistoryUpdate }) =>
      ritualHistoryService.complete(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ritualKeys.current() });
      queryClient.invalidateQueries({ queryKey: ritualKeys.history() });
    },

    onError: (error) => {
      console.error('Failed to complete ritual', error);
    },
  });

  const updateRecommendationAndHistoryStatus = useMutation({
    mutationFn: async ({
      recommendationId,
      sessionId,
      status,
      selectedRitualIds,
      skippedRitualIds,
    }: {
      recommendationId: string;
      sessionId: string | null;
      status: RecommendationStatus;
      selectedRitualIds: string[];
      skippedRitualIds: string[];
    }) => {
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

      return await ritualRecommendationService.update(recommendationId, recommendationUpdate);
    },

    onSuccess: (_data, variables) => {
      const { sessionId, recommendationId } = variables;
      if (sessionId) {
        queryClient.invalidateQueries({ queryKey: chatKeys.messages(sessionId) });
      }
      queryClient.invalidateQueries({ queryKey: ritualKeys.recommendationsById(recommendationId) });
      queryClient.invalidateQueries({ queryKey: ritualKeys.current() });
    },

    onError: (error) => {
      console.error('Failed to update recommendation and history status', error);
    },
  });

  const getCurrentRitualPackById = (packId: string) => {
    if (!currentRituals) return undefined;
    return currentRituals.ritualPacks.find(pack => pack.ritualPackId === packId);
  };

  return {
    isCurrentRitual,
    addRitualToCurrent,
    deleteRitualFromCurrent,
    markRitualAsCompleted,
    updateRecommendationAndHistoryStatus,
    getCurrentRitualPackById,
  };
};
