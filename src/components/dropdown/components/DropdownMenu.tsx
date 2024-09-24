import { forwardRef } from 'react';
import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './menu.module.scss';
import { useConfiguration } from 'components/configuration';

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      className,
      defaultFocusItemIndex = 0,
      onChangeFocusItemIndex,
      style,
      ...props
    },
    ref,
  ) => {
    const { dropdown: { menu: dropdownMenuConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(s.Menu, className, dropdownMenuConfig.className);

    const styles = {
      ...dropdownMenuConfig.style,
      ...style,
    };

    return (
      <div ref={ref} className={cls} style={styles} {...props}>
        {children}
      </div>
    );
  },
);
