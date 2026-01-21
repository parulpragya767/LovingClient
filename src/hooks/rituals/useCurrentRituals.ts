import { ritualKeys } from "@/src/lib/reactQuery/queryKeys";
import { CurrentRituals } from "@/src/models/ritualHistory";
import { ritualHistoryService } from "@/src/services/ritualHistoryService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useCurrentRituals = () => {
    const queryClient = useQueryClient();

    const query =  useQuery<CurrentRituals, Error>({
    queryKey: ritualKeys.current(),
    queryFn: ritualHistoryService.listCurrent,
  });

  const invalidateQueries = () => {
    return Promise.all([
      queryClient.invalidateQueries({ queryKey: ritualKeys.current() })
    ]);
  };

  return {
    ...query,
    invalidateQueries,
  };
};