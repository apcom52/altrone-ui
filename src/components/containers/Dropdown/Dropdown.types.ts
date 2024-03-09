import { PopoverProps } from '../Popover/Popover.types';

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
