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

/**
 * This component is used to show information messages to user. This component is very useful when
 * you want to show any information for user. It can be warning or precaution against potentially
 * dangerous actions. Also, you can set a custom icon for the message if it is necessary.
 * @type {MessageProps}
 * @param children - content of the message. Required parameter
 * @param [title] - title of the message
 * @param [role] - Role of the message. Default value is `default`. Check {@link Role} page to see more about it
 * @param [IconComponent] - custom icon for the message
 * @param [elevation] - shadows of your message. Default value is `floating`.
 * Check {@link Elevation} page to see more about it. ***This prop was added in 2.0***
 * @param [className] - custom CSS class
 *
 * @example
 * import { Message, Role } from 'altrone-ui';
 *
 * return <Message
 *  title="It's a danger!"
 *  role={Role.danger}
 * >
 *     Please, be careful!
 * </Message>
 *
 * @constructor
 * @since 1.0
 */
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

export default Message;
