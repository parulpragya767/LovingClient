import { create } from 'zustand';

export type AppErrorType = 'AUTH_ERROR' | 'NETWORK_ERROR' | 'FATAL_ERROR' | null;

type AppErrorStore = {
  error: AppErrorType;
  setError: (error: AppErrorType) => void;
  clearError: () => void;
};

export const useAppErrorStore = create<AppErrorStore>((set) => ({
  error: null,
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
