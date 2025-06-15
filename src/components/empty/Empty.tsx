import { memo } from 'react';
import s from './empty.module.scss';
import clsx from 'clsx';
import { EmptyProps } from './Empty.types';
import { Flex } from 'components/flex';
import { Icon } from 'components/icon';
import { useLocalization } from 'components/application';
import { useConfiguration } from 'components/configuration';

export const Empty = memo((props: EmptyProps) => {
  const t = useLocalization();
  const { empty: emptyConfig = {} } = useConfiguration();

  const { children, icon, transparent, className, style, ...restProps } = props;

  const cls = clsx(s.Wrapper, emptyConfig.className, className, {
    [s.Transparent]: transparent,
  });

  const styles = {
    ...emptyConfig.style,
    ...style,
  };

  return (
    <div
      className={cls}
      role="status"
      aria-live="polite"
      style={styles}
      {...restProps}
    >
      <Flex className={s.Empty} direction="vertical" gap="s">
        <div className={s.Icon} aria-hidden="true">
          {icon || <Icon i="cancel_presentation" />}
        </div>
        <div className={s.Label}>{children || t('empty.noData')}</div>
      </Flex>
    </div>
  );
});
