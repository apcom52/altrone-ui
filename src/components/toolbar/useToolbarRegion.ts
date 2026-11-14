import { useCallback, useLayoutEffect, useRef } from 'react';
import { ToolbarBalancedRegion, useToolbarBalance } from './Toolbar.context.ts';

export function useToolbarRegion(region: ToolbarBalancedRegion) {
  const ref = useRef<HTMLDivElement>(null);
  const balance = useToolbarBalance();

  useLayoutEffect(() => {
    const node = ref.current;
    if (node && balance) return balance.registerRegion(region, node);
  }, [balance, region]);

  const onNaturalSizeChange = useCallback(
    (size: number) => {
      const node = ref.current;
      if (node) balance?.reportNaturalSize(region, node, size);
    },
    [balance, region],
  );

  return { ref, onNaturalSizeChange };
}
