import type { NotificationOptions, ToastOptions } from './Notifications.types';

export type NotificationsController = {
  toast: (message: string, options?: ToastOptions) => string;
  notification: (options: NotificationOptions) => string;
  dismiss: (id: string) => void;
};

type ControllerEntry = {
  controller: NotificationsController;
  depth: number;
};

/**
 * A stack rather than a single ref so nested `Notifications` providers (and
 * tests that mount/unmount their own) don't clobber each other. Entries carry
 * their nesting `depth` because `useEffect` fires child-before-parent on
 * mount, so a nested provider always registers before its ancestor — picking
 * by registration order alone would hand new calls to the outer provider.
 * `getController` picks the deepest entry, falling back to the most recently
 * registered one among equal depths (e.g. separate top-level providers).
 */
const controllers: ControllerEntry[] = [];

export const registerNotificationsController = (
  controller: NotificationsController,
  depth = 0,
) => {
  controllers.push({ controller, depth });
};

export const unregisterNotificationsController = (
  controller: NotificationsController,
) => {
  const index = controllers.map((entry) => entry.controller).lastIndexOf(
    controller,
  );
  if (index !== -1) {
    controllers.splice(index, 1);
  }
};

const getController = (): NotificationsController | undefined => {
  const entry = controllers.reduce<ControllerEntry | undefined>(
    (deepest, current) =>
      !deepest || current.depth >= deepest.depth ? current : deepest,
    undefined,
  );
  if (!entry) {
    console.warn('Notifications is not mounted');
  }
  return entry?.controller;
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
