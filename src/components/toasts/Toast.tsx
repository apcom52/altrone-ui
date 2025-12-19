import 'react-toastify/dist/ReactToastify.css';
import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import {
  NotificationProps,
  ToastContextType,
  ToastOptions,
  ToastProps,
} from './Toast.types.ts';
import s from './toast.module.scss';
import { Notification, ToastNotification } from './inner';
import { Role } from '../../types';
import { toast, Toaster } from 'sonner';
import { Button } from 'components/button/Button.tsx';

const ToastContext = createContext<ToastContextType>({
  toast: () => null,
  success: () => null,
  danger: () => null,
  warning: () => null,
  sendNotification: () => null,
});
export const useToast = () => useContext(ToastContext);

export const Toast = memo<ToastProps>(({ children }) => {
  const sendGenericToast = useCallback(
    (message: string, options?: ToastOptions) => {
      console.log('message', message);

      toast.custom((id) => (
        <ToastNotification message={message} action={options?.action} />
      ));
    },
    []
  );

  const sendToast = useCallback((message: string, options?: ToastOptions) => {
    sendGenericToast(message, options);
  }, []);

  const sendSuccessToast = useCallback((message: string) => {
    sendGenericToast(message, 'success');
  }, []);

  const sendWarningToast = useCallback((message: string) => {
    sendGenericToast(message, 'warning');
  }, []);

  const sendDangerToast = useCallback((message: string) => {
    sendGenericToast(message, 'danger');
  }, []);

  const sendNotification = useCallback((options: NotificationProps) => {
    toast(<Notification {...options} />, {
      autoClose: options.duration ? options.duration : false,
      pauseOnHover: true,
      className: s.Notification,
      closeButton: false,
      position: [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ].includes(options.placement || '')
        ? options.placement
        : 'top-right',
    });
  }, []);

  const context = useMemo<ToastContextType>(() => {
    return {
      toast: sendToast,
      success: sendSuccessToast,
      warning: sendWarningToast,
      danger: sendDangerToast,
      sendNotification,
    };
  }, [sendToast, sendNotification]);

  return (
    <ToastContext.Provider value={context}>
      {children}
      <Toaster position="bottom-center" />
    </ToastContext.Provider>
  );
});
