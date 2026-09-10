import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import {
  AnimatePresence,
  motion,
  useReducedMotionConfig,
  type HTMLMotionProps,
  type Transition,
} from 'motion/react';
import { mergeRefs } from 'utils';
import { useLocalization } from 'components/application/useLocalization.tsx';
import s from '../screen.module.scss';
import { ScreenSidebarProps } from '../Screen.types.ts';
import { useScreenContext } from '../Screen.context.ts';

/**
 * Open/close is the exact `Drawer` animation in both modes — keep these in
 * sync with `drawer/Drawer.tsx`. The slide rides an iOS-style curve while the
 * scale eases out past 1, anchored to the leading edge (`transform-origin` in
 * CSS) so the panel reads as inflating out of that edge. The layout reflow
 * (inline) is a `padding-inline-start` transition on `Screen` — CSS, same
 * curve.
 */
const PANEL_ENTER_TRANSITION: Transition = {
  x: { duration: 0.52, ease: [0.32, 0.72, 0, 1] },
  scale: { duration: 0.58, ease: [0.34, 1.56, 0.64, 1] },
};

const PANEL_EXIT_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0.4, 0, 1, 1],
};

const BACKDROP_TRANSITION: Transition = {
  duration: 0.35,
  ease: 'easeOut',
};

/** % of the panel's own width — clears the 8px gutter and the shadow. */
const OFFSCREEN_X = '-120%';

export const Sidebar = ({
  ref,
  children,
  collapsed = false,
  onClose,
  className,
  style,
  ...restProps
}: ScreenSidebarProps) => {
  const t = useLocalization();
  const { sidebarMode } = useScreenContext();
  const reducedMotion = useReducedMotionConfig() ?? false;

  const isOverlay = sidebarMode === 'overlay';
  const scrimOpen = isOverlay && !collapsed;

  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scrimOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    asideRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [scrimOpen, onClose]);

  const panelAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { x: OFFSCREEN_X, scale: 0.85 },
        animate: { x: 0, scale: 1, transition: PANEL_ENTER_TRANSITION },
        exit: { x: OFFSCREEN_X, scale: 0.88, transition: PANEL_EXIT_TRANSITION },
      };

  const scrimAnimation: HTMLMotionProps<'div'> = reducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: BACKDROP_TRANSITION,
      };

  return (
    <>
      <AnimatePresence>
        {scrimOpen && (
          <motion.div
            key="scrim"
            className={s.Scrim}
            aria-hidden="true"
            onClick={onClose}
            {...scrimAnimation}
          />
        )}
      </AnimatePresence>
      <aside
        ref={mergeRefs(ref, asideRef)}
        className={clsx(s.Sidebar, { [s.Collapsed]: collapsed }, className)}
        style={style}
        aria-label={t('screen.sidebarLabel')}
        inert={collapsed}
        tabIndex={scrimOpen ? -1 : undefined}
        {...restProps}
      >
        {/* initial={false}: no slide-in on first paint when the sidebar starts open. */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="panel"
              className={s.SidebarPanel}
              {...panelAnimation}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </aside>
    </>
  );
};
