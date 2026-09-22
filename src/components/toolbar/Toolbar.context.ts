import { createContext, useContext } from 'react';
import { Size } from 'types';
import { ToolbarEdge, ToolbarVariant } from './Toolbar.types.ts';

export interface ToolbarContextValue {
  edge: ToolbarEdge;
  orientation: 'horizontal' | 'vertical';
  variant: ToolbarVariant;
  size: Size;
}

export const ToolbarContext = createContext<ToolbarContextValue>({
  edge: 'top',
  orientation: 'horizontal',
  variant: 'solid',
  size: 'm',
});

export const useToolbarContext = () => useContext(ToolbarContext);

export type ToolbarBalancedRegion = 'leading' | 'trailing' | 'center';

/**
 * `Leading`/`Trailing` share one grid track pair around `Center` (see
 * `toolbar.module.scss`). Each of the three reports its own uncollapsed
 * content size here so `Toolbar` can size `Leading`/`Trailing` by actual
 * need instead of a rigid 50/50 split — see `Toolbar.tsx`'s balance effect.
 * `Center`'s own report matters too: reading its size back off the DOM
 * instead would reflect whatever `Leading`/`Trailing` last squeezed it to,
 * not its real need.
 */
export interface ToolbarBalanceApi {
  reportNaturalSize: (region: ToolbarBalancedRegion, size: number) => void;
}

export const ToolbarBalanceContext = createContext<ToolbarBalanceApi | null>(
  null,
);

export const useToolbarBalance = () => useContext(ToolbarBalanceContext);
