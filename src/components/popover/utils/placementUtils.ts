import { Placement } from '@floating-ui/react';

export interface PlacementConfig {
  offset: number;
  placement: Placement;
  shouldUseAutoPlacement: boolean;
}

/** Center placements have no `@floating-ui` alignment — pin them to `-start` for overlap. */
const OVERLAP_PLACEMENT: Record<string, Placement> = {
  top: 'top-start',
  bottom: 'bottom-start',
  left: 'left-start',
  right: 'right-start',
};

/**
 * Resolves the `useFloating` placement + offset for a given `placement` prop.
 * `overlap` mode covers the trigger, so it never auto-places and uses a
 * negative offset (applied in `createOverlapMiddleware`).
 */
export const getPlacementConfig = (
  placement: 'auto' | Placement,
  overlap: boolean,
): PlacementConfig => {
  if (overlap) {
    const resolved =
      placement === 'auto'
        ? 'bottom-start'
        : (OVERLAP_PLACEMENT[placement] ?? placement);

    return { offset: -4, placement: resolved, shouldUseAutoPlacement: false };
  }

  return {
    offset: 4,
    placement: placement === 'auto' ? 'top' : placement,
    shouldUseAutoPlacement: placement === 'auto',
  };
};

/** All named placements — used by the placement showcase story. */
export const getAllPlacements = (): Array<{
  value: Placement;
  label: string;
}> => [
  { value: 'top', label: 'Top' },
  { value: 'top-start', label: 'Top Start' },
  { value: 'top-end', label: 'Top End' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'bottom-start', label: 'Bottom Start' },
  { value: 'bottom-end', label: 'Bottom End' },
  { value: 'left', label: 'Left' },
  { value: 'left-start', label: 'Left Start' },
  { value: 'left-end', label: 'Left End' },
  { value: 'right', label: 'Right' },
  { value: 'right-start', label: 'Right Start' },
  { value: 'right-end', label: 'Right End' },
];
