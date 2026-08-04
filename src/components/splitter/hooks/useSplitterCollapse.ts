import { useCallback, useRef } from 'react';
import type React from 'react';
import type { SplitterPanelProps } from '../Splitter.types.ts';

export interface UseSplitterCollapseOptions {
  collapsed: boolean[];
  setCollapsed: React.Dispatch<React.SetStateAction<boolean[]>>;
  setSizes: React.Dispatch<React.SetStateAction<number[]>>;
  panelsRef: React.RefObject<SplitterPanelProps[]>;
  onCollapse?: (panelIndex: number, collapsed: boolean, event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export function useSplitterCollapse({
  collapsed,
  setCollapsed,
  setSizes,
  panelsRef,
  onCollapse,
}: UseSplitterCollapseOptions) {
  /** Stores each panel's size before collapsing so it can be restored on expand. */
  const preCollapseSizes = useRef<number[]>([]);

  /**
   * Collapse, expand, or toggle a panel.
   * force=true → collapse, force=false → expand, force=undefined → toggle.
   */
  const handleCollapse = useCallback(
    (panelIndex: number, force?: boolean, event?: React.MouseEvent<HTMLButtonElement>) => {
      const alreadyCollapsed = collapsed[panelIndex];
      const willCollapse = force !== undefined ? force : !alreadyCollapsed;

      // No-op if the panel is already in the desired state.
      if (willCollapse === alreadyCollapsed) return;

      if (!willCollapse) {
        // Expand: restore saved size, steal from neighbor.
        const restore = preCollapseSizes.current[panelIndex];
        setSizes((prev) => {
          const next = [...prev];
          const neighbor = panelIndex > 0 ? panelIndex - 1 : panelIndex + 1;
          const available = next[neighbor] - (panelsRef.current[neighbor].min ?? 0);
          const actual = Math.min(restore, available);
          next[panelIndex] = actual;
          next[neighbor] -= actual;
          return next;
        });
        setCollapsed((prev) => {
          const next = [...prev];
          next[panelIndex] = false;
          return next;
        });
        onCollapse?.(panelIndex, false, event);
      } else {
        // Collapse: save current size, give it to neighbor.
        setSizes((prev) => {
          preCollapseSizes.current[panelIndex] = prev[panelIndex];
          const next = [...prev];
          const neighbor = panelIndex > 0 ? panelIndex - 1 : panelIndex + 1;
          next[neighbor] += next[panelIndex];
          next[panelIndex] = 0;
          return next;
        });
        setCollapsed((prev) => {
          const next = [...prev];
          next[panelIndex] = true;
          return next;
        });
        onCollapse?.(panelIndex, true, event);
      }
    },
    [collapsed, setCollapsed, setSizes, panelsRef, onCollapse],
  );

  return { preCollapseSizes, handleCollapse };
}
