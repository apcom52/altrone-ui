import { memo } from 'react';
import { ToolbarTrailingProps } from '../Toolbar.types.ts';
import s from './group.module.scss';
import clsx from 'clsx';

export const Trailing = memo(({ ref, children, className, style, ...restProps }: ToolbarTrailingProps) => {
  const cls = clsx(s.Trailing, className);

  return (
    <div ref={ref} className={cls} style={style} {...restProps}>
      {children}
    </div>
  );
});
