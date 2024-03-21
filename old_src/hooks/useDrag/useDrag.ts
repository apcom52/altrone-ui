import { RefObject, useCallback, useState } from 'react';
import { Point, Rect } from '../../types';

interface UseDragProps {
  elementRef: RefObject<HTMLElement>;
  containerRef?: RefObject<HTMLElement>;
  boundariesRect?: Rect;
  defaultOffset?: Rect;
}

const getValue = (field: 'top' | 'left' | 'right' | 'bottom', rect: Rect) => {
  if (typeof rect === 'number') return rect;

  return rect[field] || 0;
};

export const useDrag = ({ elementRef, containerRef, boundariesRect }: UseDragProps) => {
  const [offset, setOffset] = useState<Point>({
    x: getValue('left', boundariesRect || 0),
    y: getValue('top', boundariesRect || 0)
  });

  const [wasDragged, setWasDragged] = useState(false);

  const onMouseDown = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    setTimeout(() => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }, 50);
  }, []);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) {
        return;
      }

      setWasDragged(true);

      elementRef.current.setAttribute('data-dragging', 'true');

      setOffset((old) => {
        let x = old.x + e.movementX;
        let y = old.y + e.movementY;

        if (
          boundariesRect !== undefined &&
          elementRef.current &&
          containerRef &&
          containerRef.current
        ) {
          const elementRect = elementRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();

          const { width: elementWidth, height: elementHeight } = elementRect;
          const { width: containerWidth, height: containerHeight } = containerRect;

          const minLeft = getValue('left', boundariesRect);
          const maxRight = containerWidth - getValue('right', boundariesRect) - elementWidth;
          const minTop = getValue('top', boundariesRect);
          const maxBottom = containerHeight - getValue('bottom', boundariesRect) - elementHeight;

          if (x < minLeft) {
            x = minLeft;
          }

          if (x > maxRight) {
            x = maxRight;
          }

          if (y < minTop) {
            y = minTop;
          }

          if (y > maxBottom) {
            y = maxBottom;
          }
        }

        return { x, y };
      });
    },
    [boundariesRect]
  );

  const onMouseUp = useCallback(() => {
    if (!elementRef.current) {
      return;
    }

    elementRef.current.removeAttribute('data-dragging');

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, []);

  const setOffsets = useCallback(
    (x: number, y: number) => {
      setOffset({ x, y });
    },
    [boundariesRect]
  );

  return {
    onMouseDown,
    offset,
    wasDragged,
    setOffsets
  };
};
