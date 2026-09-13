import clsx from 'clsx';
import { useLocalization } from 'components/application/useLocalization.tsx';
import s from '../screen.module.scss';
import { ScreenAsideProps } from '../Screen.types.ts';
import { useZoneVisible } from './useZoneVisible.ts';

/**
 * A trailing companion column to `Screen.Content` — an inspector / context
 * pane. Unlike `Screen.Sidebar` it lives *in* the grid: it shares the row with
 * Content, sits below the fixed header, and carries no background of its own.
 * It is deliberately not resizable — for a draggable boundary, wrap
 * `Screen.Content` and `Screen.Aside` in a `Splitter` (each in a
 * `Splitter.Panel`).
 */
export const Aside = ({
  ref,
  children,
  collapsed = false,
  className,
  style,
  visibleFrom,
  hiddenFrom,
  ...restProps
}: ScreenAsideProps) => {
  const t = useLocalization();
  const visible = useZoneVisible(visibleFrom, hiddenFrom);

  if (!visible) {
    return null;
  }

  return (
    <aside
      ref={ref}
      className={clsx(s.Aside, { [s.AsideCollapsed]: collapsed }, className)}
      style={style}
      aria-label={t('screen.asideLabel')}
      inert={collapsed}
      {...restProps}
    >
      <div className={s.AsideInner}>{children}</div>
    </aside>
  );
};
