import { memo } from 'react';
import s from './header.module.css';
import { NavigationListHeaderProps } from '../NavigationList.types';
import clsx from 'clsx';

export const Header = memo<NavigationListHeaderProps>((props) => {
  const { children, className, ...restProps } = props;

  const cls = clsx(s.Header, className);

  return (
    <div className={cls} {...restProps}>
      {children}
    </div>
  );
});
