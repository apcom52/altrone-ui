import { memo } from 'react';
import clsx from 'clsx';
import s from '../screen.module.scss';
import { ScreenSidebarProps } from '../Screen.types.ts';

export const Sidebar = memo(
  ({
    ref,
    children,
    collapsed,
    className,
    style,
    ...restProps
  }: ScreenSidebarProps) => {
    const cls = clsx(s.Sidebar, { [s.Collapsed]: collapsed }, className);

    return (
      <aside ref={ref} className={cls} style={style} {...restProps}>
        {children}
      </aside>
    );
  },
);
