import { forwardRef } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import s from './groupAction.module.scss';
import clsx from 'clsx';

export const GroupAction = forwardRef<
  HTMLButtonElement,
  NavigationListGroupActionProps
>((props, ref) => {
  const { label, icon, className, ...restProps } = props;

  const cls = clsx(s.Action, className);

  return (
    <button
      type="button"
      className={cls}
      ref={ref}
      title={label}
      {...restProps}
    >
      <div className={s.Icon}>{icon}</div>
    </button>
  );
});
