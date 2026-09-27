/**
 * Ref-counted so nested `Sheet`s (e.g. a `Modal` opened from within an
 * already-open `Drawer`) don't unlock the page when only the inner one
 * closes — the page only scrolls again once every open `Sheet` is gone.
 */
let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

/** The element that actually scrolls the page — `<html>` in standards mode,
    `<body>` in quirks mode, or whatever a consumer's own reset makes it. */
const getScroller = () => document.scrollingElement as HTMLElement | null;

export const lockPageScroll = () => {
  if (lockCount === 0) {
    const scroller = getScroller();
    if (scroller) {
      /** Compensates for the vanishing scrollbar so the page doesn't jump
          sideways when `overflow: hidden` removes it. */
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      previousOverflow = scroller.style.overflow;
      previousPaddingRight = scroller.style.paddingRight;
      scroller.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        const currentPaddingRight =
          parseFloat(getComputedStyle(scroller).paddingRight) || 0;
        scroller.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
      }
    }
  }
  lockCount += 1;
};

export const unlockPageScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    const scroller = getScroller();
    if (scroller) {
      scroller.style.overflow = previousOverflow;
      scroller.style.paddingRight = previousPaddingRight;
    }
  }
};
