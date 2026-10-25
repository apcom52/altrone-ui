import { useEffect } from 'react';
import { DropdownChildMenuProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { DropdownWrapper } from '../Dropdown.tsx';
import { DropdownMenu } from './DropdownMenu.tsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import s from './action.module.scss';
import { useDropdownItemHover } from '../useDropdownItemHover.tsx';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';
import { mergeRefs } from 'utils/mergeRefs';

export function DropdownChildMenu({
  ref,
  children,
  label,
  disabled,
  className,
  style,
  icon,
  ...props
}: DropdownChildMenuProps) {
  const currentIndex = usePopoverCurrentIndex();
  const { ref: listItemRef, index } = useListItem();

  const isFocused = currentIndex === index;

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  useEffect(() => {
    if (isFocused) {
      onMouseEnter();
    } else {
      onMouseLeave();
    }
  }, [isFocused]);

  const cls = clsx(s.Action, 'no-selection', className, {
    [s.DisabledAction]: disabled,
  });

  const styles = {
    ...style,
  };

  return (
    <DropdownWrapper
      content={
        <DropdownMenu defaultFocusItemIndex={0}>{children}</DropdownMenu>
      }
      placement="right"
    >
      {({ open: opened }) => (
        <div
          ref={mergeRefs(ref, listItemRef)}
          aria-disabled={disabled}
          className={clsx(cls, {
            [s.OpenedAction]: opened,
          })}
          style={styles}
          role="button"
          tabIndex={-1}
          data-active={isFocused}
          data-index={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          aria-expanded={opened}
          {...props}
        >
          {itemBackgroundElement}
          <div className={s.Icon}>{icon}</div>
          <div className={s.Label}>{label}</div>
          <div className={s.Arrow}>
            {opened ? <ChevronLeft /> : <ChevronRight />}
          </div>
        </div>
      )}
    </DropdownWrapper>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
