import { memo, useCallback, useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import clsx from 'clsx';
import { ToastContext } from './Toast.context';
import type {
  AnyToastItem,
  NotificationItem,
  NotificationOptions,
  ToastItem,
  ToastItemPosition,
  ToastOptions,
  ToastsProviderProps,
} from './Toast.types';
import { ToastMessage } from './components/ToastMessage';
import { Notification } from './components/Notification';
import s from './toast.module.scss';

let counter = 0;
const nextId = () => `altrone-toast-${++counter}`;

const POSITIONS: ToastItemPosition[] = [
  'top',
  'bottom',
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
];

const isTopPosition = (pos: ToastItemPosition) => pos.startsWith('top');
const isCenterPosition = (pos: ToastItemPosition) =>
  pos === 'top' || pos === 'bottom';
const isLeftPosition = (pos: ToastItemPosition) => pos.endsWith('left');

export const Toast = memo(({ children }: ToastsProviderProps) => {
  const [items, setItems] = useState<AnyToastItem[]>([]);

  const remove = useCallback((id: string) => {
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
      position: options.position ?? 'bottom',
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
      position: options.position ?? 'bottom-right',
      duration: options.duration ?? 6000,
      autoClose: options.autoClose ?? true,
    };
    setItems((prev) => [...prev, item]);
    return id;
  }, []);

  const dismiss = useCallback(
    (id: string) => {
      remove(id);
    },
    [remove],
  );

  return (
    <ToastContext.Provider value={{ toast, notification, dismiss }}>
      {children}
      <div className={s.Root} aria-live="polite" aria-atomic="false">
        {POSITIONS.map((pos) => {
          const posItems = items.filter((item) => item.position === pos);

          return (
            <div
              key={pos}
              className={clsx(
                s.Container,
                isTopPosition(pos) ? s.Top : s.Bottom,
                isCenterPosition(pos)
                  ? s.Center
                  : isLeftPosition(pos)
                    ? s.Left
                    : s.Right,
              )}
            >
              <LayoutGroup id={`toast-container-${pos}`}>
                <AnimatePresence mode="popLayout" initial={false}>
                  {posItems.map((item) =>
                    item.kind === 'toast' ? (
                      <ToastMessage
                        key={item.id}
                        item={item}
                        onClose={() => remove(item.id)}
                      />
                    ) : (
                      <Notification
                        key={item.id}
                        item={item}
                        onClose={() => remove(item.id)}
                      />
                    ),
                  )}
                </AnimatePresence>
              </LayoutGroup>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
});
