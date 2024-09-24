import { memo } from 'react';
import s from './divider.module.scss';
import clsx from 'clsx';
import { DividerProps } from './Divider.types.ts';
import { useConfiguration } from '../configuration';

export const Divider = memo<DividerProps>(
  ({ direction, className, style, ...props }) => {
    const { divider: dividerConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Divider,
      {
        [s.Vertical]: direction === 'vertical',
      },
      className,
      dividerConfig.className,
    );

    const styles = {
      ...dividerConfig.style,
      ...style,
    };

    return <hr role="separator" className={cls} style={styles} {...props} />;
  },
);
