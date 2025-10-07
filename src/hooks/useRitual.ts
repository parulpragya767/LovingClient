import { RitualControllerApi } from '../api/apis/ritual-controller-api';
import { RitualDTO } from '../api/models/ritual-dto';
import { useQuery } from '@tanstack/react-query';

const ritualApi = new RitualControllerApi();

export const useRitual = (id?: string) => {
  return useQuery<RitualDTO, Error>({
    queryKey: ['ritual', id],
    queryFn: async () => {
      if (!id) throw new Error('Ritual ID is required');
      const response = await ritualApi.getById({ id });
      return response.data;
    },
    enabled: !!id,
  });
};
