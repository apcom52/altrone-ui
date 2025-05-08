import { memo, useEffect } from 'react';
import { MessageProps } from './Message.types.ts';
import { Flex, CloseButton } from 'components';
import s from './message.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import { GlobalUtils } from '../../utils';

export const Message = memo<MessageProps>(
  ({
    children,
    className,
    header,
    icon,
    role,
    severity,
    style,
    ariaRole = 'alert',
    actions,
    onClose,
    compact = false,
    ...props
  }) => {
    const { message: messageConfig = {} } = useConfiguration();

    // TODO: in 4.0 version we need to remove role prop
    const messageRole = severity ?? role ?? 'default';

    const cls = clsx(
      s.Message,
      {
        [s.RolePrimary]: messageRole === 'primary',
        [s.RoleSuccess]: messageRole === 'success',
        [s.RoleWarning]: messageRole === 'warning',
        [s.RoleDanger]: messageRole === 'danger',
        [s.Compact]: compact,
      },
      className,
      messageConfig.className,
    );

    const styles = {
      ...messageConfig.style,
      ...style,
    };

    useEffect(() => {
      if (role) {
        GlobalUtils.deprecatedMessage('Message', 'role', 'severity', '4.0');
      }
    }, [role]);

    return (
      <Flex
        className={cls}
        gap="l"
        direction="horizontal"
        style={styles}
        role={ariaRole}
        {...props}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        <Flex
          direction="vertical"
          className={s.Content}
          gap="m"
          justify="center"
        >
          <div className={s.Text}>
            {header ? <div className={s.Header}>{header}</div> : null}
            {children ? <div className={s.Body}>{children}</div> : null}
          </div>
          {actions ? <div className={s.Actions}>{actions}</div> : null}
        </Flex>
        {onClose ? <CloseButton onClick={onClose} /> : null}
      </Flex>
    );
  },
);
