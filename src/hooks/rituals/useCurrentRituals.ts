import { ritualKeys } from "@/src/lib/reactQuery/queryKeys";
import { CurrentRituals } from "@/src/models/ritualHistory";
import { ritualHistoryService } from "@/src/services/ritualHistoryService";
import { useQuery } from "@tanstack/react-query";

export const useCurrentRituals = () => {
    return useQuery<CurrentRituals, Error>({
    queryKey: ritualKeys.current(),
    queryFn: ritualHistoryService.listCurrent,
  });
};