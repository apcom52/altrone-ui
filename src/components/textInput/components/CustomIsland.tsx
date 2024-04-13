import { forwardRef } from 'react';
import clsx from 'clsx';
import { CustomIslandProps } from '../TextInput.types.ts';
import s from './custom.module.scss';

export const CustomIsland = forwardRef<HTMLDivElement, CustomIslandProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const cls = clsx(s.CustomAction, className);

    return (
      <div className={cls} ref={ref} {...restProps}>
        {children}
      </div>
    );
  },
);
CustomIsland.displayName = 'TextInputCustomIsland';
