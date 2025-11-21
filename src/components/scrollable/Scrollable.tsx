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

    const cls = clsx(
      s.Scrollable,
      {
        [s.Horizontal]: direction === 'horizontal',
      },
      className,
      scrollableConfig.className
    );

    //   const targetElement = e.currentTarget;
    //   const targetElementRect = targetElement.getBoundingClientRect();

    //   if (direction === 'vertical') {
    //     if (targetElement.scrollHeight <= targetElementRect.height) {
    //       setScrollPosition(-1);
    //       return;
    //     }

    //     const currentScrollPosition = targetElement.scrollTop;

    //     setScrollPosition(
    //       Math.round(
    //         (currentScrollPosition /
    //           (targetElement.scrollHeight - targetElementRect.height)) *
    //           100
    //       )
    //     );
    //   } else {
    //     const currentScrollPosition = targetElement.scrollLeft;

    //     setScrollPosition(
    //       Math.round(
    //         (currentScrollPosition /
    //           (targetElement.scrollWidth - targetElementRect.width)) *
    //           100
    //       )
    //     );
    //   }
    // };

    const styles = {
      ...scrollableConfig.style,
      ...style,
      maxHeight,
      maxWidth,
    };

    return (
      <div style={styles} {...props}>
        <OverlayScrollbarsComponent
          defer
          style={{
            maxHeight,
            maxWidth,
          }}
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
