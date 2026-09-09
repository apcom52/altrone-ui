import { useCallback, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import clsx from 'clsx';
import { useLocalization } from 'components/application';
import { NotificationsContext } from './Notifications.context';
import type {
  AnyNotificationItem,
  NotificationItem,
  NotificationOptions,
  ToastItem,
  ToastOptions,
  NotificationsProviderProps,
} from './Notifications.types';
import { NotificationCard } from './components/NotificationCard';
import s from './notifications.module.scss';

let counter = 0;
const nextId = () => `altrone-notification-${++counter}`;

export const Notifications = ({
  children,
  toastPlacement = 'end',
  notificationSide = 'end',
  notificationPlacement = 'end',
}: NotificationsProviderProps) => {
  const t = useLocalization();
  const [items, setItems] = useState<AnyNotificationItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((message: string, options: ToastOptions = {}) => {
    const id = nextId();
    const item: ToastItem = {
      kind: 'toast',
      id,
      message,
      variant: options.variant ?? 'default',
      icon: options.icon,
      action: options.action,
      duration: options.duration ?? 4000,
      autoClose: options.autoClose ?? true,
    };
    setItems((prev) => [...prev, item]);
    return id;
  }, []);

  const notification = useCallback((options: NotificationOptions) => {
    const id = nextId();
    const item: NotificationItem = {
      kind: 'notification',
      id,
      title: options.title,
      content: options.content,
      image: options.image,
      icon: options.icon,
      actions: options.actions,
      duration: options.duration ?? 6000,
      autoClose: options.autoClose ?? true,
    };
    setItems((prev) => [...prev, item]);
    return id;
  }, []);

  const toasts = items.filter(
    (item): item is ToastItem => item.kind === 'toast',
  );
  const notifications = items.filter(
    (item): item is NotificationItem => item.kind === 'notification',
  );

  const toastEnter = { x: 0, y: toastPlacement === 'start' ? -28 : 28 };
  const notificationEnter = {
    x: notificationSide === 'start' ? -36 : 36,
    y: notificationPlacement === 'start' ? -20 : 20,
  };

  return (
    <NotificationsContext.Provider value={{ toast, notification, dismiss }}>
      {children}
      <div
        className={s.Root}
        role="region"
        aria-label={t('notifications.regionLabel')}
        aria-live="polite"
        aria-atomic="false"
      >
        <div
          className={clsx(
            s.Stack,
            s.ToastStack,
            toastPlacement === 'start' ? s.Start : s.End,
          )}
        >
          <AnimatePresence initial={false}>
            {toasts.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
                enter={toastEnter}
                onClose={() => dismiss(item.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <div
          className={clsx(
            s.Stack,
            s.NotificationStack,
            notificationPlacement === 'start' ? s.Start : s.End,
            notificationSide === 'start' ? s.SideStart : s.SideEnd,
          )}
        >
          <AnimatePresence initial={false}>
            {notifications.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
                enter={notificationEnter}
                onClose={() => dismiss(item.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </NotificationsContext.Provider>
  );
};
