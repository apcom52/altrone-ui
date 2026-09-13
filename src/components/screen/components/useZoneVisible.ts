import { useBreakpoint, type BreakpointName } from 'utils';

const FLAG: Record<BreakpointName, keyof ReturnType<typeof useBreakpoint>> = {
  xs: 'isXs',
  sm: 'isSm',
  md: 'isMd',
  lg: 'isLg',
  xl: 'isXl',
};

/**
 * Whether a `Screen` zone with `visibleFrom` / `hiddenFrom` should render at
 * the current viewport. `visibleFrom` hides it below that breakpoint,
 * `hiddenFrom` hides it at and above; set both to bound the zone to a band.
 * SSR-safe via `useBreakpoint` (all-false until mounted) — a gated zone can
 * flash in or out on the first client paint, the same tradeoff `Screen`'s
 * `sidebarMode` already carries.
 */
export const useZoneVisible = (
  visibleFrom?: BreakpointName,
  hiddenFrom?: BreakpointName,
): boolean => {
  const breakpoint = useBreakpoint();

  if (visibleFrom && !breakpoint[FLAG[visibleFrom]]) {
    return false;
  }
  if (hiddenFrom && breakpoint[FLAG[hiddenFrom]]) {
    return false;
  }
  return true;
};
