import { forwardRef } from 'react';
import clsx from 'clsx';
import { CustomIslandProps } from '../TextInput.types.ts';
import s from './custom.module.scss';

export const CustomIsland = forwardRef<HTMLDivElement, CustomIslandProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const cls = clsx(s.CustomAction, className);

    const styles = {
      ...style,
    };

    return (
      <div className={cls} style={styles} ref={ref} {...restProps}>
        {children}
      </div>
    );
  },
);
CustomIsland.displayName = 'TextInputCustomIsland';
