import { Ritual } from '@/src/models/rituals';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';

export const useRituals = () => {
  return useQuery<Ritual[], Error>({
    queryKey: ['rituals'],
    queryFn: async () => {
      const response = await ritualService.getAll();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};
