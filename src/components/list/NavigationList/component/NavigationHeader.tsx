import { forwardRef } from 'react';
import { NavigationHeaderProps } from '../NavigationList.types';
import './header.scss';
import clsx from 'clsx';

export const NavigationHeader = forwardRef<HTMLDivElement, NavigationHeaderProps>(
  ({ title, action, className }, ref) => {
    return (
      <div ref={ref} className={clsx('alt-navigation-header', className)}>
        {title && <div className="alt-navigation-list__title">{title}</div>}
        <div className="alt-navigation-header__action">{action}</div>
      </div>
    );
  }
);
