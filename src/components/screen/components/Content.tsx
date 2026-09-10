import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenContentProps } from '../Screen.types.ts';

export const Content = ({
  ref,
  children,
  className,
  style,
  ...restProps
}: ScreenContentProps) => (
  <main ref={ref} className={clsx(s.Content, className)} style={style} {...restProps}>
    {children}
  </main>
);
