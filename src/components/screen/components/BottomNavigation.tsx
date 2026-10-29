import clsx from 'clsx';
import { useLocalization } from 'components/application/useLocalization.tsx';
import s from '../screen.module.scss';
import { ScreenBottomNavigationProps } from '../Screen.types.ts';
import { useZoneVisible } from './useZoneVisible.ts';

/**
 * A fixed, full-width bar pinned to the bottom of the screen — the touch
 * counterpart to `Screen.Sidebar`. `Screen` owns only the geometry (position,
 * safe-area inset, the bottom offset it adds to `Screen.Content` / `.Footer`
 * / `.Sidebar`); the consumer puts the navigation itself inside, e.g.
 * `<BottomNavigation floating={false}>`. `visibleFrom` / `hiddenFrom` gate it
 * per device.
 */
export const BottomNavigation = ({
  ref,
  children,
  className,
  style,
  visibleFrom,
  hiddenFrom,
  ...restProps
}: ScreenBottomNavigationProps) => {
  const t = useLocalization();
  const visible = useZoneVisible(visibleFrom, hiddenFrom);

  if (!visible) {
    return null;
  }

  return (
    <nav
      ref={ref}
      className={clsx(s.BottomNavigation, className)}
      style={style}
      aria-label={t('screen.bottomNavigationLabel')}
      {...restProps}
    >
      <div className={s.BottomNavigationInner}>{children}</div>
    </nav>
  );
};
