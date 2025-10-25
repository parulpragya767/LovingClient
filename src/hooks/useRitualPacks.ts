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

export const useRitualPack = (id?: string) => {
  return useQuery<RitualPack, Error>({
    queryKey: ['ritualPack', id],
    queryFn: async () => {
      if (!id) throw new Error('Ritual Pack ID is required');
      return ritualPackService.getById(id);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};
