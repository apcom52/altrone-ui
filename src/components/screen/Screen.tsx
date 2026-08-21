import { memo } from 'react';
import clsx from 'clsx';
import s from './screen.module.scss';
import { ScreenProps } from './Screen.types.ts';
import {
  Header,
  Sidebar,
  Content,
  Footer,
  ListDetail,
  Dashboard,
  Form,
  Settings,
  DataView,
  Auth,
  Empty,
  Error as ScreenError,
} from './components';

const ScreenBase = memo(
  ({ ref, children, size, className, style, ...restProps }: ScreenProps) => {
    const cls = clsx(
      s.Screen,
      {
        [s.Mini]: size === 'mini',
        [s.Small]: size === 's',
        [s.Medium]: size === 'm',
        [s.Large]: size === 'l',
        [s.XLarge]: size === 'xl',
      },
      className,
    );

    return (
      <div ref={ref} className={cls} style={style} {...restProps}>
        {children}
      </div>
    );
  },
);

export const Screen = Object.assign(ScreenBase, {
  Header,
  Sidebar,
  Content,
  Footer,
  ListDetail,
  Dashboard,
  Form,
  Settings,
  DataView,
  Auth,
  Empty,
  Error: ScreenError,
});
