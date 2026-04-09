import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
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
  const cls = clsx(s.Menu, 'no-selection', className);

  const styles = {
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
