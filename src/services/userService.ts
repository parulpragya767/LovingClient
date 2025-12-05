import { UserControllerApi } from '@/src/api/apis/user-controller-api';
import type { UserDTO } from '@/src/api/models/user-dto';
import { type User } from '@/src/models/user';
import apiClient from './apiClient';

const api = new UserControllerApi(undefined, '', apiClient);

export const userService = {

  async syncUser(): Promise<User> {
    const response = await api.syncUser();
    return response.data as User;
  },

  async updateUser(userData: Partial<User>): Promise<User> {
    const response = await api.updateUser({ userDTO: userData as UserDTO });
    return response.data as User;
  },
};
