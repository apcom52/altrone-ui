import { DropdownRadioListItem } from '../Dropdown.types';
import clsx from 'clsx';
import { useRadioListDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useId } from 'react';
import { useDropdownListItem } from '../useDropdownListItem.tsx';
import { mergeRefs } from 'utils/mergeRefs';
import { composeEventHandlers } from 'utils/utils/composeEventHandlers';
import { CheckIcon } from 'components/checkbox';

export function DropdownRadioItem({
  ref,
  id,
  value,
  label,
  disabled,
  className,
  style,
  focused,
  onClick,
  onKeyDown,
  onMouseEnter,
  onMouseLeave,
  ...props
}: DropdownRadioListItem) {
  const generatedId = useId();

  const listItem = useDropdownListItem();

  const cls = clsx(s.Action, 'no-selection', className, {
    [s.DisabledAction]: disabled,
    [s.Focused]: focused,
  });

  const { value: selectedValue, onChange } = useRadioListDropdownContext();

  const onSelect = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    onChange(value, event);
  };

  const onKeyDownPress: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === 'Enter') {
      onSelect(e);
    }
  };

  return (
    <button
      type="button"
      {...props}
      ref={mergeRefs(listItem.ref, ref)}
      onKeyDown={composeEventHandlers(onKeyDown, onKeyDownPress)}
      onClick={composeEventHandlers(onClick, onSelect)}
      disabled={disabled}
      role="radio"
      aria-checked={value === selectedValue}
      className={cls}
      style={style}
      id={id ?? generatedId}
      onMouseEnter={composeEventHandlers(onMouseEnter, listItem.onMouseEnter)}
      onMouseLeave={composeEventHandlers(onMouseLeave, listItem.onMouseLeave)}
      data-active={listItem.isFocused}
      data-index={listItem.index}
    >
      {listItem.itemBackgroundElement}
      <div className={s.Icon}>
        <CheckIcon checked={value === selectedValue} />
      </div>
      <div className={s.Label}>{label}</div>
    </button>
  );
}
DropdownRadioItem.displayName = 'DropdownRadioItem';
