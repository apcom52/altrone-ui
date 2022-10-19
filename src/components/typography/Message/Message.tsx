import {memo} from "react";
import './message.scss';
import {Icon} from "../../icons";
import clsx from "clsx";

export enum MessageRole {
  attention = 'error_outline',
  warning = 'warning_amber',
  danger = 'report_gmailerrorred',
  help = 'help_outline',
  completed = 'check_circle_outline',
  failed = 'highlight_off',
}

export enum MessageStyle {
  default = 'default',
  primary = 'primary',
  success = 'success',
  danger = 'danger'
}

interface MessageProps extends Omit<React.HTMLProps<HTMLDivElement>, 'title' | 'style'> {
  style?: MessageStyle
  title?: string
  role?: MessageRole
  IconComponent?: JSX.Element
}

const Message = ({ title, children, style = MessageStyle.default, role = MessageRole.attention, IconComponent }: MessageProps) => {
  return <div className={clsx('alt-message', {
    'alt-message--style-primary': style === MessageStyle.primary,
    'alt-message--style-success': style === MessageStyle.success,
    'alt-message--style-danger': style === MessageStyle.danger,
    'alt-message--only-title': !children
  })}>
    <div className='alt-message__icon'>{IconComponent || <Icon i={role} />}</div>
    <div className='alt-message__content'>
      {title && <div className='alt-message__title'>{title}</div>}
      <div className='alt-message__description'>{children}</div>
    </div>
  </div>
}

export default memo(Message)