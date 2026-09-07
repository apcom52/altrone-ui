import { type ReactNode } from 'react';
import { motion, type Transition } from 'motion/react';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import clsx from 'clsx';
import { Box } from 'components/box';
import { Button } from 'components/button';
import { CloseButton } from 'components/closeButton';
import type { AnyToastItem, ToastVariant } from '../Toast.types';
import { useAutoClose } from './useAutoClose';
import s from './toastCard.module.scss';

const VARIANT_ICON: Record<ToastVariant, ReactNode> = {
  default: <Info size={15} />,
  success: <CheckCircle2 size={15} />,
  warning: <AlertTriangle size={15} />,
  danger: <XCircle size={15} />,
};

/** Lively but settled — a little overshoot, no visible ring. */
const ENTER_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 240,
  damping: 22,
  mass: 0.9,
};
/** Quick, clean fade-out; siblings then close the gap on LAYOUT_TRANSITION. */
const EXIT_TRANSITION: Transition = {
  duration: 0.16,
  ease: [0.4, 0, 1, 1],
};
/** Reflow when a card is added/removed — critically damped, no bounce. */
const LAYOUT_TRANSITION: Transition = {
  type: 'spring',
  stiffness: 340,
  damping: 36,
  mass: 0.9,
};

interface ToastCardProps {
  item: AnyToastItem;
  /** Offset (px) the card slides in from / out to, derived from the global placement. */
  enter: { x: number; y: number };
  onClose: () => void;
}

/**
 * Renders a single stack entry — a pill-shaped toast or a rich notification
 * card. Both share the surface (`Box` `material="plate"`), the auto-close
 * timer, hover-to-pause, and the enter/exit spring; only the body layout
 * differs, so they live in one component rather than two near-duplicates.
 *
 * Two nested wrappers on purpose: the outer `.Slot` carries `layout`, so the
 * rest of the stack glides to its new position when a card is added or
 * removed; the inner `.Item` runs the enter/exit transform. Keeping the
 * transform off the `layout` node stops a `layout`-projected descendant
 * (`Button`) from counter-scaling against the card's own entrance.
 */
export const ToastCard = ({ item, enter, onClose }: ToastCardProps) => {
  const { pause, resume } = useAutoClose(item.autoClose, item.duration, onClose);

  const enterExit = {
    initial: { opacity: 0, scale: 0.9, x: enter.x, y: enter.y },
    animate: { opacity: 1, scale: 1, x: 0, y: 0 },
    exit: {
      opacity: 0,
      scale: 0.96,
      x: enter.x * 0.5,
      y: enter.y * 0.5,
      transition: EXIT_TRANSITION,
    },
    transition: ENTER_TRANSITION,
  };

  if (item.kind === 'toast') {
    const { message, variant, icon, action } = item;
    /* icon === undefined → variant default; icon === null → no icon */
    const displayIcon = icon === undefined ? VARIANT_ICON[variant] : icon;

    return (
      <motion.div layout className={s.Slot} transition={LAYOUT_TRANSITION}>
        <motion.div
          className={s.Item}
          {...enterExit}
          onMouseEnter={pause}
          onMouseLeave={resume}
          role="status"
        >
          <Box
            shape="pill"
            material="plate"
            elevation="toast"
            padding={4}
            className={clsx(s.Toast, s[`Toast_${variant}`])}
          >
            {displayIcon !== null && displayIcon !== undefined ? (
              <span className={clsx(s.Icon, s[`Icon_${variant}`])} aria-hidden>
                {displayIcon}
              </span>
            ) : null}

            <span className={s.Message}>{message}</span>

            {action ? (
              <Button
                className={s.Action}
                size="s"
                label={action.label}
                onClick={action.onClick}
              />
            ) : null}

            <CloseButton className={s.Close} size="s" onClick={onClose} />
          </Box>
        </motion.div>
      </motion.div>
    );
  }

  const { title, content, image, icon, actions } = item;

  return (
    <motion.div layout className={s.Slot} transition={LAYOUT_TRANSITION}>
      <motion.div
        className={s.Item}
        {...enterExit}
        onMouseEnter={pause}
        onMouseLeave={resume}
        role="status"
      >
        <Box
          material="plate"
          elevation="toast"
          radius={20}
          padding={0}
          className={s.Notification}
        >
          {image ? (
            <div className={s.Image}>
              <img src={image} alt="" aria-hidden />
            </div>
          ) : null}

          <CloseButton
            className={s.NotificationClose}
            size="s"
            onClick={onClose}
          />

          <div className={s.Body}>
            {icon || title ? (
              <div className={s.Header}>
                {icon ? (
                  <span className={s.NotificationIcon} aria-hidden>
                    {icon}
                  </span>
                ) : null}
                {title ? <span className={s.Title}>{title}</span> : null}
              </div>
            ) : null}

            <div className={s.Content}>{content}</div>

            {actions && actions.length > 0 ? (
              <div className={s.Actions}>
                {actions.map((action, idx) => (
                  <Button
                    key={idx}
                    size="s"
                    danger={action.danger}
                    label={action.label}
                    onClick={(e) => {
                      action.onClick(e);
                      onClose();
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </Box>
      </motion.div>
    </motion.div>
  );
};
