import { PropsWithChildren } from 'react';
import { Role } from '../../types';

export interface ToastProps extends PropsWithChildren {}

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
  severity?: Role;
}

export interface ToastContextType {
  toast: (message: string) => void;
  success: (message: string) => void;
  danger: (message: string) => void;
  warning: (message: string) => void;
  sendNotification: (options: NotificationProps) => void;
}
