import { DropdownActionProps } from '../Dropdown.types';
import { useListItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useCloseDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';
import { useId } from 'react';
import { usePopoverCurrentIndex } from '../../popover/Popover.tsx';

export function DropdownAction({
  icon,
  disabled,
  danger,
  hintText,
  label,
  onClick,
  className,
  focused,
  style,
  ...props
}: DropdownActionProps) {
  const id = useId();

  const currentIndex = usePopoverCurrentIndex();
  const { ref, index } = useListItem();

  const isFocused = currentIndex === index;

  console.log('>> label', label, isFocused);

  const { dropdownAction: dropdownActionConfiguration = {} } =
    useConfiguration();

  const cls = clsx(
    s.Action,
    {
      [s.DisabledAction]: disabled,
      [s.DangerAction]: danger,
      [s.Focused]: focused,
    },
    className,
    dropdownActionConfiguration.className,
  );

  const styles = {
    ...dropdownActionConfiguration.style,
    ...style,
  };

  const closePopup = useCloseDropdownContext();

  const onSelect = () => {
    console.log('>> onselect');
    onClick?.();
    closePopup();
  };

  const onKeyDownPress: React.KeyboardEventHandler = (e) => {
    console.log('>> on keydown press', e.key);
    if (e.key === 'Enter') {
      onSelect?.();
    }
  };

  return (
    <button
      disabled={disabled}
      className={cls}
      style={styles}
      role="button"
      ref={ref}
      data-active={isFocused}
      {...props}
      id={props.id || id}
      onClick={onSelect}
      onKeyDown={onKeyDownPress}
    >
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {hintText ? <div className={s.Hint}>{hintText}</div> : null}
    </button>
  );
}
DropdownAction.displayName = 'DropdownAction';
