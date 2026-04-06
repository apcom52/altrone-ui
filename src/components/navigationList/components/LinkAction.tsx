import { memo } from 'react';
import React from 'react';
import { NavigationListLinkActionProps } from '../NavigationList.types.ts';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';
import { Button } from 'components/button/Button.tsx';

export const LinkAction = memo(({ ref, label, icon, className, style, onClick, ...restProps }: NavigationListLinkActionProps) => {
  const { navigationList: { linkAction: linkActionConfig = {} } = {} } = useConfiguration();

  const cls = clsx(className, linkActionConfig.className);

  const styles = {
    ...linkActionConfig.style,
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
});
