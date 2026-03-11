import { SubscriptionControllerApi } from '@/src/api/apis/subscription-controller-api';
import { UserControllerApi } from '@/src/api/apis/user-controller-api';
import { Subscription, UsageQuota, type User, UserUpdateRequest } from '@/src/models/user';
import apiClient from '@/src/services/apiClient';

const userApi = new UserControllerApi(undefined, '', apiClient);
const subscriptionApi = new SubscriptionControllerApi(undefined, '', apiClient);

// Initialize the API with our configured axios instance
export const userService = {

  async syncUser(): Promise<User> {
    const response = await userApi.syncUser();
    return response.data as User;
  },

  async updateUser(userData: UserUpdateRequest): Promise<void> {
    await userApi.updateUser({ userUpdateRequest: userData });
  },

  async getUsageQuota(): Promise<UsageQuota> {
    const response = await userApi.getUsage();
    return response.data as UsageQuota;
  },

  async getSubscription(): Promise<Subscription> {
    const response = await subscriptionApi.getSubscription();
    return response.data as Subscription;
  },

  async hasAccessToPremiumFeatures(): Promise<boolean> {
    const response = await subscriptionApi.hasAccessToPremiumFeatures();
    return response.data;
  },

  async hasActiveSubscription(): Promise<boolean> {
    const response = await subscriptionApi.hasActiveSubscription();
    return response.data;
  },
};
