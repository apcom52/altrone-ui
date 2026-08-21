import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenContentProps } from '../Screen.types.ts';

export const Content = memo(
  ({ ref, children, className, style, ...restProps }: ScreenContentProps) => {
    const cls = clsx(s.Content, className);

    return (
      <main ref={ref} className={cls} style={style} {...restProps}>
        {children}
      </main>
    );
  },
);
