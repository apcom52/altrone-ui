import { DropdownChildMenuProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { DropdownWrapper } from '../Dropdown.tsx';
import { DropdownMenu } from './DropdownMenu.tsx';
import { Icon } from 'components/icon';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';

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
    </DropdownWrapper>
  );
}
DropdownChildMenu.displayName = 'DropdownChildMenu';
