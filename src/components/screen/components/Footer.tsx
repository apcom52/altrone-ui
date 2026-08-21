import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenFooterProps } from '../Screen.types.ts';

export const Footer = memo(
  ({ ref, children, className, style, ...restProps }: ScreenFooterProps) => {
    const cls = clsx(s.Footer, className);

    return (
      <footer ref={ref} className={cls} style={style} {...restProps}>
        {children}
      </footer>
    );
  },
);
