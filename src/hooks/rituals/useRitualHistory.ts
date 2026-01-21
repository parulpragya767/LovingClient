import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { RitualHistory } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useRitualHistory = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery<RitualHistory[], Error>({
    queryKey: ritualKeys.history(),
    queryFn: ritualHistoryService.list,
  });

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ritualKeys.history() }),
    ]);
  };

  return {
    ...query,
    invalidateQueries
  };
};
