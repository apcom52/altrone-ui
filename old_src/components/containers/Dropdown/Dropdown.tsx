import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
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
  DropdownDivider,
  DropdownChildMenu
} from './components';
import { CloseDropdownContext } from './Dropdown.contexts';

const DropdownWrapper = forwardRef<PopoverRef, DropdownProps>((props, ref) => {
  const {
    children,
    content,
    trigger,
    placement = 'bottom',
    focusTrapTargets = ['content', 'reference'],
    focusFirstElement = true,
    ...restProps
  } = props;

  const [popoverContext, setPopoverContext] = useState<FloatingContext | null>(null);

  const popoverRef = useRef<PopoverRef | null>(null);

  useEffect(() => {
    if (popoverRef.current?.context) {
      setPopoverContext(popoverRef.current?.context);
    }
  }, [popoverRef.current?.context]);

  useImperativeHandle(
    ref,
    () =>
      popoverRef.current
        ? popoverRef.current
        : {
            opened: false,
            contentNode: null,
            context: popoverContext as FloatingContext,
            childrenNode: null
          },
    [popoverContext, popoverRef.current]
  );

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
      focusTrapTargets={focusTrapTargets}
      {...restProps}>
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
  Divider: DropdownDivider,
  ChildMenu: DropdownChildMenu
});

export { DropdownNamespace as Dropdown };
