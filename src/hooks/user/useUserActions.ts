import { UserUpdateRequest } from '@/src/models/user';
import { userService } from '@/src/services/userService';
import { useUserStore } from '@/src/store/useUserStore';
import { useMutation } from '@tanstack/react-query';

export const useUserActions = () => {
  const setOnboardingCompleted = useUserStore(s => s.setOnboardingCompleted);
  
  const markOnboardingCompleted = useMutation({
    mutationFn: () => {
      const userData: UserUpdateRequest = {
        onboardingCompleted: true,
      }
      return userService.updateUser(userData);
    },

    onSuccess: () => {
      setOnboardingCompleted(true);
    },

    onError: (error) => {
      setOnboardingCompleted(true);
      console.error('Failed to complete onboarding', error);
    },
  });

  const syncUser = useMutation({
    mutationFn: () => userService.syncUser(),

    onError: (error) => {
      console.error('Failed to sync user', error);
    },
  });

  return {
    markOnboardingCompleted,
    syncUser,
  };
};
