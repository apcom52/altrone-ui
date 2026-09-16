import { memo } from 'react';
import s from './divider.module.scss';
import clsx from 'clsx';
import { DividerProps } from './Divider.types.ts';

export const Divider = memo<DividerProps>(
  ({ ref, orientation, className, style, ...props }) => {
    const vertical = orientation === 'vertical';

    const cls = clsx(s.Divider, { [s.Vertical]: vertical }, className);

    return (
      <hr
        ref={ref}
        className={cls}
        style={style}
        aria-orientation={vertical ? 'vertical' : undefined}
        {...props}
      />
    );
  },
);
