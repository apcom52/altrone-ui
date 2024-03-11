import { memo, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Align, ContextMenuType } from '../../../types';
import { useResizeObserver } from '../../../hooks';
import { ToolbarAction } from './components/ToolbarAction';
import { Icon } from '../../typography';
import { useToolbarContext } from './Toolbar';
import { ContextMenu } from '../../list/ContextMenu';
import { FloatingBox } from '../index';

interface ToolbarGroupProps extends React.PropsWithChildren {
  align?: Align;
  fluid?: boolean;
  collapsible?: boolean;
}

const ToolbarGroup = ({
  children,
  fluid = false,
  align = Align.center,
  collapsible = false
}: ToolbarGroupProps) => {
  const [context, setContext] = useState<ContextMenuType>([]);
  const [isContextVisible, setIsContextVisible] = useState(false);

  const { element: toolbarRef, isCompact } = useToolbarContext();

  const groupRef = useRef<HTMLDivElement>(null);
  const preventRerender = useRef(false);
  const invisibleExpandButton = useRef<HTMLButtonElement>(null);
  const expandButton = useRef(null);

  const isCollapsible =
    Array.isArray(children) &&
    children.find((childrenItem) => {
      if (typeof childrenItem === 'object') {
        return childrenItem?.props.contextMenu || childrenItem?.props?.content;
      }
    })
      ? false
      : collapsible;

  const { width } = useResizeObserver(isCollapsible ? { current: toolbarRef } : { current: null });

  const onCloseMenu = () => {
    setIsContextVisible(false);
  };

  useLayoutEffect(() => {
    if (!width || !groupRef.current || collapsible === false || !invisibleExpandButton.current) {
      return;
    }

    const { width: groupWidth } = groupRef.current.getBoundingClientRect();

    const buttons = groupRef.current.querySelectorAll(
      '.alt-toolbar-group--invisible .alt-toolbar-action'
    );
    let { width: visibleButtonSize } = invisibleExpandButton.current.getBoundingClientRect();
    let buttonIndex = 0;

    while (visibleButtonSize <= groupWidth && buttonIndex < buttons.length) {
      const { width: buttonWidth } = buttons[buttonIndex].getBoundingClientRect();

      if (visibleButtonSize + buttonWidth <= groupWidth) {
        buttonIndex++;
      }

      visibleButtonSize += buttonWidth;
    }

    const _context = [];

    while (buttonIndex <= buttons.length - 1) {
      if (!children) {
        return;
      }

      const childElement = (children as JSX.Element[])[buttonIndex];

      _context.push({
        icon: childElement.props.icon,
        title: childElement.props.label,
        onClick: childElement.props.onClick,
        danger: childElement.props.danger
      });
      buttonIndex++;
    }

    preventRerender.current = true;
    setContext(_context);
  }, [width, isCollapsible]);

  return (
    <div
      className={clsx('alt-toolbar-group', {
        'alt-toolbar-group--fluid': fluid,
        'alt-toolbar-group--align-start': align === Align.start,
        'alt-toolbar-group--align-end': align === Align.end,
        'alt-toolbar-group--collapsible': isCollapsible,
        'alt-toolbar-group--compact': isCompact
      })}
      data-testid="alt-test-toolbarGroup"
      ref={groupRef}>
      {!isCollapsible
        ? children
        : Array.isArray(children)
        ? children.slice(0, children.length - context.length)
        : children}
      {context.length > 0 && (
        <ToolbarAction
          icon={<Icon i="expand_more" />}
          label="More..."
          className="alt-toolbar-action--expand"
          ref={expandButton}
          onClick={() => setIsContextVisible(true)}
        />
      )}
      {isCollapsible && (
        <ToolbarAction
          icon={<Icon i="expand_more" />}
          label="More..."
          className="alt-toolbar-action--expand alt-toolbar-action--expand-invisible"
          ref={invisibleExpandButton}
          onClick={() => null}
        />
      )}
      {isCollapsible && <div className="alt-toolbar-group--invisible">{children}</div>}
      {isContextVisible && context.length > 0 && (
        <FloatingBox
          placement="bottom"
          targetElement={expandButton.current}
          useRootContainer
          onClose={onCloseMenu}>
          <ContextMenu onClose={() => null} menu={context} />
        </FloatingBox>
      )}
    </div>
  );
};

export default memo(ToolbarGroup) as typeof ToolbarGroup;
