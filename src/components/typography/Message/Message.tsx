import { memo } from 'react';
import './message.scss';
import clsx from 'clsx';
import { Elevation, Role } from '../../../types';

interface MessageProps extends Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'style'> {
  title?: string;
  role?: Role;
  IconComponent?: JSX.Element;
  className?: string;
  elevation?: Elevation;
}

const Message = ({
  title,
  children,
  role = Role.default,
  IconComponent,
  elevation = Elevation.floating,
  className
}: MessageProps) => {
  return (
    <div
      className={clsx('alt-message', className, {
        'alt-message--role-primary': role === Role.primary,
        'alt-message--role-success': role === Role.success,
        'alt-message--role-danger': role === Role.danger,
        'alt-message--only-title': !children,
        [`alt-message--elevation-${elevation}`]: elevation !== Elevation.floating
      })}
      data-testid="alt-test-message">
      <div className="alt-message__icon">{IconComponent}</div>
      <div className="alt-message__content">
        {title && (
          <div className="alt-message__title" data-testid="alt-test-message-title">
            {title}
          </div>
        )}
        {children && (
          <div className="alt-message__description" data-testid="alt-test-message-description">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Message) as typeof Message;
