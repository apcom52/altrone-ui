import { ContextCheckboxAction, ContextRadioListAction } from '../../../types/ContextAction';
import React from 'react';
import { Icon } from '../../typography';
import { CheckboxIcon } from '../../form/Checkbox/CheckboxIcon';

export const ContextMenuRadioListAction = ({
  title,
  disabled,
  options = [],
  value,
  onChange
}: Omit<ContextRadioListAction, 'type'>) => {
  return (
    <>
      <hr className="alt-context-menu__separator" />
      <div className="alt-context-menu__groupName">{title}</div>
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
      <hr className="alt-context-menu__separator" />
    </>
  );
};
