import { create } from 'zustand';

type DevToolsState = {
  visible: boolean;
  slowNetworkMs: number | null;

  toggle: () => void;
  setSlowNetwork: (ms: number | null) => void;
};

export const useDevTools = create<DevToolsState>((set) => ({
  visible: false,
  slowNetworkMs: null,

  toggle: () => set((s) => ({ visible: !s.visible })),
  setSlowNetwork: (ms) => set({ slowNetworkMs: ms }),
}));
