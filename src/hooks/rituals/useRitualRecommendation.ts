import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import { RitualRecommendation } from '@/src/models/ritualRecommendation';
import { ritualRecommendationService } from '@/src/services/ritualRecommendationService';
import { useQuery } from '@tanstack/react-query';

export const useRitualRecommendation = (id: string) => {
  const query = useQuery<RitualRecommendation, Error>({
    queryKey: ritualKeys.recommendationsById(id),
    queryFn: () => ritualRecommendationService.getById(id as string),
    enabled: !!id,
  });

  return {
    ...query,
  };
};