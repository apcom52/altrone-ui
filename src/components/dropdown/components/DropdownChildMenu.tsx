import { DropdownChildMenuProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { DropdownWrapper } from '../Dropdown.tsx';
import { DropdownMenu } from './DropdownMenu.tsx';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { useDropdownItemHover } from '../useDropdownItemHover.tsx';

export function DropdownChildMenu({
  children,
  label,
  disabled,
  className,
  style,
  icon,
  ...props
}: DropdownChildMenuProps) {
  const { dropdown: { childMenu: dropdownChildMenuConfiguration = {} } = {} } =
    useConfiguration();

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  const cls = clsx(
    s.Action,
    className,
    {
      [s.DisabledAction]: disabled,
    },
    dropdownChildMenuConfiguration.className
  );

  const styles = {
    ...dropdownChildMenuConfiguration.style,
    ...style,
  };

  return (
    <DropdownWrapper
      content={
        <DropdownMenu defaultFocusItemIndex={0}>{children}</DropdownMenu>
      }
      placement="right"
    >
      {({ opened }) => (
        <CompositeItem
          disabled={disabled}
          className={clsx(cls, {
            [s.OpenedAction]: opened,
          })}
          style={styles}
          role="button"
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
        </CompositeItem>
      )}
    </DropdownWrapper>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
