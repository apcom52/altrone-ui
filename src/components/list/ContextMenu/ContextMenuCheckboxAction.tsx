import { ContextCheckboxAction } from '../../../types/ContextAction';
import React from 'react';
import { Icon } from '../../typography';

export const ContextMenuCheckboxAction = ({
  title,
  hint,
  disabled,
  checked,
  onChange
}: Omit<ContextCheckboxAction, 'type'>) => {
  return (
    <button
      className={'alt-context-menu-item'}
      onClick={() => onChange(!checked)}
      disabled={disabled}
      title={title}
      type="button">
      <div className="alt-context-menu-item__icon">{checked ? <Icon i="check" /> : null}</div>
      <div className="alt-context-menu-item__title">{title}</div>
      {hint ? <div className="alt-context-menu-item__hint">{hint}</div> : null}
    </button>
  );
};
