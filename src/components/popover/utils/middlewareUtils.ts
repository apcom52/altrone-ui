import {
  autoPlacement,
  flip,
  Middleware,
  offset,
  shift,
  size,
} from '@floating-ui/react';
import { PlacementConfig } from './placementUtils';

const matchReferenceWidth = (parentWidth: boolean): Middleware =>
  size({
    apply({ rects, elements }) {
      if (parentWidth) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        });
      }
    },
  });

/** Standard mode — popover sits beside the trigger with a small gap. */
export const createMiddleware = (
  config: PlacementConfig,
  parentWidth: boolean,
): Middleware[] => [
  offset(config.offset),
  config.shouldUseAutoPlacement ? autoPlacement() : flip(),
  shift({ padding: 4 }),
  matchReferenceWidth(parentWidth),
];

/**
 * Overlap mode — popover covers the trigger. Pulls the floating element back
 * over the reference along the main axis by the reference's own size (plus the
 * negative `config.offset` lip) and nudges it in on the cross axis by
 * alignment. `shift` keeps it on screen; there is no `flip` (flipping a
 * covering popover to the opposite side makes no sense).
 */
export const createOverlapMiddleware = (
  config: PlacementConfig,
  parentWidth: boolean,
): Middleware[] => [
  offset(({ rects, placement }) => {
    const alignment = placement.split('-')[1];
    const crossAxis = alignment === 'start' ? -4 : alignment === 'end' ? 4 : 0;
    const isVertical = placement.startsWith('top') || placement.startsWith('bottom');
    const mainAxis =
      -(isVertical ? rects.reference.height : rects.reference.width) +
      config.offset;

    return { mainAxis, crossAxis };
  }),
  shift({ padding: 4 }),
  matchReferenceWidth(parentWidth),
];
