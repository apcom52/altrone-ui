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
      className={clsx(s.Action, className, {
        'alt-dropdown-item--disabled': disabled,
      })}
    >
      <div className="alt-dropdown-item__icon alt-dropdown-item__checkbox">
        <Icon i="check" />
        {/*<CheckboxIcon checked={value === selectedValue} width={24} height={12} />*/}
      </div>
      <div className="alt-dropdown-item__title">{label}</div>
    </CompositeItem>
  );
}
DropdownRadioItem.displayName = 'DropdownRadioItem';
