import s from './toast.module.scss';
import { ToastNotificationProps } from '../Toast.types.ts';
import { Role } from '../../../types';
import { Icon } from '../../icon';
import clsx from 'clsx';

const ToastIcons: Record<Role, string> = {
  default: 'info',
  primary: 'info',
  success: 'done',
  danger: 'error',
  warning: 'warning',
};

export const ToastNotification = ({
  message,
  severity = 'default',
}: ToastNotificationProps) => {
  const cls = clsx(s.Toast, {
    [s.Success]: severity === 'success',
    [s.Danger]: severity === 'danger',
    [s.Warning]: severity === 'warning',
  });

  return (
    <div className={cls} data-toast="true">
      <div className={s.Icon}>
        <Icon i={ToastIcons[severity]} />
      </div>
      <div>{message}</div>
    </div>
  );
};
