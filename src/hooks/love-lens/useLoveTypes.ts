import { LoveTypeDetail } from '@/src/models/loveLens';
import { loveLensService } from '@/src/services/loveLensService';
import { useQuery } from '@tanstack/react-query';

export const useLoveTypes = () => {
  return useQuery<LoveTypeDetail[], Error>({
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
