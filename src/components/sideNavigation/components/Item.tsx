import { memo, useEffect } from 'react';
import s from './item.module.scss';
import { SideNavigationItemProps } from '../SideNavigation.types.ts';
import clsx from 'clsx';
import { useScrollSpy } from '../../../utils/components/ScrollSpy.tsx';
import { useConfiguration } from 'components/configuration';

export const Item = memo<SideNavigationItemProps>(
  ({ label, href, children, className, ...restProps }) => {
    const { sideNavigation: sideNavigationConfig = {} } = useConfiguration();

    const { activeItem, observeNewSelector } = useScrollSpy();

    useEffect(() => {
      observeNewSelector(href);
    }, [href]);

    const isSelected = activeItem === href;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: isSelected,
        [String(sideNavigationConfig.selectedItemClassName)]:
          sideNavigationConfig.selectedItemClassName && isSelected,
      },
      className,
    );

    return (
      <li className={cls}>
        <a
          href={href}
          aria-selected={isSelected}
          className={s.Label}
          {...restProps}
        >
          {label}
        </a>
        {children ? <ul className={s.Children}>{children}</ul> : null}
      </li>
    );
  },
);
