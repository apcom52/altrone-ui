import s from './notification.module.scss';
import { NotificationComponentProps } from '../Toast.types.ts';
import { CloseButton } from '../../closeButton';
import { Button } from '../../button';

export const Notification = ({
  title,
  icon,
  message,
  action,
  closeToast,
}: NotificationComponentProps) => {
  return (
    <div className={s.Notification} data-notification="true">
      {icon ? <div className={s.Icon}>{icon}</div> : null}
      <div className={s.Content}>
        {title ? <div className={s.Title}>{title}</div> : null}
        <div className={s.Message}>{message}</div>
        <CloseButton className={s.CloseButton} onClick={closeToast} />
        {action ? (
          <div className={s.Actions}>
            <div>
              <Button label="Show more" />
            </div>
            <div>{action}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
