import { memo } from 'react';
import { ToolbarTrailingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Trailing = memo(
  ({ ref, children, className, ...restProps }: ToolbarTrailingProps) => (
    <div
      ref={ref}
      className={clsx(s.Region, s.Trailing, className)}
      data-toolbar-region="trailing"
      {...restProps}
    >
      {children}
    </div>
  ),
);
