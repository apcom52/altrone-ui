import type { NotificationOptions, ToastOptions } from './Notifications.types';

export type NotificationsController = {
  toast: (message: string, options?: ToastOptions) => string;
  notification: (options: NotificationOptions) => string;
  dismiss: (id: string) => void;
};

/**
 * A stack rather than a single ref so nested `Notifications` providers (and
 * tests that mount/unmount their own) don't clobber each other — the most
 * recently mounted provider handles new calls, and unmounting one falls back
 * to the previous.
 */
const controllers: NotificationsController[] = [];

export const registerNotificationsController = (
  controller: NotificationsController,
) => {
  controllers.push(controller);
};

export const unregisterNotificationsController = (
  controller: NotificationsController,
) => {
  const index = controllers.lastIndexOf(controller);
  if (index !== -1) {
    controllers.splice(index, 1);
  }
};

const getController = (): NotificationsController | undefined => {
  const controller = controllers[controllers.length - 1];
  if (!controller) {
    console.warn('Notifications is not mounted');
  }
  return controller;
};

export const showToast = (
  message: string,
  options?: ToastOptions,
): string => {
  return getController()?.toast(message, options) ?? '';
};

export const showNotification = (options: NotificationOptions): string => {
  return getController()?.notification(options) ?? '';
};

export const dismissNotification = (id: string): void => {
  getController()?.dismiss(id);
};
