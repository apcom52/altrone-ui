import './action.scss';
import { DropdownDividerProps } from '../Dropdown.types';
import clsx from 'clsx';

export function DropdownDivider({ className }: DropdownDividerProps) {
  return <hr className={clsx('alt-dropdown-divider', className)} />;
}
DropdownDivider.displayName = 'DropdownDivider';
