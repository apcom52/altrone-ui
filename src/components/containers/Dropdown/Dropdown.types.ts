import { PopoverProps } from '../Popover/Popover.types';
import { ReactElement } from 'react';

export interface BaseDropdownItem {
  label: string;
  disabled?: boolean;
  className?: string;
}

export interface DropdownActionProps extends BaseDropdownItem {
  icon?: JSX.Element;
  hintText?: string;
  onClick?: () => void;
  danger?: boolean;
}

export interface DropdownCheckboxProps extends BaseDropdownItem {
  checked: boolean;
  onChange: (state: boolean) => void;
}

export interface DropdownRadioListProps<T = string> {
  value: T;
  onChange: (value: T) => void;
  children: ReactElement<DropdownRadioListItem<T>> | ReactElement<DropdownRadioListItem<T>>[];
}

export interface DropdownRadioListItem<T = string> extends BaseDropdownItem {
  value: T;
}

export interface DropdownMenuProps {
  children: ReactElement | null | (ReactElement | null)[];
  className?: string;
}

export interface DropdownProps
  extends Pick<
    PopoverProps,
    | 'children'
    | 'content'
    | 'enabled'
    | 'placement'
    | 'trigger'
    | 'width'
    | 'maxHeight'
    | 'useFocusTrap'
    | 'className'
  > {}
