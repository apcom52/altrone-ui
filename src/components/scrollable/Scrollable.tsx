import { memo, useImperativeHandle, useRef } from 'react';
import { ScrollableProps } from './Scrollable.types.ts';
import clsx from 'clsx';
import s from './scrollable.module.scss';
import 'overlayscrollbars/overlayscrollbars.css';
import 'components/scrollable/scrollable-theme.css';
import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef,
} from 'overlayscrollbars-react';

export const Scrollable = memo<ScrollableProps>(
  ({ children, className, style, ref, overflowX, overflowY, ...props }) => {
    const scrollableRef = useRef<OverlayScrollbarsComponentRef>(null);

    useImperativeHandle(ref, () => {
      const instance = scrollableRef.current?.osInstance() as HTMLDivElement;
      return instance?.elements().viewport ?? null;
    }, []);

    const cls = clsx(s.Scrollable, className);

    const styles = {
      ...style,
    };

    return (
      <div style={styles} className={s.ScrollableRoot} {...props}>
        <OverlayScrollbarsComponent
          defer
          className={cls}
          style={{ height: '100%' }}
          options={{
            scrollbars: {
              autoHide: 'move',
              autoHideDelay: 300,
            },
            ...(overflowX || overflowY
              ? {
                  overflow: {
                    ...(overflowX ? { x: overflowX } : {}),
                    ...(overflowY ? { y: overflowY } : {}),
                  },
                }
              : {}),
          }}
          ref={scrollableRef}
        >
          {children}
        </OverlayScrollbarsComponent>
      </div>
    );
  },
);
