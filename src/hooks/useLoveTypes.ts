import { LoveLensInfo } from '@/src/models/loveLens';
import { loveLensService } from '@/src/services/loveLensService';
import { useQuery } from '@tanstack/react-query';

export const useLoveTypes = () => {
  return useQuery<LoveLensInfo[], Error>({
    queryKey: ['loveTypes'],
    queryFn: async () => {
      const response = await loveLensService.getAll();
      return response;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};

export const useLoveType = (id?: number) => {
  return useQuery<LoveLensInfo, Error>({
    queryKey: ['loveType', id],
    queryFn: async () => {
      if (!id) throw new Error('Love type ID is required');
      const response = await loveLensService.getById(id);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });
};
