import { useQuery } from '@tanstack/react-query';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import type { RitualHistory } from '@/src/models/ritualHistory';

export const useRitualHistory = () => {
  return useQuery<RitualHistory[], Error>({
    queryKey: ['ritual-history'],
    queryFn: async () => {
      const response = await ritualHistoryService.list();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};
