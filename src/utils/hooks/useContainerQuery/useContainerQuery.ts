import { RefObject } from 'react';
import { useElementSize } from './useElementSize';

/**
 * Container-level breakpoint match, driven by an element's own size
 * rather than the viewport — for structural adaptivity that plain CSS
 * `@container` can't express (e.g. collapsing a List-Detail layout into
 * a single panel). Prefer `@container` in CSS for purely visual changes
 * (hide an element, change a grid); reach for this hook only when the
 * decision needs to happen in JS/React, not just in a stylesheet.
 *
 * SSR-safe: reports `false` until the element is measured on mount (see
 * useElementSize), so server and first client render always agree.
 *
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * const isNarrow = useContainerQuery(ref, { maxWidth: 480 });
 * return <div ref={ref}>{isNarrow ? <StackedLayout /> : <SideBySide />}</div>;
 */
export function useContainerQuery<T extends HTMLElement>(
  elementRef: RefObject<T | null>,
  query: { minWidth?: number; maxWidth?: number },
): boolean {
  const { width } = useElementSize(elementRef);

  if (width === 0) return false;
  if (query.minWidth !== undefined && width < query.minWidth) return false;
  if (query.maxWidth !== undefined && width > query.maxWidth) return false;
  return true;
}
