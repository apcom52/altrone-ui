import { memo, useEffect } from 'react';
import s from './item.module.scss';
import { SideNavigationItemProps } from '../SideNavigation.types.ts';
import clsx from 'clsx';
import { useScrollSpy } from '../../../utils/components/ScrollSpy.tsx';

export const Item = memo<SideNavigationItemProps>(
  ({ ref, label, href, children, className, style, ...restProps }) => {
    const { activeItem, observeNewSelector } = useScrollSpy();

    useEffect(() => {
      observeNewSelector(href);
    }, [href, observeNewSelector]);

    const isSelected = activeItem === href;

    const cls = clsx(s.Item, { [s.Selected]: isSelected }, className);

    return (
      <li ref={ref} className={cls} style={style}>
        <a
          href={href}
          aria-current={isSelected ? 'page' : undefined}
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
