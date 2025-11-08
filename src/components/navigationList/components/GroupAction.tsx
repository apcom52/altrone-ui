import { forwardRef } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import s from './groupAction.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';
import { Button } from 'components/button/Button.tsx';

export const GroupAction = forwardRef<
  HTMLButtonElement,
  NavigationListGroupActionProps
>((props, ref) => {
  const { label, icon, className, style, ...restProps } = props;

  const { navigationList: { groupAction: groupActionConfig = {} } = {} } =
    useConfiguration();

  const cls = clsx(className, groupActionConfig.className);

  const styles = {
    ...groupActionConfig.style,
    ...style,
  };

  return (
    <Button
      size="s"
      className={cls}
      ref={ref}
      title={label}
      style={styles}
      {...restProps}
      icon={icon}
      label={label}
      showLabel={false}
    >
      <div className={s.Icon}>{icon}</div>
    </Button>
  );
});
