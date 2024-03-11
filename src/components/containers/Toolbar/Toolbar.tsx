import { createContext, useContext, useRef, useState } from 'react';
import './toolbar.scss';
import ToolbarMenu from './ToolbarMenu';
import clsx from 'clsx';
import { Elevation, Point, Surface } from '../../../types';
import { ToolbarProps, ToolbarVariant } from './Toolbar.types';
import { ToolbarAction } from './components';
import { ToolbarGroup } from './index';

const ToolbarContext = createContext<{
  element: HTMLDivElement | null;
  isCompact: boolean;
}>({ element: null, isCompact: false });
export const useToolbarContext = () => useContext(ToolbarContext);

const defaultOffset: Point = {
  x: 0,
  y: 0
};

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
const ToolbarComponent = ({
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
        style={{
          ...(variant === ToolbarVariant.compact
            ? {
                top: defaultPosition?.y,
                left: defaultPosition?.x
              }
            : undefined),
          ...(typeof width !== 'undefined'
            ? {
                width
              }
            : undefined),
          ...(offset
            ? {
                left: offset.x,
                top: offset.y
              }
            : undefined)
        }}
        data-testid="alt-test-toolbar">
        {variant !== ToolbarVariant.compact && menu.length > 0 && <ToolbarMenu menu={menu} />}
        <div className="alt-toolbar__main">{children}</div>
      </div>
    </ToolbarContext.Provider>
  );
};

const ToolbarNamespace = Object.assign(ToolbarComponent, {
  Action: ToolbarAction,
  Group: ToolbarGroup
});

export { ToolbarNamespace as Toolbar };
