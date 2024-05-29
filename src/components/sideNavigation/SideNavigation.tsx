import { memo } from 'react';
import s from './sideNavigation.module.scss';
import { SideNavigationProps } from './SideNavigation.types.ts';
import { Item } from './components';
import { ScrollSpy } from '../../utils/components/ScrollSpy.tsx';

const SideNavigationComponent = memo<SideNavigationProps>(
  ({ title, children }) => {
    return (
      <nav className={s.SideNavigation}>
        {title ? <div className={s.Title}>{title}</div> : null}
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
