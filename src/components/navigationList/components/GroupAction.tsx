import { forwardRef } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import s from './groupAction.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';

export const GroupAction = forwardRef<
  HTMLButtonElement,
  NavigationListGroupActionProps
>((props, ref) => {
  const { label, icon, className, style, ...restProps } = props;

  const { navigationList: { groupAction: groupActionConfig = {} } = {} } =
    useConfiguration();

  const cls = clsx(s.Action, className, groupActionConfig.className);

  const styles = {
    ...groupActionConfig.style,
    ...style,
  };

  return (
    <button
      type="button"
      className={cls}
      ref={ref}
      title={label}
      style={styles}
      {...restProps}
    >
      <div className={s.Icon}>{icon}</div>
    </button>
  );
});
