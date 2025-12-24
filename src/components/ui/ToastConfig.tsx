import React from 'react';
import { View } from 'react-native';
import { ToastConfigParams } from 'react-native-toast-message';
import { AppText } from './AppText';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastDefaults {
  position: 'top' | 'bottom';
  visibilityTime: number;
  autoHide: boolean;
}

type ToastColorTokens = {
  bgAccent: string;
  border: string;
};

type ToastRendererProps = ToastConfigParams<any> & {
  type: ToastType;
};

export const toastDefaultsByType: Record<ToastType, ToastDefaults> = {
  success: {
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
  },
  error: {
    position: 'bottom',
    visibilityTime: 4000,
    autoHide: true,
  },
  info: {
    position: 'bottom',
    visibilityTime: 3000,
    autoHide: true,
  },
  warning: {
    position: 'bottom',
    visibilityTime: 3500,
    autoHide: true,
  },
};

const toastColorTokens: Record<ToastType, ToastColorTokens> = {
  success: {
    bgAccent: 'bg-state-success',
    border: 'border-state-success',
  },
  error: {
    bgAccent: 'bg-state-error',
    border: 'border-state-error',
  },
  info: {
    bgAccent: 'bg-state-info',
    border: 'border-state-info',
  },
  warning: {
    bgAccent: 'bg-state-warning',
    border: 'border-state-warning',
  },
};

export const ToastRenderer = ({
  type,
  text1,
  text2,
}: ToastRendererProps) => {
  const colors = toastColorTokens[type];

  return (
    <View className={`flex-row mx-8 shadow-md rounded-compactCard border bg-surface-elevated overflow-hidden ${colors.border}`}>
      {/* Accent bar */}
      <View className={`w-4 ${colors.bgAccent}`} />

      {/* Content */}
      <View className="flex-1 px-4 py-3">
      {text1 && (
        <AppText variant="body" className="font-medium">
        {text1}
        </AppText>
      )}

      {text2 && (
        <AppText variant="small" className="mt-1 opacity-90">
        {text2}
        </AppText>
      )}
      </View>
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => <ToastRenderer type="success" {...props} />,
  error: (props: any) => <ToastRenderer type="error" {...props} />,
  info: (props: any) => <ToastRenderer type="info" {...props} />,
  warning: (props: any) => <ToastRenderer type="warning" {...props} />,
};
