import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { DropdownHoverProvider } from '../DropdownHover.contexts';

export function DropdownMenu({
  ref,
  children,
  className,
  defaultFocusItemIndex = 0,
  onChangeFocusItemIndex,
  style,
  ...props
}: DropdownMenuProps) {
  const { dropdown: { menu: dropdownMenuConfig = {} } = {} } =
    useConfiguration();

  const cls = clsx(
    s.Menu,
    'no-selection',
    className,
    dropdownMenuConfig.className,
  );

  const styles = {
    ...dropdownMenuConfig.style,
    ...style,
  };

  return (
    <DropdownHoverProvider>
      <div ref={ref} className={cls} style={styles} {...props}>
        {children}
      </div>
    </DropdownHoverProvider>
  );
}
