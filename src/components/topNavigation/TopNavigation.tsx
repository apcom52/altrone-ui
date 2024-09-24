import { memo } from 'react';
import { TopNavigationProps } from './TopNavigation.types.ts';
import { Logo, Group, Link } from './components';
import s from './topNavigation.module.scss';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

const TopNavigationComponent = memo<TopNavigationProps>(
  ({ children, className, style, fixed, ...restProps }) => {
    const { topNavigation: topNavigationConfig = {} } = useConfiguration();

    const cls = clsx(
      s.TopNavigation,
      {
        [s.Fixed]: fixed,
      },
      className,
      topNavigationConfig.className,
    );

    const styles = {
      ...topNavigationConfig.style,
      ...style,
    };

    return (
      <header className={cls} style={styles} {...restProps}>
        {children}
      </header>
    );
  },
);

const TopNavigationNamespace = Object.assign(TopNavigationComponent, {
  Logo: Logo,
  Group: Group,
  Link: Link,
});

export { TopNavigationNamespace as TopNavigation };
