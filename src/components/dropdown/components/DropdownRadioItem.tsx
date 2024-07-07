import { DropdownRadioListItem } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useRadioListDropdownContext } from '../Dropdown.contexts.ts';
import { Icon } from '../../icon';
import s from './action.module.scss';
import { useConfiguration } from 'components/configuration';
import { useId } from 'react';

export function DropdownRadioItem({
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
  const { ref } = useListItem();

  const cls = clsx(
    s.Action,
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

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      role="radio"
      aria-checked={value === selectedValue}
      className={cls}
      style={styles}
      id={id}
      {...props}
    >
      <div className={s.Icon}>
        {value === selectedValue ? <Icon i="check" /> : null}
      </div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}
DropdownRadioItem.displayName = 'DropdownRadioItem';
