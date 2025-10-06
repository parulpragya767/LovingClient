import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes (renamed from cacheTime in newer versions)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
