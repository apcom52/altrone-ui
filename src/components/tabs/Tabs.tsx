import { memo, useId, useRef, KeyboardEvent } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { Item } from './components/Item.tsx';
import { LayoutGroup, motion, type HTMLMotionProps } from 'motion/react';
import { TabsContext } from './Tabs.context.ts';
import { DOMUtils } from '../../utils';

const NAV_KEYS = [
  'ArrowRight',
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
];

const TabsComponent = memo<TabsProps>(
  ({ children, className, style, ref, ...props }) => {
    const backdropId = useId();
    const rootRef = useRef<HTMLDivElement>(null);

    const cls = clsx(s.Tabs, className);

    /* Roving-ish focus: Tab/Shift+Tab reach the selected tab (it's the only
       `tabindex={0}`), arrow keys and Home/End move focus between the rest. */
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      props.onKeyDown?.(event);
      if (!NAV_KEYS.includes(event.key) || event.defaultPrevented) {
        return;
      }
      const list = rootRef.current;
      if (!list) {
        return;
      }
      const tabs = Array.from(
        list.querySelectorAll<HTMLElement>(
          '[role="tab"]:not([aria-disabled="true"]):not(:disabled)',
        ),
      );
      if (tabs.length < 2) {
        return;
      }
      const current = Math.max(
        0,
        tabs.indexOf(document.activeElement as HTMLElement),
      );
      let next = current;
      if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = tabs.length - 1;
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        next = (current + 1) % tabs.length;
      } else {
        next = (current - 1 + tabs.length) % tabs.length;
      }
      event.preventDefault();
      tabs[next].focus();
    };

    return (
      <TabsContext.Provider value={{ backdropId }}>
        <div className={s.TabsContainer}>
          {/* `layoutRoot`: makes the tablist the reference frame for the
              active-tab backdrop's shared layout animation. Its own position
              resolves instantly, so mounting inside a repositioning container
              (e.g. a Popover placed after its first paint) doesn't fling the
              backdrop in from the corner. */}
          <motion.div
            layout
            layoutRoot
            className={cls}
            style={style}
            role="tablist"
            ref={DOMUtils.composeRefs(ref, rootRef)}
            /* `motion.div` redefines some DOM event handlers (`onAnimationStart`,
               `onDrag*`) with signatures that clash with React's
               `HTMLAttributes`; `Tabs` never receives those, so widen the
               passthrough props to satisfy the cast. */
            {...(props as HTMLMotionProps<'div'>)}
            onKeyDown={handleKeyDown}
          >
            <LayoutGroup>{children}</LayoutGroup>
          </motion.div>
        </div>
      </TabsContext.Provider>
    );
  },
);

const TabsNamespace = Object.assign(TabsComponent, {
  Item,
});

export { TabsNamespace as Tabs };
