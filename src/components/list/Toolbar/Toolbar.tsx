import { createContext, memo, ReactNode, useContext, useState } from 'react';
import './toolbar.scss';
import ToolbarMenu, { ToolbarMenuProps } from './ToolbarMenu';
import clsx from 'clsx';
import { Point, Surface } from '../../../types';

const ToolbarContext = createContext<HTMLDivElement>(null);
export const useToolbarContext = () => useContext(ToolbarContext);

const defaultOffset: Point = {
  x: 0,
  y: 0
};

interface ToolbarProps {
  children: ReactNode | ReactNode[];
  floated?: boolean;
  menu?: ToolbarMenuProps['menu'];
  offset?: Point;
  width?: number | string;
  className?: string;
  surface?: Surface;
}

const Toolbar = ({
  children,
  floated = false,
  menu = [],
  offset = defaultOffset,
  width,
  className,
  surface = Surface.glass
}: ToolbarProps) => {
  const [toolbarRef, setToolbarRef] = useState(null);

  return (
    <ToolbarContext.Provider value={toolbarRef}>
      <div
        className={clsx('alt-toolbar', className, {
          'alt-toolbar--floated': floated,
          [`alt-toolbar--surface-${surface}`]: surface
        })}
        ref={(node) => setToolbarRef(node)}
        style={
          floated
            ? {
                top: offset.y + 'px',
                left: offset.x + 'px',
                width
              }
            : {}
        }
        data-testid="alt-test-toolbar">
        {menu.length > 0 && <ToolbarMenu menu={menu} />}
        <div className="alt-toolbar__main">{children}</div>
      </div>
    </ToolbarContext.Provider>
  );
};

export default memo(Toolbar) as typeof Toolbar;
