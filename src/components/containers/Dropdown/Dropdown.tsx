import React, { forwardRef } from 'react';
import { PopoverRef } from '../Popover/Popover.types';
import { DropdownProps } from './Dropdown.types';
import { Popover } from '../Popover';

export const Dropdown = forwardRef<PopoverRef, DropdownProps>((props, ref) => {
  const { children, content } = props;

  return (
    <Popover ref={ref} content={content}>
      {children}
    </Popover>
  );
});
