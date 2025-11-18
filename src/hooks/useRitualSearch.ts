import { ritualService } from '@/src/services/ritualService';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { PageRitual } from '../models/pagination';
import { RitualFilter } from '../models/ritualTags';
import { Ritual } from '../models/rituals';

export function useRitualSearch() {
  const queryClient = useQueryClient();

  // pagination + filter state
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [filter, setFilter] = useState<RitualFilter | undefined>(undefined);

  // --- Query for a single page ---
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useQuery<PageRitual>({
    queryKey: ["ritual-search", filter, page],
    queryFn: () =>
      ritualService.search({ page, size }, filter!),
    enabled: !!filter, // do not run until a filter is set
    placeholderData: prev => prev, // keeps previous page while loading next
  });

  // --- computed merged content (page 0 -> N) ---
  const mergedContent = useMemo(() => {
  if (!filter) return [];

  // determine the highest page index we should try to gather
  // prefer the server 'number' from the current page data; fallback to local `page` state
  const currentPageIndex = data?.number ?? page ?? 0;

  const pages: Ritual[] = [];

  for (let p = 0; p <= currentPageIndex; p++) {
    const pageData = queryClient.getQueryData<PageRitual>([
      "ritual-search",
      filter,
      p,
    ]);
    if (pageData?.rituals) {
      pages.push(...pageData.rituals);
    }
  }

  return pages;
}, [filter, data, queryClient, page]);
  // --- Actions ---

  // Trigger a fresh search (page resets to 0)
  const runSearch = useCallback(
    (newFilter: RitualFilter) => {
      setFilter(newFilter);
      setPage(0);

      return queryClient.fetchQuery({
        queryKey: ["ritual-search", newFilter, 0],
        queryFn: () => ritualService.search({ page: 0, size }, newFilter),
      });
    },
    [queryClient, size]
  );

  // Load next page
  const loadNext = useCallback(() => {
    if (!data || data.last) return;
    setPage((p) => p + 1);
  }, [data]);

  // Reset results
  const clearResults = useCallback(() => {
    setFilter(undefined);
    setPage(0);
  }, []);

  return {
    // state
    page,

    // data
    pageData: data,
    results: mergedContent,

    // flags
    isLoading,
    isFetching,
    error,

    // actions
    runSearch,
    loadNext,
    clearResults,
  };
}
