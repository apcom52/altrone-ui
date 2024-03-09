import { PopoverProps } from '../Popover/Popover.types';
import { createContext, ReactElement, useContext } from 'react';

export interface BaseDropdownItem {
  focused?: boolean;
}

export interface DropdownActionProps extends BaseDropdownItem {
  label: string;
  icon?: JSX.Element;
  hintText?: string;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

type CloseDropdownContextType = () => void;
export const CloseDropdownContext = createContext<CloseDropdownContextType>(() => null);
export const useCloseDropdownContext = () => useContext(CloseDropdownContext);

export interface DropdownMenuProps {
  children: ReactElement | null | (ReactElement | null)[];
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
