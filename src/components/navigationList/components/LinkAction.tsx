import { forwardRef, MouseEventHandler } from 'react';
import { NavigationListLinkActionProps } from '../NavigationList.types.ts';
import s from './linkAction.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';

export const LinkAction = forwardRef<
  HTMLButtonElement,
  NavigationListLinkActionProps
>((props, ref) => {
  const { label, icon, className, style, ...restProps } = props;

  const { navigationList: { linkAction: linkActionConfig = {} } = {} } =
    useConfiguration();

  const cls = clsx(s.Action, className, linkActionConfig.className);

  const styles = {
    ...linkActionConfig.style,
    ...style,
  };

  const onClickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      className={cls}
      ref={ref}
      title={label}
      style={styles}
      {...restProps}
      onClick={onClickHandler}
    >
      <div className={s.Icon}>{icon}</div>
    </button>
  );
});
