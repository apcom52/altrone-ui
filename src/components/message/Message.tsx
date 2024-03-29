import { memo } from 'react';
import { MessageProps } from './Message.types.ts';
import { Flex } from 'components';
import { Direction, Gap, Role } from '../../types';
import s from './message.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

export const Message = memo<MessageProps>(
  ({
    children,
    className,
    header,
    icon,
    role = Role.default,
    style,
    ...props
  }) => {
    const { message: messageConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Message,
      {
        [s.RolePrimary]: role === Role.primary,
        [s.RoleSuccess]: role === Role.success,
        [s.RoleWarning]: role === Role.warning,
        [s.RoleDanger]: role === Role.danger,
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
        gap={Gap.large}
        direction={Direction.horizontal}
        style={styles}
        {...props}
      >
        {icon ? <div className={s.Icon}>{icon}</div> : null}
        <Flex className={s.Content} gap={Gap.medium}>
          {header ? <div className={s.Header}>{header}</div> : null}
          <div className={s.Description}>{children}</div>
        </Flex>
      </Flex>
    );
  },
);
