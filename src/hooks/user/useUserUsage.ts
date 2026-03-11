import { userKeys } from '@/src/lib/reactQuery/queryKeys';
import { UsageQuota } from '@/src/models/user';
import { userService } from '@/src/services/userService';
import { useQuery } from '@tanstack/react-query';

export const useUserUsage = () => {
  return useQuery<UsageQuota, Error>({
    queryKey: userKeys.usage(),
    queryFn: () => userService.getUsageQuota(),
  });
};
