import { ContextAction } from '../../../types';
import { memo } from 'react';
import clsx from 'clsx';

interface ContextMenuItemProps extends ContextAction {
  selected?: boolean;
}

const ContextMenuItem = ({ selected = false, ...action }: ContextMenuItemProps) => {
  return (
    <button
      className={clsx('alt-context-menu-item', {
        'alt-context-menu-item--danger': action.danger,
        'alt-context-menu-item--selected': selected
      })}
      onClick={action.onClick}
      disabled={action.disabled}
      title={action.title}
      type="button">
      <div className="alt-context-menu-item__icon">{action.icon}</div>
      <div className="alt-context-menu-item__title">{action.title}</div>
      {action.hint && <div className="alt-context-menu-item__hint">{action.hint}</div>}
    </button>
  );
};

export default memo(ContextMenuItem);
