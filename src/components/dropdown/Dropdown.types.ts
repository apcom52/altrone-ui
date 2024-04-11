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

export interface DropdownCheckboxProps
  extends Omit<BasicComponentProps<HTMLDivElement>, 'onChange'> {
  checked: boolean;
  onChange: (state: boolean) => void;
  label: string;
  disabled?: boolean;
}

export interface DropdownRadioListProps<T = string>
  extends Omit<BasicComponentProps, 'onChange'> {
  value: T;
  onChange: (value: T) => void;
  children:
    | ReactElement<DropdownRadioListItem<T>>
    | ReactElement<DropdownRadioListItem<T>>[];
  label?: string;
}

export interface DropdownRadioListItem<T = string>
  extends Omit<BasicComponentProps<HTMLDivElement>, 'value'> {
  value: T;
  label?: string;
  disabled?: boolean;
}

export interface DropdownGroupProps
  extends BasicComponentProps<HTMLDivElement> {
  label: string;
}

export interface DropdownChildMenuProps
  extends BasicComponentProps<HTMLDivElement> {
  icon?: ReactElement;
  children: ReactElement | null | (ReactElement | null)[];
  label: string;
  disabled?: boolean;
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
