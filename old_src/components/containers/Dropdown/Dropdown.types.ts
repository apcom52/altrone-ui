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

export interface DropdownDividerProps {
  className?: string;
}

export interface DropdownChildMenuProps extends BaseDropdownItem {
  icon?: ReactElement;
  children: ReactElement | null | (ReactElement | null)[];
}

export interface DropdownMenuProps {
  children: ReactElement | null | (ReactElement | null)[];
  defaultFocusItemIndex?: number;
  onChangeFocusItemIndex?: (index: number) => void;
  className?: string;
}

export interface DropdownMenuRef {
  selectedIndex: number;
  menuNode: HTMLElement | null;
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
    | 'useFocusTrap'
    | 'useParentWidth'
    | 'minWidth'
    | 'maxWidth'
    | 'minHeight'
    | 'maxHeight'
    | 'className'
    | 'focusTrapTargets'
  > {
  focusFirstElement?: boolean;
}