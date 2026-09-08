import { memo } from 'react';
import { NavigationListGroupActionProps } from '../NavigationList.types.ts';
import { Button } from 'components/button/Button.tsx';

export const GroupAction = memo(
  ({
    ref,
    label,
    icon,
    className,
    style,
    ...restProps
  }: NavigationListGroupActionProps) => (
    <Button
      ref={ref}
      size="s"
      className={className}
      style={style}
      title={label}
      icon={icon}
      label={label}
      showLabel={false}
      {...restProps}
    />
  ),
);
