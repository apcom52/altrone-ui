import { memo, useId } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { useConfiguration } from 'components/configuration';
import { Item } from './components/Item.tsx';
import { LayoutGroup } from 'motion/react';
import { TabsContext } from './Tabs.context.ts';

const TabsComponent = memo<TabsProps>(
  ({ children, className, style, ref, ...props }) => {
    const { tabs: tabsConfig = {} } = useConfiguration();
    const backdropId = useId();

    const cls = clsx(s.Tabs, className, tabsConfig.className);

    const styles = {
      ...tabsConfig.style,
      ...style,
    };

    return (
      <TabsContext.Provider value={{ backdropId }}>
        <div className={s.TabsContainer}>
          <div className={cls} style={styles} role="tablist" ref={ref} {...props}>
            <LayoutGroup>{children}</LayoutGroup>
          </div>
        </div>
      </TabsContext.Provider>
    );
  },
);

const TabsNamespace = Object.assign(TabsComponent, {
  Item,
});

export { TabsNamespace as Tabs };
