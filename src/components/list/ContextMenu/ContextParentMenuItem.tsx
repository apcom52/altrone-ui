import {ParentContextAction} from "../../../types";
import {memo, useRef, useState} from "react";
import {Icon} from "../../icons";
import {createPortal} from "react-dom";
import {FloatingBox} from "../../containers";
import {ContextMenu} from "./index";

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
      <ContextMenu menu={action.children} />
    </FloatingBox>, altroneRef.current)}
  </>
}

export default memo(ContextParentMenuItem)