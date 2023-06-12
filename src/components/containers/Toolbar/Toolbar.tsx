import { createContext, memo, ReactNode, useContext, useRef, useState } from 'react';
import './toolbar.scss';
import ToolbarMenu, { ToolbarMenuProps } from './ToolbarMenu';
import clsx from 'clsx';
import { Elevation, Point, Surface } from '../../../types';
import { useDrag } from '../../../hooks/useDrag/useDrag';

const ToolbarContext = createContext<{
  element: HTMLDivElement | null;
  isCompact: boolean;
}>({ element: null, isCompact: false });
export const useToolbarContext = () => useContext(ToolbarContext);

const defaultOffset: Point = {
  x: 0,
  y: 0
};

export enum ToolbarVariant {
  default = 'default',
  compact = 'compact'
}

interface ToolbarProps {
  children: ReactNode | ReactNode[];
  variant?: ToolbarVariant;
  floated?: boolean;
  menu?: ToolbarMenuProps['menu'];
  offset?: Point;
  width?: number | string;
  className?: string;
  surface?: Surface;
  elevation?: Elevation;
}

const Toolbar = ({
  children,
  variant = ToolbarVariant.default,
  floated = false,
  menu = [],
  offset = defaultOffset,
  width,
  className,
  surface = Surface.glass,
  elevation = Elevation.floating
}: ToolbarProps) => {
  const [toolbarElement, setToolbarElement] = useState<HTMLDivElement | null>(null);

  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef(document.body);

  const { onMouseDown, offset: dragOffset } = useDrag({
    elementRef: toolbarRef,
    containerRef: bodyRef
  });

  return (
    <ToolbarContext.Provider
      value={{
        element: toolbarElement,
        isCompact: variant === ToolbarVariant.compact
      }}>
      <div
        className={clsx('alt-toolbar', className, {
          'alt-toolbar--floated': floated,
          'alt-toolbar--compact': variant === ToolbarVariant.compact,
          [`alt-toolbar--surface-${surface}`]: surface,
          [`alt-toolbar--elevation-${elevation}`]: elevation !== Elevation.floating
        })}
        ref={(node) => {
          toolbarRef.current = node;
          setToolbarElement(node);
        }}
        onMouseDown={onMouseDown}
        style={
          floated
            ? {
                top: offset.y + 'px',
                left: offset.x + 'px',
                width
              }
            : {
                top: dragOffset.x,
                left: dragOffset.y
              }
        }
        data-testid="alt-test-toolbar">
        {menu.length > 0 && <ToolbarMenu menu={menu} />}
        <div className="alt-toolbar__main">{children}</div>
      </div>
    </ToolbarContext.Provider>
  );
};

export default memo(Toolbar) as typeof Toolbar;
