import { forwardRef } from 'react';
import { NavigationMenuProps } from '../NavigationList.types';
import clsx from 'clsx';
import './menu.scss';

export const NavigationMenu = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ children, className }, ref) => {
    return <div className={clsx('alt-navigation-menu', className)}>{children}</div>;
  }
);
