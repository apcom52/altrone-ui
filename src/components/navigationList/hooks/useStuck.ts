import { useEffect, useRef, useState } from 'react';

const isScrollable = (node: HTMLElement) => {
  const { overflowY } = getComputedStyle(node);
  return (
    overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay'
  );
};

const getScrollParent = (el: HTMLElement): HTMLElement | null => {
  let node = el.parentElement;
  while (node) {
    if (isScrollable(node)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

/**
 * Tracks whether a `position: sticky` element is currently pinned (stuck) as
 * opposed to resting at its natural place. Relies on the element being offset
 * by 1px past the sticky edge (`top: -1px` / `bottom: -1px`): once pinned, that
 * 1px clips outside the scroll container and the intersection ratio drops below
 * 1.
 */
export const useStuck = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }

    /* Fall back to the sticky element's containing block, not the viewport
       (`root: null`): when an ancestor animates with a transform (e.g.
       `Screen.Sidebar` sliding in) a viewport-rooted observer briefly sees the
       element off-screen and reports it stuck, flashing the pinned style. The
       containing block moves together with the element, so the ratio holds. */
    const root =
      getScrollParent(el) ?? (el.offsetParent as Element | null);

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(entry.intersectionRatio < 1),
      { root, threshold: [1] },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, stuck };
};
