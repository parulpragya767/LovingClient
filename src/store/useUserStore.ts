import type { User } from '@/src/models/user';
import { create } from 'zustand';

type UserStore = {
  displayName: string;
  onboardingCompleted: boolean;

  setUser: (user: User) => void;
  setDisplayName: (name: string) => void;
  setOnboardingCompleted: (completed: boolean) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  displayName: '',
  onboardingCompleted: false,

  setUser: (user) => set({ 
    displayName: user.displayName, 
    onboardingCompleted: user.onboardingCompleted 
  }),

  setDisplayName: (name) => set({ displayName: name }),

  setOnboardingCompleted: (completed) => set({ onboardingCompleted: completed }),

  clearUser: () => 
    set({ 
        displayName: '', 
        onboardingCompleted: false 
    })
}));
