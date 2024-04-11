import { DropdownChildMenuProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { Dropdown } from '../Dropdown';
import { Icon } from 'components';
import s from './action.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export function DropdownChildMenu({
  children,
  label,
  disabled,
  className,
  style,
  icon,
  ...props
}: DropdownChildMenuProps) {
  const { dropdownChildMenu: dropdownChildMenuConfiguration = {} } =
    useConfiguration();

  const cls = clsx(
    s.Action,
    className,
    {
      [s.DisabledAction]: disabled,
    },
    dropdownChildMenuConfiguration.className,
  );

  const styles = {
    ...dropdownChildMenuConfiguration.style,
    ...style,
  };

  return (
    <Dropdown
      content={
        <Dropdown.Menu defaultFocusItemIndex={0}>{children}</Dropdown.Menu>
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
          aria-expanded={opened}
          {...props}
        >
          <div className={s.Icon}>{icon}</div>
          <div className={s.Label}>{label}</div>
          <div className={s.Arrow}>
            <Icon i={opened ? 'chevron_left' : 'chevron_right'} />
          </div>
        </CompositeItem>
      )}
    </Dropdown>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
