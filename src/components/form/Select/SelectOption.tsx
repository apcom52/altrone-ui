import clsx from 'clsx';
import { Icon } from '../../icons';

export interface SelectOptionProps<T> {
  label: string;
  value: T;
  disabled: boolean;
  selected: boolean;
  onSelect: (value: T) => void;
  parent?: string | number;
  className?: string;
  inSelectHeader?: boolean;
}

const SelectOption = <T extends unknown = string | undefined>({
  label,
  value,
  disabled = false,
  selected = false,
  onSelect,
  className,
  inSelectHeader = false
}: SelectOptionProps<T>) => {
  const ComponentName = inSelectHeader ? 'div' : 'button';

  return (
    <ComponentName
      className={clsx('alt-select-option', className, {
        'alt-select-option--selected': selected,
        'alt-select-option--disabled': disabled
      })}
      title={label}
      disabled={disabled}
      data-testid="alt-test-select-option"
      onClick={() => onSelect(value)}>
      <div className="alt-select-option__icon">{selected ? <Icon i="check" /> : null}</div>
      <div className="alt-select-option__label">{label}</div>
    </ComponentName>
  );
};

export default SelectOption;
