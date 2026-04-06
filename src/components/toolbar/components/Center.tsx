import { memo } from 'react';
import { ToolbarCenterProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Center = memo(({ ref, children, className, style, ...restProps }: ToolbarCenterProps) => {
  const cls = clsx(s.Center, className);

  return (
    <div ref={ref} className={cls} style={style} {...restProps}>
      {children}
    </div>
  );
});
