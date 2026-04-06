import { memo } from 'react';
import { ToolbarLeadingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Leading = memo(({ ref, children, className, style, ...restProps }: ToolbarLeadingProps) => {
  const cls = clsx(s.Leading, className);

  return (
    <div ref={ref} className={cls} style={style} {...restProps}>
      {children}
    </div>
  );
});
