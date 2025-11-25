import { RitualRecommendation } from '@/src/models/ritualRecommendation';
import { ritualRecommendationService } from '@/src/services/ritualRecommendationService';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useRitualRecommendation = (id?: string) => {
  const queryClient = useQueryClient();

  const query = useQuery<RitualRecommendation, Error>({
    queryKey: ['ritualRecommendation', id],
    queryFn: async () => {
      if (!id) throw new Error('Ritual recommendation ID is required');
      const response = await ritualRecommendationService.getById(id);
      return response;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ['ritualRecommendation', id] }),
    ]);
  };

  return {
    ...query,
    invalidateQueries
  };
};