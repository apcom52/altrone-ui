import React from 'react';
import './navigation-list.scss';
import clsx from 'clsx';
import { ContextMenuType, Elevation, Indicator, Surface } from '../../../types';
import { NavigationListProps } from './NavigationList.types';
import { NavigationDivider, NavigationHeader, NavigationLink, NavigationMenu } from './component';

/**
 * This component is used to make a navigation throughout your application
 * @param list
 * @param className
 * @param surface
 * @constructor
 */
const NavigationListComponent = ({
  children,
  className,
  surface = Surface.glass
}: NavigationListProps) => {
  return (
    <div
      className={clsx('alt-navigation-list', className, {
        [`alt-navigation-list--surface-${surface}`]: surface !== Surface.glass
      })}>
      {children}
    </div>
  );
};

const NavigationListNamespace = Object.assign(NavigationListComponent, {
  Header: NavigationHeader,
  Menu: NavigationMenu,
  Link: NavigationLink,
  Divider: NavigationDivider
});

export { NavigationListNamespace as NavigationList };
