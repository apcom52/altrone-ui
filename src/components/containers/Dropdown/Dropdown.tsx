import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { PopoverRef } from '../Popover/Popover.types';
import { DropdownProps } from './Dropdown.types';
import { Popover } from '../Popover';
import { FloatingContext } from '@floating-ui/react';
import {
  DropdownMenu,
  DropdownRadioList,
  DropdownCheckbox,
  DropdownAction,
  DropdownRadioItem,
  DropdownDivider
} from './components';
import { CloseDropdownContext } from './Dropdown.contexts';

const DropdownWrapper = forwardRef<PopoverRef, DropdownProps>((props, ref) => {
  const { children, content, trigger, placement = 'bottom' } = props;

  const [, setPopoverContext] = useState<FloatingContext | null>(null);

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

const DropdownNamespace = Object.assign(DropdownWrapper, {
  Menu: DropdownMenu,
  Action: DropdownAction,
  Checkbox: DropdownCheckbox,
  RadioList: DropdownRadioList,
  RadioItem: DropdownRadioItem,
  Divider: DropdownDivider
});

export { DropdownNamespace as Dropdown };
