import { memo, useImperativeHandle, useRef } from 'react';
import { ScrollableProps } from './Scrollable.types.ts';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import s from './scrollable.module.scss';
import 'overlayscrollbars/overlayscrollbars.css';
import 'components/scrollable/scrollable-theme.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

export const Scrollable = memo<ScrollableProps>(
  ({
    children,
    className,
    style,
    direction = 'vertical',
    offset = 0,
    maxWidth,
    maxHeight,
    showShadows = true,
    onScroll,
    ref,
    ...props
  }) => {
    const scrollableRef = useRef(null);

    useImperativeHandle(ref, () => {
      const instance = scrollableRef.current?.osInstance() as HTMLDivElement;
      return instance?.elements().viewport ?? null;
    });

    const { scrollable: scrollableConfig = {} } = useConfiguration();

    const cls = clsx(s.Scrollable, className, scrollableConfig.className);

    const styles = {
      ...scrollableConfig.style,
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
              theme: 'os-theme-dark',
              autoHide: 'move',
              autoHideDelay: 300,
            },
          }}
          ref={scrollableRef}
        >
          {children}
        </OverlayScrollbarsComponent>
      </div>
    );
  }
);
