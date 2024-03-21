import { forwardRef } from 'react';
import clsx from 'clsx';
import './toolbar-menu.scss';
import { ToolbarMenuItemProps } from '../Toolbar.types';

export const ToolbarMenuItem = forwardRef<HTMLButtonElement, ToolbarMenuItemProps>(
  ({ label, active, onClick, disabled, className }, ref) => {
    return (
      <button
        type="button"
        className={clsx('alt-toolbar-menu__item', className, {
          'alt-toolbar-menu__item--active': active
        })}
        disabled={disabled}
        ref={ref}
        onClick={onClick}
        data-testid="alt-test-toolbarMenu">
        {label}
      </button>
    );
  }
);

ToolbarMenuItem.displayName = 'ToolbarMenuItem';
