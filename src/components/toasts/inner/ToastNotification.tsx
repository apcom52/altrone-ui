import s from './toast.module.scss';
import { ToastNotificationProps } from '../Toast.types.ts';
import { Role } from '../../../types';
import { Icon } from '../../icon';
import clsx from 'clsx';
import { Button } from 'components/button/Button.tsx';

const ToastIcons: Record<Role, string> = {
  default: 'info',
  primary: 'info',
  success: 'done',
  danger: 'error',
  warning: 'warning',
};

export const ToastNotification = ({
  message,
  action,
}: ToastNotificationProps) => {
  const cls = clsx(s.Toast);

  return (
    <div className={cls} data-toast="true">
      <div className={s.Label}>{message}</div>
      {action ? (
        <Button
          label={action.label}
          onClick={action.onClick}
          danger={action.danger}
        />
      ) : null}
    </div>
  );
};
