import { createContext, memo, ReactNode, useContext, useRef, useState } from 'react';
import './toolbar.scss';
import ToolbarMenu, { ToolbarMenuProps } from './ToolbarMenu';
import clsx from 'clsx';
import { Elevation, Point, Surface } from '../../../types';
import { useDrag } from '../../../hooks/useDrag/useDrag';
import Draggable from 'react-draggable';

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
  defaultPosition?: Point;
}

/**
 * The component is used to place actions on the panel
 * @param children
 * @param variant
 * @param floated
 * @param menu
 * @param offset
 * @param width
 * @param className
 * @param surface
 * @param elevation
 * @param defaultPosition
 * @constructor
 */
const Toolbar = ({
  children,
  variant = ToolbarVariant.default,
  floated = false,
  menu = [],
  offset = defaultOffset,
  width,
  className,
  surface = Surface.glass,
  elevation = Elevation.floating,
  defaultPosition = { x: 0, y: 0 }
}: ToolbarProps) => {
  const [toolbarElement, setToolbarElement] = useState<HTMLDivElement | null>(null);

  const toolbarRef = useRef<HTMLDivElement | null>(null);

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
        style={
          variant === ToolbarVariant.compact
            ? {
                top: defaultPosition?.y,
                left: defaultPosition?.x
              }
            : undefined
        }
        data-testid="alt-test-toolbar">
        {variant !== ToolbarVariant.compact && menu.length > 0 && <ToolbarMenu menu={menu} />}
        <div className="alt-toolbar__main">{children}</div>
      </div>
    </ToolbarContext.Provider>
  );
};

export default Toolbar;
