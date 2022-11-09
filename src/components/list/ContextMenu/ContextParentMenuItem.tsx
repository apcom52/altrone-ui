import {ParentContextAction} from "../../../types";
import {memo, useRef, useState} from "react";
import {Icon} from "../../icons";
import {createPortal} from "react-dom";
import {FloatingBox} from "../../containers";
import {ContextMenu} from "./index";
import clsx from "clsx";

const ContextParentMenuItem = (action: ParentContextAction) => {
  const [isChildrenContextMenuVisible, setIsChildrenContextMenuVisible] = useState(false)
  const itemRef = useRef<HTMLButtonElement>(null)

  const altroneRef = useRef(document.body.querySelector('.altrone'))

  return <>
    <button
      className={clsx('alt-context-menu-item', {
        'alt-context-menu-item--parent-selected': isChildrenContextMenuVisible
      })}
      ref={itemRef}
      onClick={() => setIsChildrenContextMenuVisible(true)}
      type='button'
    >
      <div className='alt-context-menu-item__icon'>{action.icon}</div>
      <div className='alt-context-menu-item__title'>{action.title}</div>
      <div className='alt-context-menu-item__childrenArrow'><Icon i='keyboard_arrow_right' /></div>
    </button>
    {isChildrenContextMenuVisible && createPortal(<FloatingBox targetRef={itemRef.current} placement='right' onClose={() => setIsChildrenContextMenuVisible(false)} offset={8}>
      <ContextMenu menu={action.children} />
    </FloatingBox>, altroneRef.current)}
  </>
}

export default memo(ContextParentMenuItem)