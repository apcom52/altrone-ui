import {
  autoPlacement,
  flip,
  offset,
  shift,
  size,
} from '@floating-ui/react';
import { PlacementConfig, applyOverlapStyles } from './placementUtils';

export const createMiddleware = (
  config: PlacementConfig,
  parentWidth: boolean,
  _overlap: boolean
) => {
  return [
    offset(config.offset),
    config.shouldUseAutoPlacement ? autoPlacement() : flip(),
    shift({ padding: 4 }),
    size({
      apply({ rects, elements }) {
        if (parentWidth) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        }
      },
    }),
  ];
};

export const createOverlapMiddleware = (
  config: PlacementConfig,
  parentWidth: boolean
) => {
  return [
    size({
      apply({ rects, elements }) {
        if (parentWidth) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        }

        applyOverlapStyles(elements, rects, config.placement);
      },
    }),
  ];
};
