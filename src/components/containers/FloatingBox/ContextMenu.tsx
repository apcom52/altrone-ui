import {ContextAction, ParentContextAction} from "../../../types";
import './context-menu.scss'
import {Icon} from "../../icons";
import {FC} from "react";

const ContextMenuItem = (action: ContextAction) => {
  const isParentAction = 'children' in action

  return <button className='alt-context-menu-item'>
    <div className='alt-context-menu-item__icon'>{action.icon}</div>
    <div className='alt-context-menu-item__title'>{action.title}</div>
    {isParentAction && <div className='alt-context-menu-item__childrenArrow'><Icon i='keyboard_arrow_right' /></div>}
    {!isParentAction && action.hint && <div className='alt-context-menu-item__hint'>{action.hint}</div>}
  </button>
}

const ContextMenuComponent: FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return <div className='alt-context-menu-list'>
    {children}
  </div>
}

export default {
  Menu: ContextMenuComponent,
  MenuItem: ContextMenuItem
}