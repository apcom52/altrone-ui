import { memo, useRef, useState } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { useConfiguration } from 'components/configuration';
import { Item } from './components/Item.tsx';
import { LayoutGroup, AnimatePresence } from 'motion/react';

const Tabs = memo<TabsProps>(({ children, className, style, ...props }) => {
  const { tabs: tabsConfig = {} } = useConfiguration();

  const containerRef = useRef<HTMLDivElement>(null);

  const cls = clsx(s.Tabs, className, tabsConfig.className);

  const styles = {
    ...tabsConfig.style,
    ...style,
  };

  return (
    <div className={s.TabsContainer}>
      <div
        className={cls}
        style={styles}
        role="tablist"
        ref={containerRef}
        {...props}
      >
        <LayoutGroup>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
});

const TagsNamespace = Object.assign(Tabs, {
  Item,
});

export { TagsNamespace as Tabs };
