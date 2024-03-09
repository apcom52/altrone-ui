import { DropdownActionProps, useCloseDropdownContext } from '../Dropdown.types';
import { CompositeItem } from '@floating-ui/react';
import clsx from 'clsx';
import './action.scss';

export const DropdownAction = ({
  icon,
  disabled,
  danger,
  hintText,
  focused,
  label,
  onClick
}: DropdownActionProps) => {
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
      className={clsx('alt-dropdown-item', {
        'alt-dropdown-item--focused': focused,
        'alt-dropdown-item--danger': danger,
        'alt-dropdown-item--disabled': disabled
      })}>
      {icon && <div className="alt-dropdown-item__icon">{icon}</div>}
      <div className="alt-dropdown-item__title">{label}</div>
      {hintText && <div className="alt-dropdown-item__hint">{hintText}</div>}
    </CompositeItem>
  );
};
