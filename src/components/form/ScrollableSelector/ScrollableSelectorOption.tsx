import clsx from 'clsx';
import { ScrollableSelectorOptionProps } from './ScrollableSelector';

export const ScrollableSelectorOption = <T extends unknown = string | undefined>({
  option,
  value,
  disabled = false,
  checked = false,
  onChange
}: ScrollableSelectorOptionProps<T>) => {
  return (
    <button
      className={clsx('alt-scrollable-selector__option', {
        'alt-scrollable-selector__option--selected': checked
      })}
      onClick={() => onChange(value)}
      disabled={disabled}
      type="button">
      {option.label}
    </button>
  );
};
