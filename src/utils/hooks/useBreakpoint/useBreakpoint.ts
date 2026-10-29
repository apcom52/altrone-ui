import { useMediaMatch } from '../useMediaMatch';

const BREAKPOINTS = {
  xs: 520,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1640,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

export type UseBreakpointResult = {
  [K in BreakpointName as `is${Capitalize<K>}`]: boolean;
};

/**
 * Viewport-level breakpoint matches, mirrored from the --breakpoint-*
 * CSS custom properties (see application/styles/_breakpoints.scss) so
 * app-level JS decisions (e.g. whether to show mobile navigation) use
 * the same thresholds as the CSS. SSR-safe: matches useMediaMatch's
 * false-until-mounted default, so it never desyncs from server-rendered
 * markup.
 *
 * Each `is{Name}` is `min-width` — "viewport is at least this
 * breakpoint" — not a mutually exclusive range.
 *
 * @example
 * const { isSm, isLg } = useBreakpoint();
 * if (!isSm) return <MobileNav />;
 */
export function useBreakpoint(): UseBreakpointResult {
  const isXs = useMediaMatch(`(min-width: ${BREAKPOINTS.xs}px)`);
  const isSm = useMediaMatch(`(min-width: ${BREAKPOINTS.sm}px)`);
  const isMd = useMediaMatch(`(min-width: ${BREAKPOINTS.md}px)`);
  const isLg = useMediaMatch(`(min-width: ${BREAKPOINTS.lg}px)`);
  const isXl = useMediaMatch(`(min-width: ${BREAKPOINTS.xl}px)`);

  return { isXs, isSm, isMd, isLg, isXl };
}
