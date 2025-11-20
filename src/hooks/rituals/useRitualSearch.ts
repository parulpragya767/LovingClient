import { ritualService } from '@/src/services/ritualService';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { RitualFilter } from '../../models/ritualTags';

export function useRitualSearch(filter: RitualFilter) {
  const queryClient = useQueryClient();

  // --- Query for a single page ---
  const query = useInfiniteQuery({
    queryKey: ["ritual-search", filter],

    queryFn: async ({ pageParam = 0 }) => {
      const res = await ritualService.search({ page: pageParam, size: 20 }, filter);

      return {
        rituals: res.rituals,
        hasMore: !res.last,
      };
    },

    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,

    initialPageParam: 0,
  });

  // merged content for UI
  const rituals = query.data?.pages.flatMap((p) => p.rituals) ?? [];

  // convenience actions
  const refresh = useCallback(() => {
    queryClient.invalidateQueries(
      {
        queryKey: ["ritual-search", filter],
      }
    );
  }, [queryClient, filter]);

  return {
    rituals,
    pages: query.data?.pages ?? [],

    actions: {
      loadMore: query.fetchNextPage,
      refresh,
    },

    loading: {
      isLoading: query.isLoading,
      isFetchingNextPage: query.isFetchingNextPage,
      isRefetching: query.isRefetching,
    },

    meta: {
      hasNextPage: query.hasNextPage,
    },
  };
}
