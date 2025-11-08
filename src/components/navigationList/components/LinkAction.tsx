import { forwardRef, MouseEventHandler } from 'react';
import { NavigationListLinkActionProps } from '../NavigationList.types.ts';
import s from './linkAction.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration';
import { Button } from 'components/button/Button.tsx';

export const LinkAction = forwardRef<
  HTMLButtonElement,
  NavigationListLinkActionProps
>((props, ref) => {
  const { label, icon, className, style, ...restProps } = props;

  const { navigationList: { linkAction: linkActionConfig = {} } = {} } =
    useConfiguration();

  const cls = clsx(className, linkActionConfig.className);

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
    <Button
      size="s"
      variant="text"
      className={cls}
      ref={ref}
      title={label}
      style={styles}
      {...restProps}
      icon={icon}
      label={label}
      showLabel={false}
      onClick={onClickHandler}
    />
  );
});
