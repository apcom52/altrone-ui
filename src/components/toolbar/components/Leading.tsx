import { memo } from 'react';
import { ToolbarLeadingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Leading = memo(
  ({ ref, children, className, ...restProps }: ToolbarLeadingProps) => (
    <div
      ref={ref}
      className={clsx(s.Region, s.Leading, className)}
      data-toolbar-region="leading"
      {...restProps}
    >
      {children}
    </div>
  ),
);
