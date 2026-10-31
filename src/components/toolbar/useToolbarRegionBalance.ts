import { RefObject, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { ToolbarBalanceApi, ToolbarBalancedRegion } from './Toolbar.context.ts';

type NaturalSizes = Record<ToolbarBalancedRegion, number | null>;

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
  const naturalSizesRef = useRef<NaturalSizes>({
    leading: null,
    trailing: null,
    center: null,
  });
  const recalculateRef = useRef<() => void>(() => {});

  const reportNaturalSize = useCallback(
    (region: ToolbarBalancedRegion, size: number) => {
      if (naturalSizesRef.current[region] === size) return;
      naturalSizesRef.current[region] = size;
      recalculateRef.current();
    },
    [],
  );

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === 'undefined') return;

    const recalculate = () => {
      const leadingEl = container.querySelector(
        ':scope > [data-toolbar-region="leading"]',
      );
      const trailingEl = container.querySelector(
        ':scope > [data-toolbar-region="trailing"]',
      );
      const { leading, trailing, center } = naturalSizesRef.current;

      if (!leadingEl || !trailingEl || leading === null || trailing === null) {
        container.style.removeProperty('--toolbar-leading-track');
        container.style.removeProperty('--toolbar-trailing-track');
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

      container.style.setProperty('--toolbar-leading-track', `${leadingTrack}px`);
      container.style.setProperty(
        '--toolbar-trailing-track',
        `${trailingTrack}px`,
      );
    };

    recalculateRef.current = recalculate;
    recalculate();

    const observer = new ResizeObserver(recalculate);
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, orientation]);

  return useMemo(() => ({ reportNaturalSize }), [reportNaturalSize]);
}
