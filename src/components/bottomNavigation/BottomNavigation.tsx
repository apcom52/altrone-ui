import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { BottomNavigationProps } from './BottomNavigation.types.ts';
import s from './bottomNavigation.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { BottomNavigationContext } from './BottomNavigation.context.tsx';
import { motion, useAnimationControls } from 'motion/react';
import { DOMUtils } from '../../utils';

type BackdropBox = { x: number; y: number; width: number; height: number };

const POSITION_TRANSITION = {
  type: 'spring',
  stiffness: 420,
  damping: 36,
  mass: 0.9,
} as const;

const BottomNavigation = memo<BottomNavigationProps>(
  ({ ref, children, className, style, floating = true, ...restProps }) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const selectedElRef = useRef<HTMLElement | null>(null);
    const hadBoxRef = useRef(false);
    const [box, setBox] = useState<BackdropBox | null>(null);
    const pulse = useAnimationControls();

    const measure = useCallback(() => {
      const root = rootRef.current;
      const el = selectedElRef.current;
      if (!root || !el) {
        return;
      }
      const rootRect = root.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      setBox({
        x: rect.left - rootRect.left,
        y: rect.top - rootRect.top,
        width: rect.width,
        height: rect.height,
      });
    }, []);

    const handleSelect = useCallback(
      (el: HTMLElement | null, selected: boolean) => {
        if (selected) {
          selectedElRef.current = el;
          measure();
          if (hadBoxRef.current) {
            /* A small scale pulse each time the backdrop hops to another
               item — skipped on the initial placement. */
            pulse.start({
              scale: [1, 0.85, 1],
              transition: { duration: 0.4, ease: 'easeInOut' },
            });
          }
          hadBoxRef.current = true;
          return;
        }

        /* Deselected. If another item claims selection in the same commit it
           overwrites `selectedElRef` before this fires; only a genuine
           "nothing selected" reaches the clear. */
        if (selectedElRef.current !== el) {
          return;
        }
        const raf =
          typeof requestAnimationFrame !== 'undefined'
            ? requestAnimationFrame
            : (cb: () => void) => cb();
        raf(() => {
          if (selectedElRef.current === el) {
            selectedElRef.current = null;
            hadBoxRef.current = false;
            setBox(null);
          }
        });
      },
      [measure, pulse],
    );

    useEffect(() => {
      const root = rootRef.current;
      if (!root || typeof ResizeObserver === 'undefined') {
        return;
      }
      const observer = new ResizeObserver(measure);
      observer.observe(root);
      return () => observer.disconnect();
    }, [measure]);

    const cls = clsx(s.BottomNavigation, { [s.Floating]: floating }, className);

    return (
      <BottomNavigationContext.Provider value={handleSelect}>
        <div
          ref={DOMUtils.composeRefs(ref, rootRef)}
          className={cls}
          style={style}
          {...restProps}
        >
          {box ? (
            <motion.div
              className={s.BackdropWrap}
              initial={box}
              animate={box}
              transition={POSITION_TRANSITION}
            >
              <motion.div className={s.Backdrop} animate={pulse} />
            </motion.div>
          ) : null}
          {children}
        </div>
      </BottomNavigationContext.Provider>
    );
  },
);

const BottomNavigationNamespace = Object.assign(BottomNavigation, {
  Item,
});

export { BottomNavigationNamespace as BottomNavigation };
