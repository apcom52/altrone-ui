import { memo } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import clsx from 'clsx';
import { Button } from 'components/button/Button.tsx';

export const GroupAction = memo(
  ({
    ref,
    label,
    icon,
    className,
    style,
    ...restProps
  }: NavigationListGroupActionProps) => {
    const cls = clsx(className);

    const styles = {
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
  },
);
