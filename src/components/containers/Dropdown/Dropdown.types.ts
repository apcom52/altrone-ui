import { PopoverProps } from '../Popover/Popover.types';
import { createContext, ReactElement, useContext } from 'react';
import { DropdownMenu } from './components/DropdownMenu';
import { DropdownAction } from './components/DropdownAction';
import { DropdownCheckbox } from './components/DropdownCheckbox';

export interface BaseDropdownItem {
  focused?: boolean;
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

type CloseDropdownContextType = () => void;
export const CloseDropdownContext = createContext<CloseDropdownContextType>(() => null);
export const useCloseDropdownContext = () => useContext(CloseDropdownContext);

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

export type DropdownSubcomponents = {
  Menu: typeof DropdownMenu;
  Action: typeof DropdownAction;
  Checkbox: typeof DropdownCheckbox;
};
