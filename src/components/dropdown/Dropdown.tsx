import { forwardRef } from 'react';
import { Popover, PopoverRef } from 'components/popover';
import { DropdownProps } from './Dropdown.types';
import { CloseDropdownContext } from './Dropdown.contexts.ts';
import s from './dropdown.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

export const DropdownWrapper = forwardRef<PopoverRef, DropdownProps>(
  (props, ref) => {
    const {
      children,
      content,
      trigger,
      placement = 'bottom',
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

    return (
      <Popover
        focusTrap
        ref={ref}
        className={cls}
        content={(props) => (
          <CloseDropdownContext.Provider
            value={
              closeParentPopover ? props.closeAllSequence : props.closePopup
            }
          >
            {typeof content === 'function' ? content(props) : content}
          </CloseDropdownContext.Provider>
        )}
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
  },
);
