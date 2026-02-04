import { useDevTools } from '@/src/store/useDevTools';

export async function devDelay() {
  const ms = useDevTools.getState().slowNetworkMs;
  if (!ms) return;
  await new Promise((r) => setTimeout(r, ms));
}
