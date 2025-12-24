// ui/toast/toast.ts
import Toast from 'react-native-toast-message';
import { ToastType } from './ToastConfig';

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message?: string;
  visibilityTime?: number;
  position?: 'top' | 'bottom';
  onHide?: () => void;
}

const show = ({
    type = 'info',
    title,
    message,
    visibilityTime = 2500,
    position = 'bottom',
    onHide,
  }: ToastOptions) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      visibilityTime,
      position,
      onHide,
    });
  };

export const toast = {
  show,
  success: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) =>
    show({ type: 'success', title, message, ...options }),

  error: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) =>
    show({ type: 'error', title, message, ...options }),

  info: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) =>
    show({ type: 'info', title, message, ...options }),

  warning: (title: string, message?: string, options?: Omit<ToastOptions, 'type' | 'title' | 'message'>) =>
    show({ type: 'warning', title, message, ...options }),

  hide: () => Toast.hide(),
};
