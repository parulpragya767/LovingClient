import { useAppErrorStore } from '@/src/store/useAppErrorStore';
import React from 'react';

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    console.error('Fatal app error caught by AppErrorBoundary:', error);
    useAppErrorStore.getState().setError('FATAL_ERROR');
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
