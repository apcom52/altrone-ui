import { memo } from 'react';
import React from 'react';
import { NavigationListLinkActionProps } from '../NavigationList.types.ts';
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
    /* Sits inside a clickable `NavigationList.Link` — stop the event so
       activating the action doesn't also navigate the parent link. */
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      e.preventDefault();
      onClick?.(e);
    };

    return (
      <Button
        ref={ref}
        size="s"
        className={className}
        style={style}
        title={label}
        icon={icon}
        label={label}
        showLabel={false}
        onClick={handleClick}
        {...restProps}
      />
    );
  },
);
