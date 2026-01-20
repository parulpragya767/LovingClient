import { RitualFilter } from '@/src/models/ritualTags';
import { ritualService } from '@/src/services/ritualService';
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export function useRitualSearch(filter: RitualFilter) {
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: ["ritual-search", filter],

    queryFn: async ({ pageParam = 0 }) => {
      const res = await ritualService.search({ page: pageParam, size: 10 }, filter);
      const pageNumber = res.page?.number ?? 0;
      const totalPages = res.page?.totalPages ?? 0;
      
      return {
        rituals: res.rituals,
        page: pageNumber,
        hasMore: pageNumber < totalPages - 1,
      };
    },

    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,

    initialPageParam: 0,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
  });

  const rituals = query.data?.pages.flatMap((p) => p.rituals) ?? [];

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
      refetch: query.refetch,
      refresh,
    },

    loading: {
      isLoading: query.isLoading,
      isFetchingNextPage: query.isFetchingNextPage,
      isRefetching: query.isRefetching,
    },

    meta: {
      hasNextPage: query.hasNextPage,
      error: query.error,
    },
  };
}
