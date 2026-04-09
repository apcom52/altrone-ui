import { memo } from 'react';
import React from 'react';
import { NavigationListLinkActionProps } from '../NavigationList.types.ts';
import clsx from 'clsx';
import { Button } from 'components/button/Button.tsx';

export const LinkAction = memo(
  ({
    ref,
    label,
    icon,
    className,
    style,
    onClick,
    ...restProps
  }: NavigationListLinkActionProps) => {
    const cls = clsx(className);

    const styles = {
      ...style,
    };

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        size="s"
        variant="text"
        className={cls}
        title={label}
        style={styles}
        icon={icon}
        label={label}
        showLabel={false}
        onClick={handleClick}
        {...restProps}
      />
    );
  },
);
