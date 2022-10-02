import {ContextAction, ParentContextAction} from "../../../types";
import './context-menu.scss'
import {Icon} from "../../icons";
import {FC, useRef, useState} from "react";
import { createPortal } from 'react-dom'
import {ContextMenu, FloatingBox} from "./index";

const ContextMenuItem = (action: ContextAction) => {
  return <button className='alt-context-menu-item' onClick={action.onClick}>
    <div className='alt-context-menu-item__icon'>{action.icon}</div>
    <div className='alt-context-menu-item__title'>{action.title}</div>
    {action.hint && <div className='alt-context-menu-item__hint'>{action.hint}</div>}
  </button>
}

const ContextParentMenuItem = (action: ParentContextAction) => {
  const [isChildrenContextMenuVisible, setIsChildrenContextMenuVisible] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  const altroneRef = useRef(document.body.querySelector('.altrone'))

  return <>
    <div className='alt-context-menu-item' ref={itemRef} onClick={() => setIsChildrenContextMenuVisible(true)}>
      <div className='alt-context-menu-item__icon'>{action.icon}</div>
      <div className='alt-context-menu-item__title'>{action.title}</div>
      <div className='alt-context-menu-item__childrenArrow'><Icon i='keyboard_arrow_right' /></div>
    </div>
    {isChildrenContextMenuVisible && createPortal(<FloatingBox targetRef={itemRef.current} placement='right' onClose={() => setIsChildrenContextMenuVisible(false)} offset={8}>
      <ContextMenuComponent>
        {action.children.map((item, itemIndex) => (
          <ContextMenuItem key={itemIndex} {...item} />
        ))}
      </ContextMenuComponent>
    </FloatingBox>, altroneRef.current)}
  </>
}

const ContextMenuComponent: FC<React.HTMLProps<HTMLDivElement>> = ({ children }) => {
  return <div className='alt-context-menu-list'>
    {children}
  </div>
}

export default {
  Menu: ContextMenuComponent,
  MenuItem: ContextMenuItem,
  ParentMenuItem: ContextParentMenuItem
}