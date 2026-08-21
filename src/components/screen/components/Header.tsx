import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenHeaderProps } from '../Screen.types.ts';

export const Header = memo(
  ({ ref, children, className, style, ...restProps }: ScreenHeaderProps) => {
    const cls = clsx(s.Header, className);

    return (
      <header ref={ref} className={cls} style={style} {...restProps}>
        {children}
      </header>
    );
  },
);
