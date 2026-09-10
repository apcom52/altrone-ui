import type { CSSProperties } from 'react';
import clsx from 'clsx';
import { useBreakpoint } from 'utils';
import s from './screen.module.scss';
import { ScreenMobileBreakpoint, ScreenProps } from './Screen.types.ts';
import { ScreenContextProvider } from './Screen.context.ts';
import { Header, Sidebar, Content, Footer } from './components';

const BREAKPOINT_FLAG: Record<
  ScreenMobileBreakpoint,
  'isSm' | 'isMd' | 'isLg'
> = {
  sm: 'isSm',
  md: 'isMd',
  lg: 'isLg',
};

const ScreenBase = ({
  ref,
  children,
  size,
  title,
  contentAlign = 'start',
  mobileBreakpoint = 'md',
  sidebarWidth,
  className,
  style,
  ...restProps
}: ScreenProps) => {
  const breakpoint = useBreakpoint();
  const sidebarMode = breakpoint[BREAKPOINT_FLAG[mobileBreakpoint]]
    ? 'inline'
    : 'overlay';

  const cls = clsx(
    s.Screen,
    {
      [s.Mini]: size === 'mini',
      [s.Small]: size === 's',
      [s.Medium]: size === 'm',
      [s.Large]: size === 'l',
      [s.XLarge]: size === 'xl',
      [s.ContentCenter]: contentAlign === 'center',
      [s.SidebarOverlay]: sidebarMode === 'overlay',
    },
    className,
  );

  const rootStyle = sidebarWidth
    ? ({ ...style, '--screen-sidebar-width': sidebarWidth } as CSSProperties)
    : style;

  return (
    <ScreenContextProvider value={{ sidebarMode }}>
      <div
        ref={ref}
        className={cls}
        style={rootStyle}
        role={title ? 'region' : undefined}
        aria-label={title}
        {...restProps}
      >
        {children}
      </div>
    </ScreenContextProvider>
  );
};

export const Screen = Object.assign(ScreenBase, {
  Header,
  Sidebar,
  Content,
  Footer,
});
