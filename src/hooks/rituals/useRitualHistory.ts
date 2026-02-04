import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { UserRitual, UserRitualPack } from '@/src/models/ritualHistory';
import { ritualHistoryService } from '@/src/services/ritualHistoryService';
import { useQuery } from '@tanstack/react-query';

export const useRitualHistory = () => {
  return useQuery<UserRitual[], Error>({
    queryKey: ritualKeys.history(),
    queryFn: ritualHistoryService.list,
  });
};

export const useUserRitualPackByRecommendationId = (recommendationId: string) => {
  return useQuery<UserRitualPack, Error>({
    queryKey: ritualKeys.userRitualPackByRecommendationId(recommendationId),
    queryFn: () => ritualHistoryService.findByRecommendationId(recommendationId),
    enabled: !!recommendationId,
  });
};
