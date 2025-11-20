import { Ritual } from '@/src/models/rituals';
import { RitualTags } from '@/src/models/ritualTags';
import { ritualService } from '@/src/services/ritualService';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useRitualTags() {
  const query = useQuery<RitualTags, Error>({
    queryKey: ["ritual-tags"],
    queryFn: ritualService.getAllTags,
    staleTime: 10 * 60 * 1000,
  });

  // Helper function to get display names of tags for a ritual
  const getRitualTagDisplayNames = useMemo(() => {
    return (ritual: Ritual): string[] => {
      if (!query.data) return [];
      const { loveTypes, ritualModes, timeTaken } = query.data;
      const displayNames: string[] = [];

      // Add love types
      if (ritual.loveTypes && loveTypes?.values?.length) {
        const tags = loveTypes.values;
        ritual.loveTypes.forEach(lt => {
          const found = tags.find(tv => tv.key === lt);
          if (found) displayNames.push(found.displayName);
        });
      }

      // Add ritual mode
      if (ritual.ritualMode && ritualModes?.values?.length) {
        const found = ritualModes.values.find(rm => rm.key === ritual.ritualMode);
        if (found) displayNames.push(found.displayName);
      }

      // Add time taken
      if (ritual.timeTaken && timeTaken?.values?.length) {
        const found = timeTaken.values.find(tt => tt.key === ritual.timeTaken);
        if (found) displayNames.push(found.displayName);
      }

      return displayNames;
    };
  }, [query.data]);

  return {
    ...query,
    getRitualTagDisplayNames
  };
}
