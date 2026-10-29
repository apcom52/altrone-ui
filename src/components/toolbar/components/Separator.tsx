import { memo } from 'react';
import clsx from 'clsx';
import { ToolbarSeparatorProps } from '../Toolbar.types.ts';
import s from './group.module.scss';

export const Separator = memo(
  ({ ref, variant = 'space', className, ...restProps }: ToolbarSeparatorProps) => {
    const cls = clsx(
      variant === 'line' ? s.SeparatorLine : s.SeparatorSpace,
      className,
    );

    return (
      <div
        ref={ref}
        className={cls}
        aria-hidden={variant === 'line' ? undefined : true}
        role={variant === 'line' ? 'separator' : undefined}
        {...restProps}
      />
    );
  },
);
