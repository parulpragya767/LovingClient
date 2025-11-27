import { CurrentRituals } from "@/src/models/ritualHistory";
import { ritualHistoryService } from "@/src/services/ritualHistoryService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCurrentRituals = () => {
    const queryClient = useQueryClient();

    const query =  useQuery<CurrentRituals, Error>({
    queryKey: ['current-rituals'],
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
      queryClient.invalidateQueries({ queryKey: ['current-rituals'] })
    ]);
  };

  return {
    ...query,
    invalidateQueries,
  };
};