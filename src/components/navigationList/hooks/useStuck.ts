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

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(entry.intersectionRatio < 1),
      { root: getScrollParent(el), threshold: [1] },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, stuck };
};
