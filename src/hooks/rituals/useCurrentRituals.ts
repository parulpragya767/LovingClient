import { ritualKeys } from "@/src/lib/reactQuery/queryKeys";
import { CurrentRituals } from "@/src/models/ritualHistory";
import { Ritual } from "@/src/models/rituals";
import { ritualHistoryService } from "@/src/services/ritualHistoryService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useCurrentRituals = () => {
    const query = useQuery<CurrentRituals, Error>({
    queryKey: ritualKeys.current(),
    queryFn: ritualHistoryService.listCurrent,
  });

  const getMergedCurrentRituals = useMemo(() => {
    return (): Ritual[] => {
      if (!query.data) return [];
      
      const ritualMap = new Map<string, Ritual>();
      
      // Add rituals from individualRituals
      query.data.individualRituals?.forEach(ritual => {
        ritualMap.set(ritual.ritualId, ritual.ritual);
      });
      
      // Add rituals from each ritual pack
      query.data.ritualPacks?.forEach(pack => {
        pack.rituals?.forEach(ritual => {
          ritualMap.set(ritual.ritualId, ritual.ritual);
        });
      });
      
      return Array.from(ritualMap.values());
    };
  }, [query.data]);

  return {
    ...query,
    getMergedCurrentRituals,
  };
};