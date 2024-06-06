import { ToastContainer, toast, ToastOptions } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { createContext, memo, useCallback, useContext, useMemo } from 'react';
import { ToastContextType, ToastProps } from './Toast.types.ts';
import s from './toast.module.scss';
import { Icon } from '../icon';
import clsx from 'clsx';

const ToastContext = createContext<ToastContextType>({
  toast: () => null,
  success: () => null,
  danger: () => null,
  warning: () => null,
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

  const context = useMemo<ToastContextType>(() => {
    return {
      toast: sendToast,
      success: sendSuccessToast,
      warning: sendWarningToast,
      danger: sendDangerToast,
    };
  }, [sendToast]);

  return (
    <ToastContext.Provider value={context}>
      {children}
      <ToastContainer
        className={s.Wrapper}
        hideProgressBar
        toastClassName={s.Toast}
      />
    </ToastContext.Provider>
  );
});
