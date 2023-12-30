import clsx from 'clsx';
import { ContextClickAction } from '../../../types/ContextAction';

export const ContextMenuAction = ({
  title,
  icon,
  hint,
  disabled,
  onClick,
  danger,
  selected
}: Omit<ContextClickAction, 'type'>) => {
  return (
    <button
      className={clsx('alt-context-menu-item', {
        'alt-context-menu-item--danger': danger,
        'alt-context-menu-item--selected': selected
      })}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button">
      <div className="alt-context-menu-item__icon">{icon}</div>
      <div className="alt-context-menu-item__title">{title}</div>
      {hint ? <div className="alt-context-menu-item__hint">{hint}</div> : null}
    </button>
  );
};
