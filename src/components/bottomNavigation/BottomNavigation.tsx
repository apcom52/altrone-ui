import { memo, useId } from 'react';
import { BottomNavigationProps } from './BottomNavigation.types.ts';
import s from './bottomNavigation.module.scss';
import clsx from 'clsx';
import { Item } from './components';
import { BottomNavigationContext } from './BottomNavigation.context.tsx';

const BottomNavigation = memo<BottomNavigationProps>(
  ({ ref, children, className, style, floating = true, ...restProps }) => {
    const id = useId();

    const cls = clsx(s.BottomNavigation, { [s.Floating]: floating }, className);
    const styles = {
      ...style,
    };

    return (
      <BottomNavigationContext.Provider value={`bottom-navigation-${id}`}>
        <div ref={ref} className={cls} style={styles} {...restProps}>
          {children}
        </div>
      </BottomNavigationContext.Provider>
    );
  },
);

const BottomNavigationNamespace = Object.assign(BottomNavigation, {
  Item,
});

export { BottomNavigationNamespace as BottomNavigation };
