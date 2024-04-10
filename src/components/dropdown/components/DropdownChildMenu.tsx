import { DropdownChildMenuProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { Dropdown } from '../Dropdown';
import { Icon } from 'components';
import s from './action.module.scss';

export function DropdownChildMenu({
  children,
  label,
  disabled,
  className,
  icon,
}: DropdownChildMenuProps) {
  return (
    <Dropdown
      content={
        <Dropdown.Menu defaultFocusItemIndex={0}>{children}</Dropdown.Menu>
      }
      placement="right"
    >
      {({ opened }) => (
        <CompositeItem
          disabled={disabled}
          className={clsx(s.Action, className, {
            [s.DisabledAction]: disabled,
            [s.OpenedAction]: opened,
          })}
        >
          <div className={s.Icon}>{icon}</div>
          <div className={s.Label}>{label}</div>
          <div className={s.Arrow}>
            <Icon i={opened ? 'chevron_left' : 'chevron_right'} />
          </div>
        </CompositeItem>
      )}
    </Dropdown>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
