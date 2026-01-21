import { loveTypeKeys } from '@/src/lib/reactQuery/queryKeys';
import { LoveTypeDetail } from '@/src/models/loveLens';
import { loveLensService } from '@/src/services/loveLensService';
import { useQuery } from '@tanstack/react-query';

export const useLoveTypes = () => {
  return useQuery<LoveTypeDetail[], Error>({
    queryKey: loveTypeKeys.list(),
    queryFn: loveLensService.getAll,
  });
};
