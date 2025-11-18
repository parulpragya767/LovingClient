import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';
import { RitualTags } from '../models/ritualTags';

export function useRitualTags() {
  return useQuery<RitualTags, Error>({
    queryKey: ["ritual-tags"],
    queryFn: ritualService.getAllTags,
    staleTime: 10 * 60 * 1000,
  });
}
