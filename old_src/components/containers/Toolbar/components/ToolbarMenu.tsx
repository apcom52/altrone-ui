import { forwardRef } from 'react';
import clsx from 'clsx';
import './toolbar-menu.scss';
import { ToolbarMenuProps } from '../Toolbar.types';

export const ToolbarMenu = forwardRef<HTMLDivElement, ToolbarMenuProps>(
  ({ children, className }, ref) => {
    return (
      <div
        className={clsx('alt-toolbar-menu', className)}
        ref={ref}
        data-testid="alt-test-toolbarMenu">
        {children}
      </div>
    );
  }
);

ToolbarMenu.displayName = 'ToolbarMenu';
