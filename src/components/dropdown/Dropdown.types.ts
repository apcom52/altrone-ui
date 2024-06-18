import { PopoverProps } from 'components/popover';
import { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export interface DropdownActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: JSX.Element;
  hintText?: string;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  focused?: boolean;
  renderFunc?: RenderFuncProp<HTMLButtonElement, DropdownActionProps>;
  'data-active'?: boolean;
}

export interface DropdownCheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (state: boolean) => void;
  label: string;
  focused?: boolean;
  disabled?: boolean;
}

export interface DropdownRadioListProps<T = string>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: T;
  onChange: (value: T) => void;
  children:
    | ReactElement<DropdownRadioListItem<T>>
    | ReactElement<DropdownRadioListItem<T>>[];
  label?: string;
}

export interface DropdownRadioListItem<T = string>
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  value: T;
  label: string;
  disabled?: boolean;
  focused?: boolean;
}

export interface DropdownChildMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement;
  children: ReactElement | null | (ReactElement | null)[];
  label: string;
  disabled?: boolean;
}

export interface DropdownMenuProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactElement | null | (ReactElement | null)[];
  defaultFocusItemIndex?: number;
  onChangeFocusItemIndex?: (index: number) => void;
}

export interface DropdownMenuRef {
  selectedIndex: number;
  menuNode: HTMLElement | null;
}

export interface DropdownProps extends PopoverProps {
  closeParentPopover?: boolean;
}
