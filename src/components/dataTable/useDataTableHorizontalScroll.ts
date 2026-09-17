import { useEffect, useRef } from 'react';

/** Mirrors `.Backdrop`'s resting look in `columnHeaders.module.scss` — the
 *  pill's inset and the distance (px scrolled) over which it fully collapses
 *  to `MIN_RADIUS`. */
const RESTING_INSET = 8;
const RESTING_RADIUS = 32;
/** Matches `--radius-mini` — never rounds a cut-off edge down to a hard square. */
const MIN_RADIUS = 2;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/**
 * `ColumnHeaders`' sticky row can't scroll horizontally on its own — any
 * ancestor with a non-`visible` overflow becomes the nearest containing
 * block for a descendant's `position: sticky`, which would make its `top`
 * stick to that box instead of the page (see `--top-safe-area` usage in
 * `columnHeaders.module.scss`). Instead the body scrolls natively and this
 * hook mirrors its `scrollLeft` onto the header's column track via
 * `transform`, so the two stay visually in sync while the header remains
 * sticky to the page.
 *
 * It also shrinks `.Backdrop`'s pill toward the cut-off edge as its side
 * scrolls out of view — a rounded, inset pill only reads correctly as "the
 * end of the row" when that side is actually the end. Reaching either true
 * edge restores the full resting pill on that side.
 */
export function useDataTableHorizontalScroll() {
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const headerTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = bodyScrollRef.current;
    const rowEl = headerRowRef.current;
    const trackEl = headerTrackRef.current;
    if (!scrollEl || !rowEl || !trackEl) return;

    const sync = () => {
      const scrollLeft = scrollEl.scrollLeft;
      const distanceFromEnd =
        scrollEl.scrollWidth - scrollEl.clientWidth - scrollLeft;

      const setSide = (side: 'start' | 'end', distanceFromEdge: number) => {
        const progress = clamp01(distanceFromEdge / RESTING_RADIUS);
        const inset = RESTING_INSET * (1 - progress);
        const radius =
          RESTING_RADIUS - progress * (RESTING_RADIUS - MIN_RADIUS);
        rowEl.style.setProperty(
          `--data-table-header-inset-${side}`,
          `${inset}px`,
        );
        rowEl.style.setProperty(
          `--data-table-header-radius-${side}`,
          `${radius}px`,
        );
      };

      trackEl.style.transform = `translateX(${-scrollLeft}px)`;
      setSide('start', scrollLeft);
      setSide('end', distanceFromEnd);
    };

    sync();
    scrollEl.addEventListener('scroll', sync, { passive: true });

    /* Column resizing/container resizing changes scrollWidth/clientWidth
       without firing a `scroll` event. Guarded like the other resize-driven
       hooks in `utils/hooks` — absent in the Vitest/jsdom environment. */
    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(sync);
    resizeObserver?.observe(scrollEl);
    resizeObserver?.observe(trackEl);

    return () => {
      scrollEl.removeEventListener('scroll', sync);
      resizeObserver?.disconnect();
    };
  }, []);

  return { bodyScrollRef, headerRowRef, headerTrackRef };
}
