import {
  PopoverChildrenContext,
  PopoverContentContext,
} from 'components/popover';
import { PopoverProps } from 'components/popover/Popover.types';
import { ReactElement, ReactNode, Ref } from 'react';
import { RenderFuncProp } from '../../types';
import { RenderFunction } from 'utils';

export interface DropdownActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: React.ReactElement;
  hintText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  danger?: boolean;
  disabled?: boolean;
  focused?: boolean;
  asChild?: boolean;
  renderFunc?: RenderFuncProp<
    HTMLButtonElement,
    DropdownActionProps & { keyProp?: string }
  >;
  'data-active'?: boolean;
  'data-dropdown-action'?: boolean;
  'data-index'?: number;
  keyProp?: string;
  badge?: string | number | React.ReactElement;
}

export interface DropdownCheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  ref?: React.Ref<HTMLButtonElement>;
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
  ref?: React.Ref<HTMLButtonElement>;
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
  ref?: Ref<HTMLDivElement>;
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
  children: RenderFunction<ReactNode, PopoverChildrenContext>;
  content: RenderFunction<ReactNode, PopoverContentContext>;
}
