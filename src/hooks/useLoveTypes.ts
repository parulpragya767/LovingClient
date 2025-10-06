import { LoveTypeControllerApi } from '@/src/api/apis/love-type-controller-api';
import { LoveTypeInfo } from '@/src/api/models/love-type-info';
import { useQuery } from '@tanstack/react-query';

const loveTypeApi = new LoveTypeControllerApi();

export const useLoveTypes = () => {
  return useQuery<LoveTypeInfo[], Error>({
    queryKey: ['loveTypes'],
    queryFn: async () => {
      const response = await loveTypeApi.getAllLoveTypes();
      return response.data;
    },
  });
};

export const useLoveType = (id?: number) => {
  return useQuery<LoveTypeInfo, Error>({
    queryKey: ['loveType', id],
    queryFn: async () => {
      if (!id) throw new Error('Love type ID is required');
      const response = await loveTypeApi.getLoveTypeById({ id });
      return response.data;
    },
    enabled: !!id,
  });
};
