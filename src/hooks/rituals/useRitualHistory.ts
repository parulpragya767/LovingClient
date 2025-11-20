import type { RitualHistory } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useRitualHistory = () => {
  const queryClient = useQueryClient();
  
  const query = useQuery<RitualHistory[], Error>({
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

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['ritual-history'] }),
    ]);
  };

  return {
    ...query,
    invalidateQueries
  };
};
