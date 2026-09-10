import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenFooterProps } from '../Screen.types.ts';

export const Footer = ({
  ref,
  children,
  className,
  style,
  ...restProps
}: ScreenFooterProps) => (
  <footer ref={ref} className={clsx(s.Footer, className)} style={style} {...restProps}>
    <div className={s.FooterInner}>{children}</div>
  </footer>
);
