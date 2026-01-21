import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { RitualPack } from '@/src/models/ritualPacks';
import { ritualPackService } from '@/src/services/ritualPackService';
import { useQuery } from '@tanstack/react-query';

export const useRitualPacks = () => {
  return useQuery<RitualPack[], Error>({
    queryKey: ritualKeys.packs(),
    queryFn: ritualPackService.getAll,
  });
};
