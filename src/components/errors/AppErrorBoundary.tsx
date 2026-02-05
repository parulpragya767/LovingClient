import FatalErrorScreen from '@/src/screens/errors/FatalErrorScreen';
import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<{ children: React.ReactNode }, AppErrorBoundaryState> {

  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Fatal app error caught by AppErrorBoundary:', error);
    console.error('Fatal app error info caught by AppErrorBoundary:', errorInfo);
    useAppErrorStore.getState().setError('FATAL_ERROR');
  }

  render() {
    if (this.state.hasError) return <FatalErrorScreen />;
    return this.props.children;
  }
}
