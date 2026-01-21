import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { RitualHistory } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { useQuery } from '@tanstack/react-query';

export const useRitualHistory = () => {
  return useQuery<RitualHistory[], Error>({
    queryKey: ritualKeys.history(),
    queryFn: ritualHistoryService.list,
  });
};
