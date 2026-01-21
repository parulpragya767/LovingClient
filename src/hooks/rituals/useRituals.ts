import { ritualKeys } from '@/src/lib/reactQuery/queryKeys';
import { Ritual } from '@/src/models/rituals';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';

export const useRituals = () => {
  return useQuery<Ritual[], Error>({
    queryKey: ritualKeys.list(),
    queryFn: ritualService.getAll,
  });
};
