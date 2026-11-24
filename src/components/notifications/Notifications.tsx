import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type { FocusEvent } from 'react';
import { AnimatePresence, motion, useReducedMotionConfig } from 'motion/react';
import clsx from 'clsx';
import { useLocalization } from 'components/application';
import { Button } from 'components/button';
import {
  registerNotificationsController,
  unregisterNotificationsController,
} from './notificationsRegistry';
import {
  NotificationsDepthContext,
  useNotificationsDepth,
} from './Notifications.context';
import type {
  AnyNotificationItem,
  NotificationItem,
  NotificationOptions,
  ToastItem,
  ToastOptions,
  NotificationsProviderProps,
} from './Notifications.types';
import { NotificationCard } from './components/NotificationCard';
import { useVisualViewport } from 'internal/sheet';
import s from './notifications.module.scss';

let counter = 0;
const nextId = () => `altrone-notification-${++counter}`;
type StackKind = AnyNotificationItem['kind'];
type FocusScope = StackKind | 'all';

export const Notifications = ({
  children,
  toastPlacement = 'bottom',
  notificationPlacement = 'bottom-end',
}: NotificationsProviderProps) => {
  const t = useLocalization();
  const depth = useNotificationsDepth();
  const reducedMotion = useReducedMotionConfig() ?? false;
  const [items, setItems] = useState<AnyNotificationItem[]>([]);
  const regionRef = useRef<HTMLDivElement>(null);
  const stacksRef = useRef<Record<StackKind, HTMLDivElement | null>>({
    toast: null,
    notification: null,
  });
  const focusOrigins = useRef<Partial<Record<FocusScope, HTMLElement>>>({});

  const rememberFocus = (
    scope: FocusScope,
    { currentTarget, target, relatedTarget }: FocusEvent<HTMLDivElement>,
  ) => {
    const previous =
      relatedTarget instanceof HTMLElement ? relatedTarget : undefined;
    if (
      currentTarget.contains(target) &&
      !currentTarget.contains(previous ?? null)
    ) {
      focusOrigins.current[scope] = previous;
    }
  };

  const restoreFocus = useCallback((scope: FocusScope) => {
    const container =
      scope === 'all' ? regionRef.current : stacksRef.current[scope];
    if (!container?.contains(container.ownerDocument.activeElement)) return;

    const origin = [focusOrigins.current[scope], focusOrigins.current.all].find(
      (element) => element?.isConnected && !container.contains(element),
    );
    origin?.focus({ preventScroll: true });
  }, []);

  const dismiss = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const dismissStack = (kind: StackKind) => {
    setItems((prev) => prev.filter((item) => item.kind !== kind));
    restoreFocus(kind);
  };

  const dismissAll = useCallback(() => {
    setItems((prev) => (prev.length === 0 ? prev : []));
    restoreFocus('all');
  }, [restoreFocus]);

  useLayoutEffect(() => {
    const active = regionRef.current?.ownerDocument.activeElement;
    if (!active) return;
    const kind = stacksRef.current.toast?.contains(active)
      ? 'toast'
      : stacksRef.current.notification?.contains(active)
        ? 'notification'
        : undefined;
    if (!kind) return;

    const cardId = active
      .closest('[data-notification-id]')
      ?.getAttribute('data-notification-id');
    const cardRemoved = cardId && !items.some(({ id }) => id === cardId);
    const dismissButtonRemoved =
      active.hasAttribute('data-dismiss-notification-stack') &&
      items.filter((item) => item.kind === kind).length < 2;
    if (cardRemoved || dismissButtonRemoved) restoreFocus(kind);
  }, [items, restoreFocus]);

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

  useEffect(() => {
    const controller = { toast, notification, dismiss, dismissAll };
    registerNotificationsController(controller, depth);
    return () => unregisterNotificationsController(controller);
  }, [toast, notification, dismiss, dismissAll, depth]);

  const [notificationEdge, notificationAlign] = notificationPlacement.split(
    '-',
  ) as ['top' | 'bottom', 'start' | 'end'];

  /** Keeps the stacks inside the visible area while the iOS keyboard is open. */
  const viewportRect = useVisualViewport(items.length > 0);

  const stacks = [
    {
      kind: 'toast',
      edge: toastPlacement,
      className: s.ToastStack,
      enter: { x: 0, y: toastPlacement === 'top' ? -28 : 28 },
    },
    {
      kind: 'notification',
      edge: notificationEdge,
      className: clsx(
        s.NotificationStack,
        notificationAlign === 'start' ? s.AlignStart : s.AlignEnd,
      ),
      enter: {
        x: notificationAlign === 'start' ? -36 : 36,
        y: notificationEdge === 'top' ? -20 : 20,
      },
    },
  ] as const;

  return (
    <NotificationsDepthContext.Provider value={depth + 1}>
      {children}
      <div
        ref={regionRef}
        className={s.Root}
        style={
          viewportRect
            ? { top: viewportRect.offsetTop, height: viewportRect.height }
            : undefined
        }
        role="region"
        aria-label={t('notifications.regionLabel')}
        aria-live="polite"
        aria-atomic="false"
        onFocusCapture={(event) => rememberFocus('all', event)}
      >
        {stacks.map(({ kind, edge, className, enter }) => {
          const stackItems = items.filter((item) => item.kind === kind);
          const dismissButton = stackItems.length >= 2 && (
            <motion.div
              key="dismiss-all"
              className={s.DismissAll}
              {...(!reducedMotion && {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: { duration: 0.16 },
              })}
            >
              <Button
                data-dismiss-notification-stack=""
                label={t('notifications.dismissAll')}
                size="s"
                onClick={() => dismissStack(kind)}
              />
            </motion.div>
          );

          return (
            <div
              key={kind}
              ref={(element) => {
                stacksRef.current[kind] = element;
              }}
              data-testid={`${kind}-stack`}
              className={clsx(
                s.Stack,
                className,
                edge === 'top' ? s.Top : s.Bottom,
              )}
              onFocusCapture={(event) => rememberFocus(kind, event)}
            >
              <AnimatePresence initial={false}>
                {edge === 'bottom' && dismissButton}
                {stackItems.map((item, index) => (
                  <NotificationCard
                    key={item.id}
                    item={item}
                    enter={enter}
                    stackIndex={index}
                    onClose={() => dismiss(item.id)}
                  />
                ))}
                {edge === 'top' && dismissButton}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </NotificationsDepthContext.Provider>
  );
};
