import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import type { RitualPack } from '@/src/models/ritualPacks';
import { ritualPackService } from '@/src/services/ritualPackService';
import { useQuery } from '@tanstack/react-query';

export const useRitualPack = (id: string) => {
  return useQuery<RitualPack, Error>({
    queryKey: ritualKeys.packById(id),
    queryFn: () => ritualPackService.getById(id),
    enabled: !!id,
  });
};