import { useCurrentRituals } from '@/src/hooks/rituals/useCurrentRituals';
import { useRitualHistory } from '@/src/hooks/rituals/useRitualHistory';
import type { BulkRitualHistoryStatusUpdate, RitualHistory, RitualHistoryUpdate } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';

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

  const addBulkRitualsToHistory = async (rituals: RitualHistory[]) => {
    await ritualHistoryService.bulkCreate(rituals);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  const updateRitualStatus = async (id: string, payload: RitualHistoryUpdate) => {
    await ritualHistoryService.updateStatus(id, payload);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  const bulkUpdateRitualsStatus = async (payload: BulkRitualHistoryStatusUpdate) => {
    await ritualHistoryService.bulkUpdateStatus(payload);
    await Promise.all([invalidateHistory(), invalidateCurrentRituals()]);
  };

  return {
    addRitualToCurrent,
    addBulkRitualsToHistory,
    deleteRitualFromCurrent,
    markRitualAsCompleted,
    updateRitualStatus,
    bulkUpdateRitualsStatus,
  };
};
