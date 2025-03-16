import { memo, useRef, useState } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { useConfiguration } from 'components/configuration';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const Tabs = memo<TabsProps>(({ children, className, style, ...props }) => {
  const { tabs: tabsConfig = {} } = useConfiguration();

  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedTabRect, setSelectedTabRect] = useState<Pick<
    DOMRect,
    'left' | 'width'
  > | null>(null);

  const cls = clsx(s.Tabs, className, tabsConfig.className);

  const styles = {
    ...tabsConfig.style,
    ...style,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tabElement = (e.target as HTMLElement).closest('[role="tab"]');
    const isTablist = e.target === e.currentTarget;

    if (tabElement) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      const elementRect = tabElement.getBoundingClientRect();

      setSelectedTabRect(
        elementRect && containerRect
          ? {
              width: elementRect.width,
              left: elementRect.left - containerRect.left,
            }
          : null,
      );
    } else if (!isTablist) {
      setSelectedTabRect(null);
    }
  };

  return (
    <div
      className={cls}
      style={styles}
      onMouseMove={handleMouseMove}
      role="tablist"
      ref={containerRef}
      {...props}
    >
      <div
        className={s.TabsUnderlay}
        style={
          selectedTabRect
            ? {
                left: selectedTabRect.left + 2,
                width: selectedTabRect.width - 4,
              }
            : {}
        }
      />
      {children}
    </div>
  );
});

const TagsNamespace = Object.assign(Tabs, {
  Item,
});

export { TagsNamespace as Tabs };
