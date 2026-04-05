import { memo } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { NotificationAction, NotificationItem } from '../Toast.types';
import { useAutoClose } from './useAutoClose';
import s from './notification.module.scss';
import { Button } from 'components/button';
import { CloseButton } from 'components/closeButton';

interface NotificationProps {
  item: NotificationItem;
  onClose: () => void;
}

const getMotionProps = (position: string) => {
  const isTop = position.startsWith('top');
  const isLeft = position.endsWith('left');
  const isRight = position.endsWith('right');
  const isCenter = !isLeft && !isRight;

  const yOffset = isTop ? -16 : 16;
  const xOffset = isCenter ? 0 : isLeft ? -16 : 16;

  return {
    initial: { opacity: 0, y: yOffset, x: xOffset, scale: 0.94 },
    animate: { opacity: 1, y: 0, x: 0, scale: 1 },
    exit: {
      opacity: 0,
      y: yOffset,
      x: xOffset,
      scale: 0.92,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
    transition: { type: 'spring', stiffness: 380, damping: 30 },
  };
};

const ActionButton = memo(
  ({
    action,
    onClose,
  }: {
    action: NotificationAction;
    onClose: () => void;
  }) => (
    <Button
      size="s"
      danger={action.danger}
      onClick={(e) => {
        action.onClick(e);
        onClose();
      }}
      label={action.label}
    />
  ),
);

export const Notification = memo(({ item, onClose }: NotificationProps) => {
  const {
    id,
    title,
    content,
    image,
    icon,
    actions,
    position,
    duration,
    autoClose,
  } = item;

  const { pause, resume } = useAutoClose(autoClose, duration, onClose);

  return (
    <motion.div
      layout
      {...getMotionProps(position)}
      className={s.Notification}
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{ pointerEvents: 'all' }}
      role="status"
    >
      {/* Header image */}
      {image && (
        <div className={s.ImageWrapper}>
          <img src={image} alt="" className={s.Image} aria-hidden />
        </div>
      )}

      {/* Close button */}
      <CloseButton onClick={onClose} className={s.Close} size="s" />

      <div className={s.Body}>
        {/* Icon + title row */}
        {(icon || title) && (
          <div className={s.Header}>
            {icon && (
              <span className={s.Icon} aria-hidden>
                {icon}
              </span>
            )}
            {title && <span className={s.Title}>{title}</span>}
          </div>
        )}

        {/* Content */}
        <div className={s.Content}>{content}</div>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className={s.Actions}>
            {actions.map((action, idx) => (
              <ActionButton key={idx} action={action} onClose={onClose} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
});
