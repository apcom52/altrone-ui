import { DropdownRadioListItem } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useRadioListDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { useId } from 'react';
import { useDropdownItemHover } from '../useDropdownItemHover.tsx';
import { mergeRefs } from 'utils/mergeRefs';
import { Check } from 'lucide-react';

export function DropdownRadioItem({
  ref,
  value,
  label,
  disabled,
  className,
  style,
  focused,
  ...props
}: DropdownRadioListItem) {
  const { dropdown: { radioItem: dropdownRadioItemConfig = {} } = {} } =
    useConfiguration();

  const id = useId();
  const { ref: listItemRef } = useListItem();

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  const cls = clsx(
    s.Action,
    'no-selection',
    className,
    {
      [s.DisabledAction]: disabled,
      [s.Focused]: focused,
    },
    dropdownRadioItemConfig.className,
  );

  const styles = {
    ...dropdownRadioItemConfig.style,
    ...style,
  };

  const { value: selectedValue, onChange } = useRadioListDropdownContext();

  const onSelect = () => {
    onChange(value);
  };

  const onKeyDownPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  return (
    <button
      ref={mergeRefs(listItemRef, ref)}
      type="button"
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      role="radio"
      aria-checked={value === selectedValue}
      className={cls}
      style={styles}
      id={id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    >
      {itemBackgroundElement}
      <div className={s.Icon}>{value === selectedValue ? <Check /> : null}</div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}
DropdownRadioItem.displayName = 'DropdownRadioItem';
