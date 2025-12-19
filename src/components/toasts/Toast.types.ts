import { PropsWithChildren } from 'react';

export interface ToastProps extends PropsWithChildren {}

export type ToastOptions = {
  action?: {
    label: string;
    onClick: () => void;
    danger?: boolean;
  };
};

export interface NotificationProps {
  message: string;
  title?: string;
  icon?: JSX.Element;
  action?: JSX.Element;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  duration?: number;
}

export type NotificationComponentProps = Omit<
  NotificationProps,
  'placement'
> & {
  closeToast?: () => void;
};

export interface ToastNotificationProps {
  message: string;
  action?: ToastOptions['action'];
}

export interface ToastContextType {
  toast: (message: string, options?: ToastOptions) => void;
  success: (message: string) => void;
  danger: (message: string) => void;
  warning: (message: string) => void;
  sendNotification: (options: NotificationProps) => void;
}
