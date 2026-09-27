import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
import { DropdownHoverProvider } from '../DropdownHover.contexts';
import { Scrollable } from 'components/scrollable';

export function DropdownMenu({
  ref,
  children,
  className,
  defaultFocusItemIndex = 0,
  onChangeFocusItemIndex,
  style,
  maxHeight,
  ...props
}: DropdownMenuProps) {
  const cls = clsx(s.Menu, 'no-selection', className);

  const styles = {
    ...style,
  };

  return (
    <DropdownHoverProvider>
      <div ref={ref} className={cls} style={styles} {...props}>
        <Scrollable
          overflowX="hidden"
          maxHeight={maxHeight ?? 'var(--dropdown-menu-max-height)'}
        >
          <div className={s.MenuContent}>{children}</div>
        </Scrollable>
      </div>
    </DropdownHoverProvider>
  );
}
