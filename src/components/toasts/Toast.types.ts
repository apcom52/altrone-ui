import { PropsWithChildren } from 'react';

export interface ToastProps extends PropsWithChildren {}

export interface ToastContextType {
  toast: (message: string) => void;
  success: (message: string) => void;
  danger: (message: string) => void;
  warning: (message: string) => void;
}
