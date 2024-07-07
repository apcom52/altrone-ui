import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const Group = memo<ToolbarGroupProps>(
  ({
    children,
    align = 'start',
    weight = 1,
    className,
    style,
    ...restProps
  }) => {
    const { toolbar: toolbarConfig = {} } = useConfiguration();

    const cls = clsx(
      s.Group,
      {
        [s.Center]: align === 'center',
        [s.End]: align === 'end',
        [s.Between]: align === 'between',
      },
      className,
      toolbarConfig.className,
    );

    const styles = {
      ...style,
      flexGrow: weight,
    };

    return (
      <div className={cls} style={styles} {...restProps}>
        {children}
      </div>
    );
  },
);
