import { memo } from 'react';
import s from './empty.module.scss';
import clsx from 'clsx';
import { EmptyProps } from './Empty.types';
import { useLocalization } from 'components/application';
import { useConfiguration } from 'components/configuration';
import { SearchX } from 'lucide-react';

export const Empty = memo((props: EmptyProps) => {
  const t = useLocalization();
  const { empty: emptyConfig = {} } = useConfiguration();

  const { children, icon, transparent, className, style, ...restProps } = props;

  const cls = clsx(s.Empty, emptyConfig.className, className, {
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
      <div className={s.Icon} aria-hidden="true">
        {icon || <SearchX />}
      </div>
      <div className={s.Label}>{children || t('empty.noData')}</div>
    </div>
  );
});
