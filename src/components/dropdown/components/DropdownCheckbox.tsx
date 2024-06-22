import { DropdownCheckboxProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { Icon } from 'components/icon';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { useId } from 'react';

export function DropdownCheckbox({
  checked,
  onChange,
  disabled,
  label,
  className,
  focused,
  style,
  ...props
}: DropdownCheckboxProps) {
  const id = useId();

  const { ref } = useListItem();

  const { dropdown: { checkbox: dropdownCheckboxConfiguration = {} } = {} } =
    useConfiguration();

  const cls = clsx(
    s.Action,
    {
      [s.DisabledAction]: disabled,
      [s.Focused]: focused,
    },
    className,
    dropdownCheckboxConfiguration.className,
  );

  const styles = {
    ...dropdownCheckboxConfiguration.style,
    ...style,
  };

  const onSelect = () => {
    onChange(!checked);
  };

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      className={cls}
      role="checkbox"
      aria-checked={checked}
      style={styles}
      ref={ref}
      id={id}
      {...props}
    >
      <div className={s.Icon}>{checked ? <Icon i="check" /> : null}</div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}

DropdownCheckbox.displayName = 'DropdownCheckbox';
