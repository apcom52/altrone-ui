import { useMemo } from 'react';
import clsx from 'clsx';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import 'overlayscrollbars/overlayscrollbars.css';
import './scrollable-theme.css';
import { ScrollableProps } from './Scrollable.types.ts';
import s from './scrollable.module.scss';

/**
 * `ref` points at the wrapper element (the visible box), not the inner
 * OverlayScrollbars viewport — that's the node overlays anchor to, and the
 * viewport is an implementation detail of the scrollbar library.
 */
export const Scrollable = ({
  ref,
  children,
  className,
  style,
  maxHeight,
  overflowX,
  overflowY,
  ...restProps
}: ScrollableProps) => {
  const options = useMemo(
    () => ({
      scrollbars: { autoHide: 'move' as const, autoHideDelay: 300 },
      ...(overflowX || overflowY
        ? {
            overflow: {
              ...(overflowX ? { x: overflowX } : null),
              ...(overflowY ? { y: overflowY } : null),
            },
          }
        : null),
    }),
    [overflowX, overflowY],
  );

  return (
    <div
      ref={ref}
      className={clsx(s.Scrollable, className)}
      style={
        maxHeight != null ? { ...style, maxHeight, height: 'auto' } : style
      }
      {...restProps}
    >
      <OverlayScrollbarsComponent defer className={s.Os} options={options}>
        {children}
      </OverlayScrollbarsComponent>
    </div>
  );
};
