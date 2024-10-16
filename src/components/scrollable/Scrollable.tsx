import { memo, useEffect, useRef, useState } from 'react';
import { ScrollableProps } from './Scrollable.types.ts';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';
import s from './scrollable.module.scss';
import { useResizeObserver } from 'utils';

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
    ...props
  }) => {
    const scrollAreaRef = useRef<HTMLDivElement | null>(null);

    const [scrollPosition, setScrollPosition] = useState(0);

    const { scrollable: scrollableConfig = {} } = useConfiguration();

    const { width: scrollAreaWidth, height: scrollAreaHeight } =
      useResizeObserver(scrollAreaRef);

    useEffect(() => {
      const targetElement = scrollAreaRef.current;
      const targetElementRect = targetElement?.getBoundingClientRect();

      if (
        targetElement &&
        targetElementRect &&
        direction === 'vertical' &&
        targetElement.scrollHeight <= Math.round(targetElementRect.height)
      ) {
        setScrollPosition(-1);
      } else if (
        targetElement &&
        targetElementRect &&
        direction === 'horizontal' &&
        targetElement.scrollWidth <= Math.round(targetElementRect.width)
      ) {
        setScrollPosition(-1);
      } else if (scrollPosition === -1) {
        setScrollPosition(0);
      }
    }, [
      children,
      maxWidth,
      maxHeight,
      direction,
      offset,
      style,
      className,
      scrollAreaWidth,
      scrollAreaHeight,
    ]);

    const cls = clsx(
      s.Scrollable,
      {
        [s.Horizontal]: direction === 'horizontal',
      },
      className,
      scrollableConfig.className,
    );

    const onScrollChange: React.UIEventHandler<HTMLDivElement> = (e) => {
      onScroll?.(e);

      const targetElement = e.currentTarget;
      const targetElementRect = targetElement.getBoundingClientRect();

      if (direction === 'vertical') {
        if (targetElement.scrollHeight <= targetElementRect.height) {
          setScrollPosition(-1);
          return;
        }

        const currentScrollPosition = targetElement.scrollTop;

        setScrollPosition(
          Math.round(
            (currentScrollPosition /
              (targetElement.scrollHeight - targetElementRect.height)) *
              100,
          ),
        );
      } else {
        const currentScrollPosition = targetElement.scrollLeft;

        setScrollPosition(
          Math.round(
            (currentScrollPosition /
              (targetElement.scrollWidth - targetElementRect.width)) *
              100,
          ),
        );
      }
    };

    const styles = {
      ...scrollableConfig.style,
      ...style,
      maxHeight,
      maxWidth,
    };

    const contentStyles = {
      maxHeight,
      maxWidth,
      padding:
        typeof offset === 'number'
          ? `${offset}px`
          : `${offset.top || 0}px ${offset.right || 0}px ${offset.bottom || 0}px ${offset.left || 0}px`,
    };

    const topShadow = scrollPosition > 8 ? '5px' : `${scrollPosition / 2}px`;
    const bottomShadow =
      scrollPosition < 92 ? '5px' : `${(100 - scrollPosition) / 2}px`;

    const shadowsVisible = scrollPosition !== -1 && showShadows;

    return (
      <div className={cls} style={styles} {...props}>
        <div
          className={s.Content}
          style={contentStyles}
          onScroll={onScrollChange}
          ref={scrollAreaRef}
        >
          {children}
        </div>
        {shadowsVisible ? (
          <div
            className={s.Shadow}
            style={{
              height: direction === 'vertical' ? topShadow : undefined,
              width: direction === 'horizontal' ? topShadow : undefined,
            }}
          />
        ) : null}
        {shadowsVisible ? (
          <div
            className={clsx(s.Shadow, s.EndShadow)}
            style={{
              height: direction === 'vertical' ? bottomShadow : undefined,
              width: direction === 'horizontal' ? bottomShadow : undefined,
            }}
          />
        ) : null}
      </div>
    );
  },
);
