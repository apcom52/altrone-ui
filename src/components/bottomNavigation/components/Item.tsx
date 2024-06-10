import { forwardRef } from 'react';
import { BottomNavigationItemProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Item = forwardRef<HTMLButtonElement, BottomNavigationItemProps>(
  (props, ref) => {
    const { bottomNavigation: bottomNavigationConfig = {} } =
      useConfiguration();
    const { icon, label, className, selected, ...restProps } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: selected,
        [String(bottomNavigationConfig.selectedItemClassName)]:
          bottomNavigationConfig.selectedItemClassName && selected,
      },
      className,
    );

    return (
      <button type="button" ref={ref} className={cls} {...restProps}>
        <div className={s.Icon}>{icon}</div>
        <div className={s.Label}>{label}</div>
      </button>
    );
  },
);
