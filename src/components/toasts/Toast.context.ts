import { createContext, useContext } from 'react';
import type { ToastContextType } from './Toast.types';

export const ToastContext = createContext<ToastContextType>({
  toast: () => '',
  notification: () => '',
  dismiss: () => {},
});

export const useToast = () => useContext(ToastContext);
