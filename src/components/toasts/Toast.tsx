import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import {
  NotificationProps,
  ToastContextType,
  ToastProps,
} from './Toast.types.ts';
import s from './toast.module.scss';
import { Notification, ToastNotification } from './inner';
import { Role } from '../../types';

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
    (message: string, severity: Role, options?: ToastProps) => {
      toast(<ToastNotification message={message} severity={severity} />, {
        position: 'bottom-center',
        closeButton: false,
        className: s.Toast,
        ...options,
      });
    },
    [],
  );

  const sendToast = useCallback((message: string) => {
    sendGenericToast(message, 'default');
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
      <ToastContainer
        className={s.Wrapper}
        newestOnTop={true}
        hideProgressBar
        toastClassName={s.Toast}
      />
    </ToastContext.Provider>
  );
});
