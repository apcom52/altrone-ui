import { RefObject, useEffect, useRef, useState } from 'react';

export type DOMRectValues = Pick<
  DOMRectReadOnly,
  'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'
>;

const defaultReturn = {};

export const useResizeObserver = <T extends HTMLElement>(elementRef: RefObject<T>) => {
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [DOMRect, setDOMRect] = useState<DOMRectValues>();

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

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

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return DOMRect || (defaultReturn as DOMRectValues);
};
