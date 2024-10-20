import { ToastContainer, toast, ToastOptions } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import {
  NotificationProps,
  ToastContextType,
  ToastProps,
} from './Toast.types.ts';
import s from './toast.module.scss';
import { Icon } from '../icon';
import clsx from 'clsx';
import { Notification } from './inner';

const ToastContext = createContext<ToastContextType>({
  toast: () => null,
  success: () => null,
  danger: () => null,
  warning: () => null,
  sendNotification: () => null,
});
export const useToast = () => useContext(ToastContext);

const defaultToastSettings: ToastOptions = {
  position: 'bottom-center',
  closeButton: false,
  autoClose: 5000,
  closeOnClick: true,
};

export const Toast = memo<ToastProps>(({ children }) => {
  const sendToast = useCallback((message: string) => {
    toast(message, {
      ...defaultToastSettings,
      icon: (
        <div className={s.Icon}>
          <Icon i="info" />
        </div>
      ),
    });
  }, []);

  const sendSuccessToast = useCallback((message: string) => {
    toast(message, {
      ...defaultToastSettings,
      className: clsx(s.Toast, s.Success),
      icon: (
        <div className={s.Icon}>
          <Icon i="done" />
        </div>
      ),
    });
  }, []);

  const sendWarningToast = useCallback((message: string) => {
    toast(message, {
      ...defaultToastSettings,
      className: clsx(s.Toast, s.Warning),
      icon: (
        <div className={s.Icon}>
          <Icon i="warning" />
        </div>
      ),
    });
  }, []);

  const sendDangerToast = useCallback((message: string) => {
    toast(message, {
      ...defaultToastSettings,
      className: clsx(s.Toast, s.Danger),
      icon: (
        <div className={s.Icon}>
          <Icon i="error" />
        </div>
      ),
    });
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
