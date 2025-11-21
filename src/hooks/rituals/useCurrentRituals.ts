import { CurrentRituals } from "@/src/models/ritualHistory";
import { ritualHistoryService } from "@/src/services/ritualHistoryService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCurrentRituals = () => {
    const queryClient = useQueryClient();

    const query =  useQuery<CurrentRituals, Error>({
    queryKey: ['ritual-history', 'current'],
    queryFn: async () => {
      const response = await ritualHistoryService.listCurrent();
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
      queryClient.invalidateQueries({ queryKey: ['ritual-history', 'current'] })
    ]);
  };

  const isCurrentRitual = (ritualId: string): boolean => {
    if (!query.data) return false;
    return query.data.ritualHistoryMap.has(ritualId);
  };

  return {
    ...query,
    invalidateQueries,
    isCurrentRitual
  };
};