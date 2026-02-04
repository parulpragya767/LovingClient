import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';

export class AppErrorBoundary extends React.Component<{ children: React.ReactNode }> {

  componentDidCatch(error: Error) {
    console.error('Fatal app error caught by AppErrorBoundary:', error);
    useAppErrorStore.getState().setError('FATAL_ERROR');
  }

  render() {
    return this.props.children;
  }
}
