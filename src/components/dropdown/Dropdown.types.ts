import { PopoverProps } from 'components';
import { ReactElement } from 'react';
import { BasicComponentProps } from '../../types';

export interface BaseDropdownItem {
  label: string;
  disabled?: boolean;
  className?: string;
}

export interface DropdownActionProps
  extends BasicComponentProps<HTMLDivElement> {
  label: string;
  icon?: JSX.Element;
  hintText?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface DropdownCheckboxProps extends BaseDropdownItem {
  checked: boolean;
  onChange: (state: boolean) => void;
}

export interface DropdownRadioListProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  children:
    | ReactElement<DropdownRadioListItem<T>>
    | ReactElement<DropdownRadioListItem<T>>[];
}

export interface DropdownRadioListItem<T = string> extends BaseDropdownItem {
  value: T;
}

export interface DropdownDividerProps {
  className?: string;
}

export interface DropdownChildMenuProps extends BaseDropdownItem {
  icon?: ReactElement;
  children: ReactElement | null | (ReactElement | null)[];
}

export interface DropdownMenuProps
  extends Omit<BasicComponentProps<HTMLDivElement>, 'children'> {
  children: ReactElement | null | (ReactElement | null)[];
  defaultFocusItemIndex?: number;
  onChangeFocusItemIndex?: (index: number) => void;
}

export interface DropdownMenuRef {
  selectedIndex: number;
  menuNode: HTMLElement | null;
}

export interface DropdownProps extends PopoverProps {
  focusFirstElement?: boolean;
}
