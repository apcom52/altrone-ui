import { forwardRef } from 'react';
import { BottomNavigationItemProps } from '../BottomNavigation.types.ts';
import clsx from 'clsx';
import s from './item.module.scss';
import { useConfiguration } from 'components/configuration';
import { RenderFuncProp } from 'types';

const bottomNavigationItemComponent: RenderFuncProp<
  HTMLAnchorElement,
  BottomNavigationItemProps
> = (ref, props) => {
  const { icon, label, ...restProps } = props;

  return (
    <a ref={ref} {...restProps}>
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
    </a>
  );
};

export const Item = forwardRef<HTMLAnchorElement, BottomNavigationItemProps>(
  (props, ref) => {
    const { bottomNavigation: bottomNavigationConfig = {} } =
      useConfiguration();
    const {
      className,
      renderFunc = bottomNavigationItemComponent,
      ...restProps
    } = props;

    const cls = clsx(
      s.Item,
      {
        [s.Selected]: props.selected,
        [String(bottomNavigationConfig.selectedItemClassName)]:
          bottomNavigationConfig.selectedItemClassName && props.selected,
      },
      className,
    );

    return renderFunc(ref, {
      ...restProps,
      className: cls,
    });
  },
);
