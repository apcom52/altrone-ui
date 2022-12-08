import {memo, ReactNode, useLayoutEffect, useRef, useState} from "react";
import clsx from "clsx";
import {Align} from "../../../types/Align";
import {useResizeObserver} from "../../../hooks";
import ToolbarAction from "./ToolbarAction";
import {Icon} from "../../icons";
import {useToolbarContext} from "./Toolbar";
import {ContextMenu} from "../ContextMenu";
import {FloatingBox} from "../../containers";

interface ToolbarGroupProps {
  align?: Align
  fluid?: boolean
  collapsible?: boolean
  children?: ReactNode | ReactNode[]
}

const ToolbarGroup = ({ children, fluid = false, align = Align.center, collapsible = false }: ToolbarGroupProps) => {
  const [context, setContext] = useState([])
  const [isContextVisible, setIsContextVisible] = useState(false)

  const toolbarRef = useToolbarContext()

  const groupRef = useRef(null)
  const preventRerender = useRef(false)
  const invisibleExpandButton = useRef(null)
  const expandButton = useRef(null)
  const { width } = useResizeObserver(collapsible ? { current: toolbarRef } : { current: null })

  const onCloseMenu = () => {
    setIsContextVisible(false)
  }

  useLayoutEffect(() => {
    if (!width || !groupRef.current || collapsible === false || !invisibleExpandButton.current) {
      return
    }

    const { width: groupWidth } = groupRef.current.getBoundingClientRect()

    const buttons = groupRef.current.querySelectorAll('.alt-toolbar-group--invisible .alt-toolbar-action')
    let { width: visibleButtonSize } = invisibleExpandButton.current.getBoundingClientRect()
    let buttonIndex = 0

    while (visibleButtonSize <= groupWidth && buttonIndex < buttons.length) {
      const { width: buttonWidth } = buttons[buttonIndex].getBoundingClientRect()

      if (visibleButtonSize + buttonWidth <= groupWidth) {
        buttonIndex++
      }

      visibleButtonSize += buttonWidth
    }

    const _context = []

    while (buttonIndex <= buttons.length - 1) {
      _context.push({
        icon: children[buttonIndex].props.icon,
        title: children[buttonIndex].props.label,
        onClick: children[buttonIndex].props.onClick,
        danger: children[buttonIndex].props.danger
      })
      buttonIndex++
    }

    preventRerender.current = true
    setContext(_context)
  }, [width, collapsible])

  return <div className={clsx('alt-toolbar-group', {
    'alt-toolbar-group--fluid': fluid,
    'alt-toolbar-group--align-start': align === Align.start,
    'alt-toolbar-group--align-end': align === Align.end,
    'alt-toolbar-group--collapsible': collapsible
  })}
    data-testid='alt-test-toolbarGroup'
    ref={groupRef}
  >
    {!collapsible ? children : Array.isArray(children) ?
      children.slice(0, children.length - context.length)
    : children}
    {context.length > 0 && <ToolbarAction
      icon={<Icon i='expand_more' />}
      label='More...'
      className='alt-toolbar-action--expand'
      ref={expandButton}
      onClick={() => setIsContextVisible(true)}
    />}
    {collapsible && <ToolbarAction
      icon={<Icon i='expand_more' />}
      label='More...'
      className='alt-toolbar-action--expand alt-toolbar-action--expand-invisible'
      ref={invisibleExpandButton}
      onClick={() => null}
    />}
    {collapsible && <div className='alt-toolbar-group--invisible'>
      {children}
    </div>}
    {isContextVisible && context.length > 0 && <FloatingBox
      placement='bottom'
      targetElement={expandButton.current}
      useRootContainer
      onClose={onCloseMenu}
    >
      <ContextMenu onClose={onCloseMenu} menu={context} />
    </FloatingBox>}
  </div>
}

export default memo(ToolbarGroup)