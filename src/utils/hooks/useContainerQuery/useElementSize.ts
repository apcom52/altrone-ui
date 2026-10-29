import { RefObject, useEffect, useState } from 'react';

export type ElementSize = {
  width: number;
  height: number;
};

const INITIAL_SIZE: ElementSize = { width: 0, height: 0 };

/**
 * Tracks an element's content-box size via ResizeObserver. SSR-safe: the
 * initial render always reports { width: 0, height: 0 } on both server
 * and client (there's nothing to measure before mount), so hydration
 * never mismatches — the real size arrives one effect tick later, same
 * as useMediaMatch's false-until-mounted default.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const { width } = useElementSize(ref);
 */
export function useElementSize<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
): ElementSize {
  const [size, setSize] = useState<ElementSize>(INITIAL_SIZE);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef]);

  return size;
}
