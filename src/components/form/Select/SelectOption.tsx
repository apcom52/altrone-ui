import clsx from 'clsx';
import { Icon } from '../../icons';
import button from '../../button/Button/Button';
import { memo } from 'react';

export interface SelectOptionProps {
  label: string;
  value: string | number;
  disabled: boolean;
  selected: boolean;
  onSelect: (value: number | string) => void;
  parent?: string | number;
  className?: string;
  inSelectHeader?: boolean;
}

const SelectOption = ({
  label,
  value,
  disabled = false,
  selected = false,
  onSelect,
  className,
  inSelectHeader = false
}: SelectOptionProps) => {
  const ComponentName = inSelectHeader ? 'div' : 'button';

  return (
    <ComponentName
      className={clsx('alt-select-option', className, {
        'alt-select-option--selected': selected,
        'alt-select-option--disabled': disabled
      })}
      title={label}
      disabled={disabled}
      onClick={() => onSelect(value)}
    >
      <div className="alt-select-option__icon">{selected ? <Icon i="check" /> : null}</div>
      <div className="alt-select-option__label">{label}</div>
    </ComponentName>
  );
};

export default memo(SelectOption);
