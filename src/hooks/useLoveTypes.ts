import { useQuery } from '@tanstack/react-query';
import { LoveTypeControllerService } from '@/src/api/services/LoveTypeControllerService';
import { LoveTypeInfo } from '@/src/api/models/LoveTypeInfo';

export const useLoveTypes = () => {
  return useQuery<LoveTypeInfo[], Error>({
    queryKey: ['loveTypes'],
    queryFn: async () => {
      const response = await LoveTypeControllerService.getAllLoveTypes();
      return response;
    },
  });
};

export const useLoveType = (id?: number) => {
  return useQuery<LoveTypeInfo, Error>({
    queryKey: ['loveType', id],
    queryFn: async () => {
      if (!id) throw new Error('Love type ID is required');
      const response = await LoveTypeControllerService.getLoveTypeById(id);
      return response;
    },
    enabled: !!id,
  });
};
