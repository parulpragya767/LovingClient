import { UserControllerApi } from '@/src/api/apis/user-controller-api';
import { type User } from '@/src/models/user';
import apiClient from './apiClient';

const api = new UserControllerApi(undefined, '', apiClient);

export const userService = {

  async syncUser(): Promise<User> {
    const response = await api.syncUser();
    return response.data as User;
  },

  async updateUser(userData: { displayName?: string }): Promise<void> {
    await api.updateUser({ userUpdateRequest: userData });
  },
};
