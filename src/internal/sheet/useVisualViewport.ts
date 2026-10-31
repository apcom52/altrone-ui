import { useEffect, useState } from 'react';

interface VisualViewportRect {
  height: number;
  offsetTop: number;
}

/** Taller than any browser-chrome change, shorter than any on-screen keyboard. */
const KEYBOARD_MIN_HEIGHT = 120;

/**
 * iOS Safari keeps `position: fixed` elements sized against the layout
 * viewport, which doesn't shrink when the on-screen keyboard opens — a
 * fixed overlay anchored to the bottom edge ends up hidden behind it.
 * `visualViewport` is the one API that reports the actually-visible area,
 * so `Sheet` sizes itself against this instead of a static `inset: 0`
 * while it's open. Returns `null` when unsupported, inactive or the keyboard
 * is closed, in which case `Sheet` falls back to its normal `inset: 0` CSS.
 */
export const useVisualViewport = (
  active: boolean,
): VisualViewportRect | null => {
  const [rect, setRect] = useState<VisualViewportRect | null>(null);

  useEffect(() => {
    const viewport =
      typeof window !== 'undefined' ? window.visualViewport : null;
    if (!active || !viewport) {
      setRect(null);
      return;
    }

    const update = () => {
      /** Workaround: iOS 26 Safari can leave `offsetTop` stale after the
          keyboard closes, so trust the rect only while the keyboard is up. */
      const keyboardOpen =
        window.innerHeight - viewport.height > KEYBOARD_MIN_HEIGHT;
      setRect(
        keyboardOpen
          ? { height: viewport.height, offsetTop: viewport.offsetTop }
          : null,
      );
    };

    update();
    viewport.addEventListener('resize', update);
    viewport.addEventListener('scroll', update);
    return () => {
      viewport.removeEventListener('resize', update);
      viewport.removeEventListener('scroll', update);
    };
  }, [active]);

  return rect;
};
