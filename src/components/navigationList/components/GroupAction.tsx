import { memo } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';
import { Button } from 'components/button/Button.tsx';

export const GroupAction = memo(({ ref, label, icon, className, style, ...restProps }: NavigationListGroupActionProps) => {
  const { navigationList: { groupAction: groupActionConfig = {} } = {} } = useConfiguration();

  const cls = clsx(className, groupActionConfig.className);

  const styles = {
    ...groupActionConfig.style,
    ...style,
  };

  return (
    <Button
      ref={ref}
      size="s"
      className={cls}
      title={label}
      style={styles}
      icon={icon}
      label={label}
      showLabel={false}
      {...restProps}
    />
  );
});
