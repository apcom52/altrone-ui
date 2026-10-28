import { DropdownCheckboxProps } from '../Dropdown.types';
import clsx from 'clsx';
import s from './action.module.scss';
import { useId } from 'react';
import { useDropdownListItem } from '../useDropdownListItem';
import { mergeRefs } from 'utils/mergeRefs';
import { composeEventHandlers } from 'utils/utils/composeEventHandlers';
import { CheckIcon } from 'components/checkbox';

export function DropdownCheckbox({
  ref,
  id,
  checked,
  onChange,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  disabled,
  label,
  className,
  focused,
  style,
  ...props
}: DropdownCheckboxProps) {
  const generatedId = useId();

  const listItem = useDropdownListItem();

  const cls = clsx(
    s.Action,
    'no-selection',
    {
      [s.DisabledAction]: disabled,
      [s.Focused]: focused,
    },
    className,
  );

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChange(!checked, event);
  };

  const onKeyDownPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      onChange(!checked, e);
    }
  };

  return (
    <button
      type="button"
      {...props}
      onMouseEnter={composeEventHandlers(onMouseEnter, listItem.onMouseEnter)}
      onMouseLeave={composeEventHandlers(onMouseLeave, listItem.onMouseLeave)}
      onKeyDown={composeEventHandlers(onKeyDown, onKeyDownPress)}
      onClick={composeEventHandlers(onClick, onSelect)}
      disabled={disabled}
      className={cls}
      role="checkbox"
      aria-checked={checked}
      style={style}
      ref={mergeRefs(listItem.ref, ref)}
      id={id ?? generatedId}
      title={label}
      data-active={listItem.isFocused}
      data-index={listItem.index}
    >
      {listItem.itemBackgroundElement}
      <div className={s.Icon}>
        <CheckIcon checked={checked} />
      </div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}

DropdownCheckbox.displayName = 'DropdownCheckbox';
