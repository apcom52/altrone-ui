import { DropdownRadioListItem } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useRadioListDropdownContext } from '../Dropdown.contexts.ts';
import { Icon } from '../../icon';
import s from './action.module.scss';

export function DropdownRadioItem({
  value,
  label,
  disabled,
  className,
}: DropdownRadioListItem) {
  const { value: selectedValue, onChange } = useRadioListDropdownContext();

  const onSelect = () => {
    onChange(value);
  };

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  return (
    <CompositeItem
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      role="radio"
      aria-checked={value === selectedValue}
      className={clsx(s.Action, className, {
        [s.DisabledAction]: disabled,
      })}
    >
      <div className={s.Icon}>
        {value === selectedValue ? <Icon i="check" /> : null}
      </div>
      <div className={s.Label}>{label}</div>
    </CompositeItem>
  );
}
DropdownRadioItem.displayName = 'DropdownRadioItem';
