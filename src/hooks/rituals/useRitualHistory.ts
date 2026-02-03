import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { UserRitual } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { useQuery } from '@tanstack/react-query';

export const useRitualHistory = () => {
  return useQuery<UserRitual[], Error>({
    queryKey: ritualKeys.history(),
    queryFn: ritualHistoryService.list,
  });
};
