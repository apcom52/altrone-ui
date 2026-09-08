import { memo } from 'react';
import { ToolbarCenterProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Center = memo(
  ({ ref, children, className, ...restProps }: ToolbarCenterProps) => (
    <div
      ref={ref}
      className={clsx(s.Region, s.Center, className)}
      data-toolbar-region="center"
      {...restProps}
    >
      {children}
    </div>
  ),
);
