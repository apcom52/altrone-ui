import { CSSProperties, useState } from 'react';
import { motion } from 'motion/react';

const backgroundStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  borderRadius: 'inherit',
  willChange: 'background-color, transform, top, left',
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden',
};

interface UseOverlayItemBackgroundOptions {
  /** Popover instance id — scopes the shared `layoutId` so the highlight only slides between items of the same overlay. */
  popoverId: string | null;
  /** Class that paints the highlight fill; the hook only positions the element. */
  className?: string;
}

/**
 * Shared hover/keyboard-focus highlight for overlay list items (Dropdown menu
 * items, AutocompleteInput suggestions). Returns a `motion.div` that every
 * item of the same overlay renders under one `layoutId`, so the highlight
 * animates from item to item instead of popping. Mount it as the first child
 * of a `position: relative` row and wire `onMouseEnter`/`onMouseLeave` to that
 * row; drive keyboard focus by calling them from an effect on the active index.
 */
export const useOverlayItemBackground = ({
  popoverId,
  className,
}: UseOverlayItemBackgroundOptions) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const itemBackgroundElement = isHighlighted ? (
    <motion.div
      layoutId={`overlay-item-bg-${popoverId}`}
      className={className}
      style={backgroundStyle}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    />
  ) : null;

  return {
    itemBackgroundElement,
    onMouseEnter: () => setIsHighlighted(true),
    onMouseLeave: () => setIsHighlighted(false),
  };
};
