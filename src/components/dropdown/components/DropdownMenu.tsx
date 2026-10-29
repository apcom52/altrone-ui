import { DropdownMenuProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
import { DropdownHoverProvider } from '../DropdownHover.contexts';
import { Scrollable } from 'components/scrollable';

/** Keeps the menu above the iOS keyboard — see `applySize` in Popover's middleware. */
const AVAILABLE_HEIGHT =
  'max(96px, calc(var(--popover-available-height, 100dvh) - 2 * var(--space-content)))';

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
          maxHeight={`min(${maxHeight ?? 'var(--dropdown-menu-max-height)'}, ${AVAILABLE_HEIGHT})`}
        >
          <div className={s.MenuContent}>{children}</div>
        </Scrollable>
      </div>
    </DropdownHoverProvider>
  );
}
