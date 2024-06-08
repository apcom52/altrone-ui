import { memo } from 'react';
import { TabsProps } from './Tabs.types.ts';
import clsx from 'clsx';
import s from './tabs.module.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import { Flex } from '../flex';
import { Item } from './components/Item.tsx';

const Tabs = memo<TabsProps>(({ children, className, style, ...props }) => {
  const { progress: progressConfig = {} } = useConfiguration();

  const cls = clsx(s.Progress, className, progressConfig.className);

  const styles = {
    ...progressConfig.style,
    ...style,
  };

  return (
    <Flex
      className={cls}
      style={styles}
      direction="horizontal"
      gap="m"
      {...props}
    >
      {children}
    </Flex>
  );
});

const TagsNamespace = Object.assign(Tabs, {
  Item,
});

export { TagsNamespace as Tabs };
