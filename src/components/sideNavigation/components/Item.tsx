import { memo, useEffect } from 'react';
import s from './item.module.scss';
import { SideNavigationItemProps } from '../SideNavigation.types.ts';
import clsx from 'clsx';
import { useScrollSpy } from '../../../utils/components/ScrollSpy.tsx';

export const Item = memo<SideNavigationItemProps>(
  ({ label, href, children }) => {
    const { activeItem, observeNewSelector } = useScrollSpy();

    useEffect(() => {
      observeNewSelector(href);
    }, [href]);

    const isSelected = activeItem === href;

    const cls = clsx(s.Item, {
      [s.Selected]: activeItem === href,
    });

    return (
      <li className={cls}>
        <a href={href} aria-selected={isSelected} className={s.Label}>
          {label}
        </a>
        {children ? <ul className={s.Children}>{children}</ul> : null}
      </li>
    );
  },
);
