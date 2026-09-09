import { DropdownCheckboxProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import s from './action.module.scss';
import { useId } from 'react';
import { useDropdownItemHover } from '../useDropdownItemHover';
import { mergeRefs } from 'utils/mergeRefs';
import { CheckIcon } from 'components/checkbox';

export function DropdownCheckbox({
  ref,
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

  const { ref: listItemRef } = useListItem();

  const { itemBackgroundElement, onMouseEnter, onMouseLeave } =
    useDropdownItemHover();

  const cls = clsx(
    s.Action,
    'no-selection',
    {
      [s.DisabledAction]: disabled,
      [s.Focused]: focused,
    },
    className,
  );

  const styles = {
    ...style,
  };

  const onSelect = () => {
    onChange(!checked);
  };

  const onKeyDownPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onKeyDownPress}
      onClick={onSelect}
      disabled={disabled}
      className={cls}
      role="checkbox"
      aria-checked={checked}
      style={styles}
      ref={mergeRefs(listItemRef, ref)}
      id={id}
      title={label}
      {...props}
    >
      {itemBackgroundElement}
      <div className={s.Icon}>
        <CheckIcon checked={checked} />
      </div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}

DropdownCheckbox.displayName = 'DropdownCheckbox';
