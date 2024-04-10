import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Popover, PopoverRef } from 'components';
import { DropdownProps } from './Dropdown.types';
import { FloatingContext } from '@floating-ui/react';
import {
  DropdownMenu,
  DropdownRadioList,
  DropdownCheckbox,
  DropdownAction,
  DropdownRadioItem,
  DropdownChildMenu,
} from './components';
import { CloseDropdownContext } from './Dropdown.contexts.ts';
import s from './dropdown.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';

const DropdownWrapper = forwardRef<PopoverRef, DropdownProps>((props, ref) => {
  const {
    children,
    content,
    trigger,
    placement = 'bottom',
    focusTrapTargets = ['content', 'reference'],
    focusFirstElement = true,
    className,
    ...restProps
  } = props;

  const { dropdown: dropdownConfig = {} } = useConfiguration();

  const cls = clsx(s.DropdownPopover, className, dropdownConfig.className);

  const [popoverContext, setPopoverContext] = useState<FloatingContext | null>(
    null,
  );

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
            childrenNode: null,
            closePopup: () => null,
            openPopup: () => null,
          },
    [popoverContext, popoverRef.current],
  );

  return (
    <Popover
      focusTrap
      ref={popoverRef}
      className={cls}
      content={(props) => (
        <CloseDropdownContext.Provider value={props.closeAllSequence}>
          {typeof content === 'function' ? content(props) : content}
        </CloseDropdownContext.Provider>
      )}
      placement={placement}
      trigger={trigger}
      focusTrapTargets={focusTrapTargets}
      {...restProps}
    >
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
  ChildMenu: DropdownChildMenu,
});

export { DropdownNamespace as Dropdown };
