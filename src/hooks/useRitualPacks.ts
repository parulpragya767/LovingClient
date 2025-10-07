import { RitualPackControllerApi } from '../api/apis/ritual-pack-controller-api';
import { RitualPackDTO } from '../api/models/ritual-pack-dto';
import { useQuery } from '@tanstack/react-query';

const ritualPackApi = new RitualPackControllerApi();

export const useRitualPacks = () => {
  return useQuery<RitualPackDTO[], Error>({
    queryKey: ['ritualPacks'],
    queryFn: async () => {
      const response = await ritualPackApi.getAll1();
      return response.data;
    },
  });
};

export const useRitualPack = (id?: string) => {
  return useQuery<RitualPackDTO, Error>({
    queryKey: ['ritualPack', id],
    queryFn: async () => {
      if (!id) throw new Error('Ritual Pack ID is required');
      const response = await ritualPackApi.getById1({ id });
      return response.data;
    },
    enabled: !!id,
  });
};
