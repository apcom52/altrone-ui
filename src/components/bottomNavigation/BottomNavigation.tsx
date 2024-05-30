import { memo } from 'react';
import { BottomNavigationProps } from './BottomNavigation.types.ts';
import s from './bottomNavigation.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const BottomNavigation = memo<BottomNavigationProps>(
  ({ children, className, style, ...restProps }) => {
    const { bottomNavigation: bottomNavigationConfig = {} } =
      useConfiguration();

    const cls = clsx(
      s.BottomNavigation,
      className,
      bottomNavigationConfig.className,
    );
    const styles = {
      ...bottomNavigationConfig.style,
      ...style,
    };

    return (
      <div className={cls} style={styles} {...restProps}>
        {children}
      </div>
    );
  },
);

const BottomNavigationNamespace = Object.assign(BottomNavigation, {
  Item,
});

export { BottomNavigationNamespace as BottomNavigation };
