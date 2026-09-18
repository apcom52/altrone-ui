/**
 * Ref-counted so nested `Sheet`s (e.g. a `Modal` opened from within an
 * already-open `Drawer`) don't unlock the page when only the inner one
 * closes — the page only scrolls again once every open `Sheet` is gone.
 */
let lockCount = 0;
let previousOverflow = '';
let previousPaddingRight = '';

export const lockPageScroll = () => {
  if (lockCount === 0) {
    /** Compensates for the vanishing scrollbar so the page doesn't jump
        sideways when `overflow: hidden` removes it. */
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    previousOverflow = document.body.style.overflow;
    previousPaddingRight = document.body.style.paddingRight;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const currentPaddingRight =
        parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`;
    }
  }
  lockCount += 1;
};

export const unlockPageScroll = () => {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
    document.body.style.paddingRight = previousPaddingRight;
  }
};
