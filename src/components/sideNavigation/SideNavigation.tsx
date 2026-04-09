import { memo } from 'react';
import s from './sideNavigation.module.scss';
import { SideNavigationProps } from './SideNavigation.types.ts';
import { Item } from './components';
import { ScrollSpy } from '../../utils/components/ScrollSpy.tsx';
import clsx from 'clsx';

const SideNavigationComponent = memo<SideNavigationProps>(
  ({ title, children, className, style, ref, ...restProps }) => {
    const cls = clsx(s.SideNavigation, className);

    const titleCls = clsx(s.Title);

    const styles = {
      ...style,
    };

    return (
      <nav className={cls} style={styles} ref={ref} {...restProps}>
        {title ? <div className={titleCls}>{title}</div> : null}
        <ul className={s.Menu}>
          <ScrollSpy>{children}</ScrollSpy>
        </ul>
      </nav>
    );
  },
);

const SideNavigationNamespace = Object.assign(SideNavigationComponent, {
  Item,
});

export { SideNavigationNamespace as SideNavigation };
