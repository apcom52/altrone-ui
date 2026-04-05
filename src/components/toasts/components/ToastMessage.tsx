import { memo } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import clsx from 'clsx';
import type { ToastItem } from '../Toast.types';
import { useAutoClose } from './useAutoClose';
import s from './toastMessage.module.scss';
import { CloseButton } from 'components/closeButton';
import { Button } from 'components/button';

const VARIANT_ICONS = {
  default: <Info size={15} />,
  success: <CheckCircle2 size={15} />,
  warning: <AlertTriangle size={15} />,
  danger: <XCircle size={15} />,
};

interface ToastMessageProps {
  item: ToastItem;
  onClose: () => void;
}

const getMotionProps = (isTop: boolean) => ({
  initial: { opacity: 0, y: isTop ? -12 : 12, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: {
    opacity: 0,
    y: isTop ? -12 : 12,
    scale: 0.9,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
  transition: { type: 'spring', stiffness: 420, damping: 32 },
});

export const ToastMessage = memo(({ item, onClose }: ToastMessageProps) => {
  const { id, message, variant, icon, action, duration, autoClose, position } =
    item;

  const isTop = position.startsWith('top');
  const { pause, resume } = useAutoClose(autoClose, duration, onClose);

  // icon === undefined → show variant default; icon === null → no icon
  const displayIcon = icon !== undefined ? icon : VARIANT_ICONS[variant];

  return (
    <motion.div
      layout
      {...getMotionProps(isTop)}
      className={clsx(s.Toast, s[`Variant_${variant}`])}
      onMouseEnter={pause}
      onMouseLeave={resume}
      style={{ pointerEvents: 'all' }}
      role="status"
    >
      {displayIcon !== null && displayIcon !== undefined ? (
        <span className={clsx(s.Icon, s[`Icon_${variant}`])} aria-hidden>
          {displayIcon}
        </span>
      ) : null}

      <span className={s.Message}>{message}</span>

      {action && (
        <Button
          label={action.label}
          className={s.Action}
          onClick={action.onClick}
          size="s"
        />
      )}

      <CloseButton className={s.Close} onClick={onClose} size="s" />
    </motion.div>
  );
});
