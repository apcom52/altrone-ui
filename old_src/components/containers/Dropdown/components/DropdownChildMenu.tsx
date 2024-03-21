import { DropdownChildMenuProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import './action.scss';
import { Dropdown } from '../Dropdown';
import React from 'react';
import { Icon } from '../../../typography';

export function DropdownChildMenu({
  children,
  label,
  disabled,
  className,
  icon
}: DropdownChildMenuProps) {
  return (
    <Dropdown content={<Dropdown.Menu>{children}</Dropdown.Menu>} placement="right">
      {({ opened }) => (
        <CompositeItem
          disabled={disabled}
          className={clsx('alt-dropdown-item', className, {
            'alt-dropdown-item--disabled': disabled,
            'alt-dropdown-item--opened': opened
          })}>
          {icon && <div className="alt-dropdown-item__icon">{icon}</div>}
          <div className="alt-dropdown-item__title">{label}</div>
          <div className="alt-dropdown-item__arrow">
            <Icon i={opened ? 'chevron_left' : 'chevron_right'} />
          </div>
        </CompositeItem>
      )}
    </Dropdown>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
