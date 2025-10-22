import { Ritual } from '@/src/models/ritual';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';

export const useRituals = () => {
  return useQuery<Ritual[], Error>({
    queryKey: ['rituals'],
    queryFn: async () => {
      const response = await ritualService.getAll();
      return response;
    },
  });
};

export const useRitual = (id?: string) => {
  return useQuery<Ritual, Error>({
    queryKey: ['ritual', id],
    queryFn: async () => {
      if (!id) throw new Error('Ritual ID is required');
      const response = await ritualService.getById(id);
      return response;
    },
    enabled: !!id,
  });
};
