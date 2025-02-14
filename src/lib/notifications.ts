import { toast } from 'sonner';

export const notifications = {
  success: (message: string) => {
    toast.success(message, {
      duration: 3000,
      className: 'bg-emerald-500 text-white',
    });
  },
  error: (message: string) => {
    toast.error(message, {
      duration: 5000,
      className: 'bg-red-500 text-white',
    });
  },
  loading: (message: string) => {
    toast.loading(message, {
      className: 'bg-blue-500 text-white',
    });
  }
}; 