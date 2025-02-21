import { memo, useState } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { useConfiguration } from 'components/configuration';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const Tabs = memo<TabsProps>(({ children, className, style, ...props }) => {
  const { tabs: tabsConfig = {} } = useConfiguration();

  const [selectedTabRect, setSelectedTabRect] = useState<DOMRect | null>(null);

  const cls = clsx(s.Tabs, className, tabsConfig.className);

  const styles = {
    ...tabsConfig.style,
    ...style,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tabElement = (e.target as HTMLElement).closest('[role="tab"]');
    const isTablist = e.target === e.currentTarget;

    if (tabElement) {
      setSelectedTabRect(tabElement.getBoundingClientRect() || null);
    } else if (!isTablist) {
      setSelectedTabRect(null);
    }
  };

  return (
    <Flex
      className={cls}
      style={styles}
      direction="horizontal"
      gap="m"
      onMouseMove={handleMouseMove}
      role="tablist"
    >
      <div
        className={s.TabsUnderlay}
        style={
          selectedTabRect
            ? {
                top: selectedTabRect.top + 2,
                left: selectedTabRect.left + 2,
                width: selectedTabRect.width - 4,
                height: selectedTabRect.height - 6,
              }
            : {}
        }
      />
      {children}
    </Flex>
  );
});

const TagsNamespace = Object.assign(Tabs, {
  Item,
});

export { TagsNamespace as Tabs };
