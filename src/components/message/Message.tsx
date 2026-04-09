import { memo, useEffect } from 'react';
import { MessageProps } from './Message.types.ts';
import { Flex } from 'components/flex/Flex.tsx';
import { CloseButton } from 'components/closeButton/CloseButton.tsx';
import s from './message.module.scss';
import clsx from 'clsx';
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
    const cls = clsx(
      s.Message,
      {
        [s.RolePrimary]: severity === 'primary',
        [s.RoleSuccess]: severity === 'success',
        [s.RoleWarning]: severity === 'warning',
        [s.RoleDanger]: severity === 'danger',
        [s.Compact]: compact,
      },
      className,
    );

    const styles = {
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
