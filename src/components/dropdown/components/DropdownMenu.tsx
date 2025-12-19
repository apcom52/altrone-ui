import { forwardRef, useRef } from 'react';
import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { DropdownHoverProvider } from '../DropdownHover.contexts';

const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      className,
      defaultFocusItemIndex = 0,
      onChangeFocusItemIndex,
      style,
      ...props
    },
    ref
  ) => {
    const { dropdown: { menu: dropdownMenuConfig = {} } = {} } =
      useConfiguration();

    const menuRef = useRef<HTMLDivElement>(null);

    const cls = clsx(s.Menu, className, dropdownMenuConfig.className);

    const styles = {
      ...dropdownMenuConfig.style,
      ...style,
    };

    return (
      <div
        ref={(node) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          menuRef.current = node;
        }}
        className={cls}
        style={styles}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (props, ref) => {
    return (
      <DropdownHoverProvider>
        <DropdownMenuContent ref={ref} {...props} />
      </DropdownHoverProvider>
    );
  }
);
