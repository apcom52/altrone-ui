import { memo } from 'react';
import { ToolbarGroupProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import { motion } from 'motion/react';

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
      toolbarConfig.className
    );

    const styles = {
      ...style,
    };

    return (
      <motion.div layout className={cls} style={styles} {...restProps}>
        {children}
      </motion.div>
    );
  }
);
