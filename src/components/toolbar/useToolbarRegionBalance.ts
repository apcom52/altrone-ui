import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { ToolbarBalanceApi, ToolbarBalancedRegion } from './Toolbar.context.ts';

interface RegisteredRegion {
  node: HTMLElement;
  size: number | null;
}

/**
 * Splits `sideBudget` between `Leading`/`Trailing`: each gets its exact
 * natural need plus half of whatever's left over, falling back to a plain
 * 50/50 split once both together genuinely don't fit. Pure so this can be
 * unit-tested without a layout engine.
 */
export function resolveToolbarRegionBalance(
  leading: number,
  trailing: number,
  sideBudget: number,
): [leadingTrack: number, trailingTrack: number] {
  if (leading + trailing <= sideBudget) {
    const surplus = (sideBudget - leading - trailing) / 2;
    return [leading + surplus, trailing + surplus];
  }
  return [sideBudget / 2, sideBudget / 2];
}

/**
 * `Leading`/`Trailing` share a `1fr auto 1fr`-style grid track pair around
 * `Center` (see `toolbar.module.scss`), which by default splits the space
 * evenly regardless of content — wasting room on whichever side needs less
 * and forcing the other to collapse even when the toolbar has plenty of
 * free space overall. This sizes that shared pair by each side's actual
 * uncollapsed need, falling back to an even split only once both sides
 * together genuinely don't fit.
 */
export function useToolbarRegionBalance(
  containerRef: RefObject<HTMLElement | null>,
  orientation: 'horizontal' | 'vertical',
): ToolbarBalanceApi {
  const regionsRef = useRef<
    Record<ToolbarBalancedRegion, RegisteredRegion | null>
  >({
    leading: null,
    trailing: null,
    center: null,
  });
  const recalculateRef = useRef<() => void>(() => {});

  const registerRegion = useCallback(
    (region: ToolbarBalancedRegion, node: HTMLElement) => {
      const registration: RegisteredRegion = { node, size: null };
      regionsRef.current[region] = registration;
      recalculateRef.current();
      return () => {
        if (regionsRef.current[region] !== registration) return;
        regionsRef.current[region] = null;
        recalculateRef.current();
      };
    },
    [],
  );

  const reportNaturalSize = useCallback(
    (region: ToolbarBalancedRegion, node: HTMLElement, size: number) => {
      const registration = regionsRef.current[region];
      if (
        !registration ||
        registration.node !== node ||
        registration.size === size
      )
        return;
      registration.size = size;
      recalculateRef.current();
    },
    [],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recalculate = () => {
      const getSize = (region: ToolbarBalancedRegion) => {
        const entry = regionsRef.current[region];
        return entry?.node.parentElement === container ? entry.size : null;
      };
      const leading = getSize('leading');
      const trailing = getSize('trailing');
      const center = getSize('center');

      if (leading === null || trailing === null) {
        if (container.style.getPropertyValue('--toolbar-leading-track')) {
          container.style.removeProperty('--toolbar-leading-track');
        }
        if (container.style.getPropertyValue('--toolbar-trailing-track')) {
          container.style.removeProperty('--toolbar-trailing-track');
        }
        return;
      }

      /**
       * Taken from `Center`'s own reported natural size, not read back from
       * the resolved `auto` grid track: once `--toolbar-leading-track`/
       * `-trailing-track` are set, the "auto" track's resolved size reflects
       * whatever those (possibly stale, pre-recalculation) values leave over
       * — not `Center`'s real need — corrupting every calculation after
       * the first. Defaults to 0 (not skipped, unlike `leading`/`trailing`)
       * since a `Toolbar` with no `Center` never reports one at all.
       */
      const centerTrack = center ?? 0;

      const style = getComputedStyle(container);
      const gap =
        parseFloat(
          orientation === 'vertical' ? style.rowGap : style.columnGap,
        ) || 0;
      const available =
        orientation === 'vertical'
          ? container.clientHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom)
          : container.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight);

      const sideBudget = Math.max(available - centerTrack - 2 * gap, 0);
      const [leadingTrack, trailingTrack] = resolveToolbarRegionBalance(
        leading,
        trailing,
        sideBudget,
      );

      if (
        container.style.getPropertyValue('--toolbar-leading-track') !==
        `${leadingTrack}px`
      ) {
        container.style.setProperty(
          '--toolbar-leading-track',
          `${leadingTrack}px`,
        );
      }
      if (
        container.style.getPropertyValue('--toolbar-trailing-track') !==
        `${trailingTrack}px`
      ) {
        container.style.setProperty(
          '--toolbar-trailing-track',
          `${trailingTrack}px`,
        );
      }
    };

    recalculateRef.current = recalculate;
    recalculate();

    const observer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver(() => recalculateRef.current());
    observer?.observe(container);
    return () => {
      recalculateRef.current = () => {};
      observer?.disconnect();
    };
  }, [containerRef, orientation]);

  return useMemo(
    () => ({ registerRegion, reportNaturalSize }),
    [registerRegion, reportNaturalSize],
  );
}
