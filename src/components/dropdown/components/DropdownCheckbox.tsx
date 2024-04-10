import { DropdownCheckboxProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { Icon } from 'components';
import s from './action.module.scss';

export function DropdownCheckbox({
  checked,
  onChange,
  disabled,
  label,
  className,
}: DropdownCheckboxProps) {
  const onSelect = () => {
    onChange(!checked);
  };

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  const cls = clsx(
    s.Action,
    {
      [s.DisabledAction]: disabled,
    },
    className,
  );

  return (
    <CompositeItem
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      className={cls}
      role="checkbox"
      aria-checked={checked}
    >
      <div className={s.Icon}>{checked ? <Icon i="check" /> : null}</div>
      <div className={s.Label}>{label}</div>
    </CompositeItem>
  );
}

DropdownCheckbox.displayName = 'DropdownCheckbox';
