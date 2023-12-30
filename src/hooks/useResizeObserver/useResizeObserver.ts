import { RefObject, useEffect, useRef, useState } from 'react';

export type DOMRectValues = Pick<
  DOMRectReadOnly,
  'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'
>;

const defaultReturn = {};

export const useResizeObserver = (elementRef: RefObject<HTMLElement>) => {
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [DOMRect, setDOMRect] = useState<DOMRectValues>();

  useEffect(() => {
    observerRef.current = new ResizeObserver((entries) => {
      const { bottom, height, left, right, top, width } = entries[0].contentRect;
      elementRef.current?.classList.add('alt-service--resizing');

      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      resizeTimeout.current = setTimeout(() => {
        elementRef.current?.classList.remove('alt-service--resizing');
        resizeTimeout.current = null;
      }, 100);

      setDOMRect({ bottom, height, left, right, top, width });
    });

    return () => {
      if (observerRef.current?.disconnect) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      observerRef.current?.observe(elementRef.current);
    }
  }, [elementRef.current]);

  return DOMRect || (defaultReturn as DOMRectValues);
};
