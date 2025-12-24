import { toast } from '@/src/components/ui/Toast';

export const useToast = () => {
  return {  
    showToast: toast.show,
    showSuccess: toast.success,
    showError: toast.error,
    showInfo: toast.info,
    showWarning: toast.warning,
    hide: toast.hide,
  };
};
