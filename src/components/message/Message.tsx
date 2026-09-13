import { Ref } from 'react';
import clsx from 'clsx';
import { Box, BoxTone } from 'components/box';
import { Flex } from 'components/flex/Flex.tsx';
import { CloseButton } from 'components/closeButton/CloseButton.tsx';
import { MessageProps } from './Message.types.ts';
import s from './message.module.scss';

const TONE_BY_SEVERITY: Record<
  'primary' | 'success' | 'warning' | 'danger',
  BoxTone
> = {
  primary: 'accent',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
};

export const Message = ({
  ref,
  children,
  className,
  style,
  header,
  icon,
  severity,
  ariaRole,
  actions,
  onClose,
  compact = false,
  ...restProps
}: MessageProps) => {
  const resolvedAriaRole =
    ariaRole ?? (severity === 'danger' ? 'alert' : 'status');

  const tone: BoxTone =
    severity && severity !== 'default' ? TONE_BY_SEVERITY[severity] : 'neutral';

  const cls = clsx(s.Message, { [s.Compact]: compact }, className);

  return (
    <Box
      ref={ref as Ref<HTMLElement>}
      className={cls}
      style={style}
      role={resolvedAriaRole}
      shape="rounded"
      material="glass"
      tone={tone}
      padding={icon ? 8 : { x: 16, y: 8 }}
      {...restProps}
    >
      {icon ? (
        <div className={s.Icon} aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <Flex direction="vertical" className={s.Content} gap="m" justify="center">
        <div className={s.Text}>
          {header ? <div className={s.Header}>{header}</div> : null}
          {children ? <div className={s.Body}>{children}</div> : null}
        </div>
        {actions ? <div className={s.Actions}>{actions}</div> : null}
      </Flex>
      {onClose ? <CloseButton className={s.Close} onClick={onClose} /> : null}
    </Box>
  );
};
