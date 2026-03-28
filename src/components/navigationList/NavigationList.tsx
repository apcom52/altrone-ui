import { memo, useId } from 'react';
import { NavigationListProps } from './NavigationList.types.ts';
import s from './navigationList.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';
import {
  Group,
  GroupAction,
  Link,
  LinkAction,
  Header,
  Footer,
} from './components';
import {
  NavigationListIdContext,
  NavigationListLevelContext,
} from './NavigationList.context.ts';

const NavigationListComponent = memo<NavigationListProps>(
  ({ children, className, style, ...restProps }) => {
    const { navigationList: navigationListConfig = {} } = useConfiguration();

    const id = useId();

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
        <NavigationListLevelContext.Provider value={0}>
          <NavigationListIdContext.Provider value={id}>
            {children}
          </NavigationListIdContext.Provider>
        </NavigationListLevelContext.Provider>
      </nav>
    );
  },
);

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Group,
  GroupAction,
  Link,
  LinkAction,
  Header,
  Footer,
});

export { NavigationListNamespace as NavigationList };
