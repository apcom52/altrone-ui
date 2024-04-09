import { DropdownCheckboxProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
// import { CheckboxIcon } from '../../../form/Checkbox/CheckboxIcon';
import './action.scss';
import { Icon } from 'components';

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

  return (
    <CompositeItem
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      className={clsx('alt-dropdown-item', className, {
        'alt-dropdown-item--disabled': disabled,
      })}
    >
      <div className="alt-dropdown-item__icon alt-dropdown-item__checkbox">
        <Icon i="check" />
        {/*<CheckboxIcon checked={checked} width={24} height={12} />*/}
      </div>
      <div className="alt-dropdown-item__title">{label}</div>
    </CompositeItem>
  );
}
DropdownCheckbox.displayName = 'DropdownCheckbox';
