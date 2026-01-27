import { userService } from '@/src/services/userService';
import { useMutation } from '@tanstack/react-query';

export const useUserActions = () => {
  const updateUser = useMutation({
    mutationFn: (userData: { displayName?: string; onboardingCompleted?: boolean }) =>
      userService.updateUser(userData),

    onError: (error) => {
      console.error('Failed to update user', error);
    },
  });

  const syncUser = useMutation({
    mutationFn: () => userService.syncUser(),

    onError: (error) => {
      console.error('Failed to sync user', error);
    },
  });

  return {
    updateUser,
    syncUser,
  };
};
