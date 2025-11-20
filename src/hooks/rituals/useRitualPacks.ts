import type { RitualPack } from '@/src/models/ritualPacks';
import { ritualPackService } from '@/src/services/ritualPackService';
import { useQuery } from '@tanstack/react-query';

export const useRitualPacks = () => {
  return useQuery<RitualPack[], Error>({
    queryKey: ['ritualPacks'],
    queryFn: async () => {
      return ritualPackService.getAll();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};
