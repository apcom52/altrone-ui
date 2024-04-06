import { memo, useEffect, useRef, useState } from 'react';
import { ScrollableProps } from './Scrollable.types.ts';
import clsx from 'clsx';
import { useConfiguration } from '../configuration/AltroneConfiguration.context.ts';
import s from './scrollable.module.scss';
import { Direction } from 'types';
import { useResizeObserver } from 'utils';

export const Scrollable = memo<ScrollableProps>(
  ({
    children,
    className,
    style,
    direction = Direction.vertical,
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
        direction === Direction.vertical &&
        targetElement.scrollHeight <= Math.round(targetElementRect.height)
      ) {
        setScrollPosition(-1);
      } else if (
        targetElement &&
        targetElementRect &&
        direction === Direction.horizontal &&
        targetElement.scrollWidth <= Math.round(targetElementRect.width)
      ) {
        setScrollPosition(-1);
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
        [s.Horizontal]: direction === Direction.horizontal,
      },
      className,
      scrollableConfig.className,
    );

    const onScrollChange: React.UIEventHandler<HTMLDivElement> = (e) => {
      onScroll?.(e);

      const targetElement = e.currentTarget;
      const targetElementRect = targetElement.getBoundingClientRect();

      if (direction === Direction.vertical) {
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
          : `${offset.top}px ${offset.right}px ${offset.bottom}px ${offset.left}px`,
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
              height: direction === Direction.vertical ? topShadow : undefined,
              width: direction === Direction.horizontal ? topShadow : undefined,
            }}
          />
        ) : null}
        {shadowsVisible ? (
          <div
            className={clsx(s.Shadow, s.EndShadow)}
            style={{
              height:
                direction === Direction.vertical ? bottomShadow : undefined,
              width:
                direction === Direction.horizontal ? bottomShadow : undefined,
            }}
          />
        ) : null}
      </div>
    );
  },
);
