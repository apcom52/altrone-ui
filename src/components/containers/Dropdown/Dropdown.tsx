import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { PopoverRef } from '../Popover/Popover.types';
import { CloseDropdownContext, DropdownProps } from './Dropdown.types';
import { Popover } from '../Popover';
import { FloatingContext, FloatingList, useListNavigation } from '@floating-ui/react';

export const Dropdown = forwardRef<PopoverRef, DropdownProps>((props, ref) => {
  const { children, content, trigger, placement = 'bottom' } = props;

  const [popoverContext, setPopoverContext] = useState<FloatingContext | null>(null);

  const popoverRef = useRef<PopoverRef | null>(null);

  useEffect(() => {
    if (popoverRef.current?.context) {
      setPopoverContext(popoverRef.current?.context);
    }
  }, [popoverRef.current?.context]);

  return (
    <Popover
      useFocusTrap={true}
      ref={popoverRef}
      content={(props) => (
        <CloseDropdownContext.Provider value={props.closePopup}>
          {typeof content === 'function' ? content(props) : content}
        </CloseDropdownContext.Provider>
      )}
      placement={placement}
      trigger={trigger}
      focusTrapTargets={['content', 'reference']}>
      {children}
    </Popover>
  );
});
