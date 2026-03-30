import { useCallback } from 'react';
import { Popover } from 'components/popover';
import { PopoverContentContext } from 'components/popover';
import { DropdownProps } from './Dropdown.types';
import { CloseDropdownContext } from './Dropdown.contexts.ts';
import s from './dropdown.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

export function DropdownWrapper(props: DropdownProps) {
  const {
    ref,
    children,
    content,
    trigger,
    placement = 'bottom',
    focusTrap = true,
    focusTrapTargets = ['content', 'reference'],
    className,
    style,
    closeParentPopover = true,
    ...restProps
  } = props;

  const { dropdown: dropdownConfig = {} } = useConfiguration();

  const cls = clsx(s.DropdownPopover, className, dropdownConfig.className);

  const styles = {
    ...dropdownConfig.style,
    ...style,
  };

  const renderContent = useCallback(
    (popoverProps: PopoverContentContext) => (
      <CloseDropdownContext.Provider
        value={
          closeParentPopover
            ? popoverProps.closeAllSequence
            : popoverProps.closePopup
        }
      >
        {typeof content === 'function' ? content(popoverProps) : content}
      </CloseDropdownContext.Provider>
    ),
    [content, closeParentPopover],
  );

  return (
    <Popover
      focusTrap={focusTrap}
      ref={ref}
      className={cls}
      content={renderContent}
      placement={placement}
      trigger={trigger}
      focusTrapTargets={focusTrapTargets}
      style={styles}
      {...restProps}
      listNavigation
    >
      {children}
    </Popover>
  );
}
