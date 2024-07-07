import { memo } from 'react';
import s from './sideNavigation.module.scss';
import { SideNavigationProps } from './SideNavigation.types.ts';
import { Item } from './components';
import { ScrollSpy } from '../../utils/components/ScrollSpy.tsx';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

const SideNavigationComponent = memo<SideNavigationProps>(
  ({ title, children, className, style, ...restProps }) => {
    const { sideNavigation: sideNavigationConfig = {} } = useConfiguration();

    const cls = clsx(
      s.SideNavigation,
      className,
      sideNavigationConfig.className,
    );

    const titleCls = clsx(s.Title, sideNavigationConfig.titleClassName);

    const styles = {
      ...sideNavigationConfig.style,
      ...style,
    };

    return (
      <nav className={cls} style={styles} {...restProps}>
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
