import {ContextAction} from "../../../types";
import {memo} from "react";
import clsx from "clsx";

const ContextMenuItem = (action: ContextAction) => {
  return <button
    className={clsx('alt-context-menu-item', {
      'alt-context-menu-item--danger': action.danger,
    })}
    onClick={action.onClick}
    disabled={action.disabled}
    title={action.title}
  >
    <div className='alt-context-menu-item__icon'>{action.icon}</div>
    <div className='alt-context-menu-item__title'>{action.title}</div>
    {action.hint && <div className='alt-context-menu-item__hint'>{action.hint}</div>}
  </button>
}

export default memo(ContextMenuItem)