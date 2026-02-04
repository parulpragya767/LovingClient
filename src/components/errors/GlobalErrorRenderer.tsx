import AuthErrorScreen from '@/src/screens/errors/AuthErrorScreen';
import FatalErrorScreen from '@/src/screens/errors/FatalErrorScreen';
import NetworkErrorScreen from '@/src/screens/errors/NetworkErrorScreen';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';

export function GlobalErrorRenderer({ children }: { children: React.ReactNode }) {
  const error = useAppErrorStore((s) => s.error);

  if (error === 'AUTH_ERROR') return <AuthErrorScreen />;
  if (error === 'NETWORK_ERROR') return <NetworkErrorScreen />;
  if (error === 'FATAL_ERROR') return <FatalErrorScreen />;

  return <>{children}</>;
}
