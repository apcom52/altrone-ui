import { memo } from 'react';
import { MessageProps } from './Message.types.ts';
import { Flex } from 'components/flex';
import s from './message.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

export const Message = memo<MessageProps>(
  ({
    children,
    className,
    header,
    icon,
    role = 'default',
    style,
    ...props
  }) => {
    const { message: messageConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Message,
      {
        [s.RolePrimary]: role === 'primary',
        [s.RoleSuccess]: role === 'success',
        [s.RoleWarning]: role === 'warning',
        [s.RoleDanger]: role === 'danger',
      },
      className,
      messageConfig.className,
    );

    const styles = {
      ...messageConfig.style,
      ...style,
    };

    return (
      <Flex
        className={cls}
        gap="l"
        direction="horizontal"
        style={styles}
        role="alert"
        {...props}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        <Flex
          direction="vertical"
          className={s.Content}
          gap="m"
          justify="center"
        >
          {header ? <div className={s.Header}>{header}</div> : null}
          <div className={s.Description}>{children}</div>
        </Flex>
      </Flex>
    );
  },
);
