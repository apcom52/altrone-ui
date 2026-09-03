import { memo, useId } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { Item } from './components/Item.tsx';
import { LayoutGroup, motion, type HTMLMotionProps } from 'motion/react';
import { TabsContext } from './Tabs.context.ts';

const TabsComponent = memo<TabsProps>(
  ({ children, className, style, ref, ...props }) => {
    const backdropId = useId();

    const cls = clsx(s.Tabs, className);

    const styles = {
      ...style,
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
            style={styles}
            role="tablist"
            ref={ref}
            /* `motion.div` redefines some DOM event handlers (`onAnimationStart`,
               `onDrag*`) with signatures that clash with React's
               `HTMLAttributes`; `Tabs` never receives those, so widen the
               passthrough props to satisfy the cast. */
            {...(props as HTMLMotionProps<'div'>)}
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
