import {memo, useRef, useState} from "react";
import {ContextMenuType as ContextMenuType} from "../../../types";
import clsx from "clsx";
import './toolbar-menu.scss';
import {FloatingBox} from "../../containers";
import {ContextMenu} from "../ContextMenu";

export interface ToolbarMenuProps {
  menu: {
    label: string
    submenu?: ContextMenuType
  }[]
}

const ToolbarMenu = ({ menu = [] }: ToolbarMenuProps) => {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(-1)
  const [currentMenuItemNode, setCurrentMenuItemNode] = useState(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const onMenuItemClick = (index = 0) => {
    setCurrentMenuItemNode(menuRef.current.children[index])
    setCurrentMenuIndex(index)
  }

  const onCloseSubmenu = () => {
    setCurrentMenuItemNode(null)
    setCurrentMenuIndex(-1)
  }

  return <div className='alt-toolbar-menu' ref={menuRef}>
    {menu.map((item, itemIndex) => {
      return <button
        className={clsx('alt-toolbar-menu__item', {
          'alt-toolbar-menu__item--active': itemIndex === currentMenuIndex
        })}
        onClick={() => onMenuItemClick(itemIndex)}
      >
        {item.label}
      </button>
    })}
    {currentMenuIndex > -1 && <FloatingBox
      targetRef={currentMenuItemNode}
      placement='bottom'
      onClose={onCloseSubmenu}
      useParentRef
      preventClose={e => {
        return e.target?.closest('.alt-toolbar-menu') === menuRef.current
      }}
    >
      <ContextMenu onClose={onCloseSubmenu} menu={menu[currentMenuIndex].submenu || []} />
    </FloatingBox>}
  </div>
}

export default memo(ToolbarMenu)