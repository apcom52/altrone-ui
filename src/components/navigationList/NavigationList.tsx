import { memo } from 'react';
import { NavigationListProps } from './NavigationList.types.ts';
import s from './navigationList.module.scss';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import clsx from 'clsx';
import { Group, Link } from './components';

const NavigationListComponent = memo<NavigationListProps>(
  ({ children, className, style, ...restProps }) => {
    const { navigationList: navigationListConfig = {} } = useConfiguration();

    const cls = clsx(
      s.NavigationList,
      className,
      navigationListConfig.className,
    );

    const styles = {
      ...navigationListConfig.style,
      ...style,
    };

    return (
      <nav className={cls} style={styles} {...restProps}>
        {children}
      </nav>
    );
  },
);

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Group: Group,
  Link: Link,
});

export { NavigationListNamespace as NavigationList };
