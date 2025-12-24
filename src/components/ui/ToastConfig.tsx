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
  bg: string;
  text: string;
  border: string;
};

type ToastRendererProps = ToastConfigParams<any> & {
  type: ToastType;
};

export const toastDefaultsByType: Record<ToastType, ToastDefaults> = {
  success: {
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  },
  error: {
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
  },
  info: {
    position: 'top',
    visibilityTime: 3000,
    autoHide: true,
  },
  warning: {
    position: 'top',
    visibilityTime: 3500,
    autoHide: true,
  },
};

const toastColorTokens: Record<ToastType, ToastColorTokens> = {
  success: {
    bg: 'bg-state-success',
    text: 'text-text-inverse',
    border: 'border-state-success',
  },
  error: {
    bg: 'bg-state-error',
    text: 'text-text-inverse',
    border: 'border-state-error',
  },
  info: {
    bg: 'bg-state-info',
    text: 'text-text-inverse',
    border: 'border-state-info',
  },
  warning: {
    bg: 'bg-state-warning',
    text: 'text-text-inverse',
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
    <View className={`mx-4 px-4 py-3 rounded-compactCard shadow-md border ${colors.bg} ${colors.border}`}>
      {text1 && (
        <AppText variant="body" color={colors.text} className="font-medium">
          {text1}
        </AppText>
      )}

      {text2 && (
        <AppText variant="small" color={colors.text} className="mt-1 opacity-90">
          {text2}
        </AppText>
      )}
    </View>
  );
};

export const toastConfig = {
  success: (props: any) => <ToastRenderer type="success" {...props} />,
  error: (props: any) => <ToastRenderer type="error" {...props} />,
  info: (props: any) => <ToastRenderer type="info" {...props} />,
  warning: (props: any) => <ToastRenderer type="warning" {...props} />,
};
