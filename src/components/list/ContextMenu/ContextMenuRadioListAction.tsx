import { ContextRadioListAction } from '../../../types/ContextAction';
import React from 'react';
import { CheckboxIcon } from '../../form/Checkbox/CheckboxIcon';
import { useContextMenuTotalPages } from './ContextMenu.context';

export const ContextMenuRadioListAction = ({
  title,
  disabled,
  options = [],
  value,
  onChange,
  index = 0
}: Omit<ContextRadioListAction, 'type'> & { index: number }) => {
  const totalActions = useContextMenuTotalPages();

  return (
    <>
      {index !== 0 && <hr className="alt-context-menu__separator" />}
      {title ? <div className="alt-context-menu__groupName">{title}</div> : null}
      {options.map((item, itemIndex) => (
        <button
          key={itemIndex}
          className={'alt-context-menu-item'}
          onClick={() => onChange(item.value)}
          disabled={disabled || item.disabled}
          title={item.label}
          type="button">
          <div className="alt-context-menu-item__icon">
            <CheckboxIcon
              checked={item.value === value}
              width={24}
              height={12}
              className="alt-context-menu-item__check-icon"
            />
          </div>
          <div className="alt-context-menu-item__title">{item.label}</div>
        </button>
      ))}
      {index !== totalActions - 1 && <hr className="alt-context-menu__separator" />}
    </>
  );
};
