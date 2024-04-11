import { DropdownActionProps } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import { useCloseDropdownContext } from '../Dropdown.contexts.ts';
import s from './action.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export function DropdownAction({
  icon,
  disabled,
  danger,
  hintText,
  label,
  onClick,
  className,
  style,
  ...props
}: DropdownActionProps) {
  const { dropdownAction: dropdownActionConfiguration = {} } =
    useConfiguration();

  const cls = clsx(
    s.Action,
    {
      [s.DisabledAction]: disabled,
      [s.DangerAction]: danger,
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
    closePopup();
    onClick?.();
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
      className={cls}
      style={styles}
      role="button"
      {...props}
    >
      <div className={s.Icon}>{icon}</div>
      <div className={s.Label}>{label}</div>
      {hintText ? <div className={s.Hint}>{hintText}</div> : null}
    </CompositeItem>
  );
}
DropdownAction.displayName = 'DropdownAction';
