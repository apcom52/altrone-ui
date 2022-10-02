import {ContextMenu as ContextMenuType} from "../../../types";
import {memo} from "react";
import {ContextMenuItem, ContextParentMenuItem} from "./index";
import './context-menu.scss'

interface ContextMenuComponentProps {
  menu: ContextMenuType
}

const ContextMenu = ({ menu }: ContextMenuComponentProps) => {
  return <div className='alt-context-menu-list'>
    {menu.map((item, itemIndex) => (
      'onClick' in item ? <ContextMenuItem key={itemIndex} {...item} /> : <ContextParentMenuItem key={itemIndex} {...item} />
    ))}
  </div>
}

export default memo(ContextMenu)